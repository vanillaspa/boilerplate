# Event Contract API — General Approach

**Date:** 2026-03-20
**Status:** In Review
**Scope:** General contract mechanism — bridge helper, consumer helper, shape validation. Auth and OPFS encryption are out of scope but must not be blocked by this design. The system is serverless and offline-first: all execution happens in the browser via OPFS and Web Workers, no network calls are made by the contract layer.

---

## Problem

The `sqlite:*` event contract works well but every new namespace requires copy-pasting the same boilerplate:
- Bridge: `addEventListener` + try/catch + dispatch response + dispatch error
- Consumer: construct event + register timestamped listener + dispatch + cleanup

It also has three latent race conditions:
1. `event.timeStamp` has reduced precision and is not known before dispatch — two concurrent requests can share it
2. `sqlite:error` is a broadcast — a failure in request A can reject request B's Promise
3. Broadcast response events (e.g. `sqlite:uploaded`) resolve all concurrent consumers at once

---

## Design

### New package: `event-contract/`

A standalone module at the monorepo root alongside `event-bus/`, `web-components/`, and `sqlite-database/`. The library does not couple to `window.eventbus` — the eventbus is injected by the caller, making the package portable and independently testable.

```
event-contract/
  index.js              ← defineContract(eventbus, spec)
  validate.js           ← shape validation
  package.json
  README.md
  examples/
    sqlite-contract.js  ← sqlite:* expressed in the new system
```

`defineContract(eventbus, spec)` returns `Object.freeze({ createBridge(host), createConsumer(host) })`:
- `createBridge(host)` — accepts the bridge component's host `HTMLElement`; returns `{ handle(action, fn) }`
- `createConsumer(host)` — accepts the consumer component's host `HTMLElement`; returns `{ request(action, detail) }`
- Both throw if `host` is not an element or if `host.dataset.id` is absent (i.e., called before `connectedCallback`)

`Object.freeze` prevents mutation of the contract object's properties. At the app level, `Object.defineProperty` with `writable: false` additionally prevents the window reference itself from being replaced — two separate protections for two separate attack surfaces. `window.SqliteContract` is the frozen object returned by `defineContract` — i.e. `{ createBridge, createConsumer }` — exposed globally for use by bridge and consumer components.

```js
// src/main.js — inside the .then() callback, after window.eventbus has been assigned
.then(async (importedModules) => {
    // ... existing module assignment ...
    const { SqliteContract } = await import('./contracts/sqlite-contract.js');
    Object.defineProperty(window, 'SqliteContract', {
        value: SqliteContract,   // already frozen by defineContract
        writable: false,
        configurable: false
    });
});
```

`sqlite-contract.js` must be dynamically imported only after `window.eventbus` is available. Static top-level import would evaluate `defineContract(window.eventbus, ...)` before the eventbus is assigned, capturing `undefined`.

---

### 4-Fold Naming Convention

All three race conditions are resolved for cross-component requests by the event naming convention alone. A same-component concurrent request limitation is documented below.

```
{namespace}:{action}                              ← request command   (2-fold, present tense)
{namespace}:{past}:{timestamp}:{hostId}           ← response success  (4-fold, past tense)
{namespace}:error:{timestamp}:{hostId}            ← response error    (4-fold)
```

- **Field 1 — namespace:** e.g. `sqlite`, `auth`, `crypto`
- **Field 2 (request) — action:** present-tense verb or camelCase compound, event-sourcing style (e.g. `create`, `closeDB`)
- **Field 2 (response success) — past:** past-tense form of the action, declared explicitly in the spec to handle irregular and noun cases (e.g. `created`, `closed`, `executed`)
- **Field 3 — timestamp:** `performance.now()` called by the consumer **before** constructing the event, embedded in `event.detail._ts`. `event.timeStamp` cannot be used: it is only set by the browser at dispatch time, but the consumer must register response listeners using the correlation key **before** dispatching.
- **Field 4 — hostId:** `host.dataset.id` (8-char UUID fragment) of the **consumer's** host element, embedded in `event.detail._hostId`. Guarantees uniqueness across components: same timestamp + different consumer component = different event name.

**Why pre-registration is safe across the async gap:** Bridge handlers are `async` — they `await` Worker responses via `MessageChannel`. When `dispatchEvent` is called, the bridge handler fires synchronously up to its first `await`, then suspends, and `dispatchEvent` returns. Later, when the Worker replies, the bridge resumes and dispatches the 4-fold response. The consumer's pre-registered listeners are still alive at that point — listener lifetime is not bounded by the `dispatchEvent` call.

**Known limitation — same-component concurrent requests:** `hostId` is fixed per component instance. Two requests of the same action from the same component within the same `performance.now()` bucket produce identical 4-fold names and their responses will collide. Consumers must serialize requests of the same action within a single component. At typical `performance.now()` precision and human-interaction rates this is unlikely in practice, but not impossible under programmatic load. A per-request counter in a 5th field would fully resolve this; deferred until a real use case requires it.

**How each race condition is resolved:**

| Race | Problem | Fix |
|---|---|---|
| Timestamp collision (cross-component) | Two events at same timestamp → same response event name | Field 4 `hostId` is unique per consumer component — same timestamp + different component = different name |
| Timestamp collision (same-component) | Same `hostId` + same timestamp bucket → collision | **Not resolved in v1** — consumers must serialize (see Known Limitation above) |
| Error cross-contamination | `sqlite:error` broadcast rejects unrelated Promises | Error is `sqlite:error:{ts}:{hostId}` — only the requesting consumer hears it |
| Broadcast over-delivery | Two consumers both resolve on one response event | Each gets a unique `hostId` — `sqlite:uploaded:{ts}:a3f` and `sqlite:uploaded:{ts}:b7d` are different events |

---

### Contract Spec Format

The spec is a plain JS object. The `past` field declares the past-tense event name for the success response.

```js
// src/contracts/sqlite-contract.js
import { defineContract } from '@vanillaspa/event-contract';

// Called after window.eventbus is available (dynamic import in main.js)
export const SqliteContract = defineContract(window.eventbus, {
    namespace: 'sqlite',
    events: {
        create:    { detail: { name: 'string' },                                 past: 'created'    },
        query:     { detail: { sql: 'string', name: 'string' },                  past: 'queried'    },
        statement: { detail: { sql: 'string', values: 'array', name: 'string' }, past: 'executed'   },
        upload:    { detail: { fileName: 'string', arrayBuffer: 'any' },         past: 'uploaded'   },
        download:  { detail: { name: 'string' },                                 past: 'downloaded' },
        closeDB:   { detail: { name: 'string' },                                 past: 'closed'     },
        deleteDB:  { detail: { name: 'string' },                                 past: 'deleted'    },
    }
});
```

**Reserved fields** — must not appear in any user-defined `detail` schema:
- `_ts` — injected by `createConsumer` as the pre-dispatch timestamp
- `_hostId` — injected by `createConsumer` as the consumer's `dataset.id`
- `target` — read by the event bus as an implicit routing context when no explicit context argument is passed to `dispatchEvent` (`if (!context) context = event.detail?.target`). Any truthy value in `detail.target` — including non-object values such as strings — would cause the event bus to use it as a routing context, delivering only to listeners registered under that exact value and silently dropping the event for all others (including the bridge).

**`query` vs `statement` — migration note:** In the existing bridge, `sqlite:query` returned either `sqlite:result:*` (SELECT) or `sqlite:updated:*` (non-SELECT). In the new contract, both `query` and `statement` map to a single past-tense response (`queried` / `executed`). The result content still differs (positional arrays vs column-keyed objects), but the event name does not. Existing consumers that manually listen for `sqlite:result:*` or `sqlite:updated:*` must migrate to `consumer.request('query', ...)` / `consumer.request('statement', ...)`. Those old 3-fold response event names will not be dispatched by the new bridge handler.

---

### Bridge API

In this framework, `shadowDocument` is a `ShadowRoot` injected into each component's script context by the web-components loader; `shadowDocument.host` is the standard `ShadowRoot.host` property returning the component's host `HTMLElement`.

```js
// Inside a bridge component's <script>
const bridge = SqliteContract.createBridge(shadowDocument.host);

bridge.handle('statement', async ({ sql, values, name }) => {
    return await sqlite.executeStatement(sql, values, name);
});
```

`bridge.handle(action, fn)`:
1. Registers `eventbus.addEventListener('{namespace}:{action}', handler, host)` using the bridge's host as context
2. On each request event: reads `_ts` and `_hostId` from `event.detail`; passes a copy of `detail` to `fn` with `_ts` and `_hostId` omitted (via destructuring), so handler implementations never see internal routing fields; validates remaining fields against the spec schema
3. Calls `fn(detail)`
4. On success: dispatches `{namespace}:{past}:{_ts}:{_hostId}` **without a context argument** (broadcast), with `{ detail: { result } }`. `{past}` comes from the spec for this action. Because the event name is unique per request per consumer, only the correct listener fires.
5. On failure: dispatches `{namespace}:error:{_ts}:{_hostId}` **without a context argument** first, with `{ detail: { error: error.message, action, eventType: '{namespace}:{action}' } }`, then dispatches the 2-fold `{namespace}:error` broadcast (same detail shape) for global monitoring. Both dispatches occur synchronously within the bridge's resumed async continuation with no `await` between them, so the 4-fold correlated error is guaranteed to fire before the 2-fold broadcast. The 2-fold broadcast is a legacy-compatible monitoring hook only — must not be used for request-response error handling. Bridge-side validation failures (malformed request detail) dispatch an immediate 4-fold error without calling `fn`, producing a clear "malformed request" error rather than a cryptic handler exception.

---

### Consumer API

```js
// Inside any consumer component's <script>
const consumer = SqliteContract.createConsumer(shadowDocument.host);

const result = await consumer.request('statement', { sql, values, name });
```

`consumer.request(action, detail)`:
1. Asserts `host.dataset.id` is a non-empty string — throws immediately if absent (called before `connectedCallback`)
2. Validates `detail` shape against the spec schema (see Shape Validation)
3. Reads `hostId = host.dataset.id` and `ts = performance.now()`
4. Registers `eventbus.addEventListener('{namespace}:{past}:{ts}:{hostId}', successHandler, host)` — context is the consumer's `host`; `{past}` comes from the spec for this action
5. Registers `eventbus.addEventListener('{namespace}:error:{ts}:{hostId}', errorHandler, host)` — context is the consumer's `host`
6. Constructs and dispatches `new CustomEvent('{namespace}:{action}', { detail: { ...detail, _ts: ts, _hostId: hostId } })` **without a context argument**. No `target` field is added, so the event bus finds no implicit routing context and delivers to all listeners (true broadcast). Because bridge handlers are async, `dispatchEvent` returns before the response is dispatched; the response listeners from steps 4–5 remain alive and fire when the bridge eventually responds.
7. Returns a Promise that resolves with `event.detail.result` on success, rejects with the error message on failure
8. Cleans up both listeners on settle via `eventbus.removeEventListener(type, handler, host)` — this method is exported by `@vanillaspa/event-bus` alongside `addEventListener` and `dispatchEvent`

**No timeout is defined for v1.** If the bridge never responds, the Promise hangs indefinitely. Callers are responsible for applying their own timeout. A configurable default may be added in a future iteration.

---

### Shape Validation

`validate.js` checks that every required field is present and of the correct type. Supported types: `'string'`, `'number'`, `'boolean'`, `'array'`, `'object'`, `'any'`. `'any'` accepts any non-null, non-undefined value. `'object'` explicitly excludes arrays. A null or non-object `detail` is caught before iteration. Absent fields (`key not in detail`) are distinguished from explicit `null`/`undefined` values. Warnings go to `console.warn` with event type and field name. No exceptions are thrown — a malformed event is warned about but on the bridge side, a validation failure dispatches an immediate 4-fold error without calling `fn`.

```js
// validate.js
export function validate(schema, detail, eventType) {
    if (detail == null || typeof detail !== 'object') {
        console.warn(`[event-contract] ${eventType}: detail must be a plain object, got ${detail === null ? 'null' : typeof detail}`);
        return false;
    }
    let valid = true;
    for (const [key, type] of Object.entries(schema)) {
        if (!(key in detail)) {
            console.warn(`[event-contract] ${eventType}: missing field "${key}"`);
            valid = false; continue;
        }
        const value = detail[key];
        if (value == null) {
            console.warn(`[event-contract] ${eventType}: "${key}" is ${value === null ? 'null' : 'undefined'}, expected ${type}`);
            valid = false; continue;
        }
        if (type === 'array') {
            if (!Array.isArray(value)) { console.warn(`[event-contract] ${eventType}: "${key}" expected array, got ${typeof value}`); valid = false; }
        } else if (type === 'object') {
            if (typeof value !== 'object' || Array.isArray(value)) { console.warn(`[event-contract] ${eventType}: "${key}" expected plain object, got ${Array.isArray(value) ? 'array' : typeof value}`); valid = false; }
        } else if (type !== 'any') {
            if (typeof value !== type) { console.warn(`[event-contract] ${eventType}: "${key}" expected ${type}, got ${typeof value}`); valid = false; }
        }
    }
    return valid;
}
```

`validate` returns `true` if all fields pass, `false` otherwise. The bridge uses this return value to decide whether to call `fn` or dispatch an immediate error.

---

## What Changes in the Boilerplate

- `src/contracts/sqlite-contract.js` added as a shared module, dynamically imported in `main.js` after `window.eventbus` is ready
- `src/main.js` exposes `SqliteContract` on `window` via `Object.defineProperty` (writable: false, configurable: false)
- `sqlite-notes.html` and `sqlite-workers.html` bridge handlers rewritten using `bridge.handle`
- Consumer components use `consumer.request` instead of manual event construction
- Existing consumers that manually listen for `sqlite:result:*` or `sqlite:updated:*` must migrate to `consumer.request`
- The existing 2-fold `sqlite:*` event names remain valid for backwards-compatible global monitoring listeners

---

## Out of Scope (not blocked)

- **Auth namespace:** A future `auth:*` contract follows the identical pattern — `defineContract(eventbus, { namespace: 'auth', events: { ... } })`. The naming convention accommodates it without modification.
- **OPFS encryption:** A concern at the `sqlite-database` module level, not the contract level.
- **Same-component concurrency:** A per-request counter in a 5th field would fully resolve this; deferred until a real use case requires it.
- **Request timeouts:** Configurable timeout with automatic listener cleanup; deferred to a future iteration.
- **Runtime contract introspection / registry:** Can be layered on top if needed.
