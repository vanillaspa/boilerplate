# Event API Contract

Defines every event in the `sqlite:*` namespace: its direction, detail shape,
routing behaviour, and which component handles it.

---

## Conventions

### Direction
- **→ request** — dispatched by a consumer component to request an action
- **← response** — emitted by the bridge component as a result

### Routing
- **scoped** — delivered only to listeners registered with the matching `context`
  (host element). Requires `target: host` in `event.detail` and `host` as the
  second argument to `dispatchEvent`.
- **broadcast** — delivered to all listeners for that event type regardless of
  context. Dispatched without a context argument and without `target` in detail.

### Timestamp correlation
Outbound response events for a specific request are namespaced with the
originating event's `timeStamp`:

```
sqlite:result:{request.timeStamp}
sqlite:updated:{request.timeStamp}
sqlite:created:{request.timeStamp}
```

This allows a consumer to listen for exactly its own response without
interfering with other components making the same request concurrently.

---

## Bridge Component

`<sqlite-notes>` (and `<sqlite-workers>`) act as the sqlite bridge. They
translate request `sqlite:*` events into direct `window.sqlite` API calls and
emit the corresponding response events. Consumers never call `window.sqlite`
directly — they communicate exclusively through this event API.

---

## Event Reference

### `sqlite:create`
**→ request · scoped**

Open (or create) a named SQLite database.

```js
new CustomEvent('sqlite:create', {
    detail: {
        name: string,   // database name
        target: host    // routing: the dispatching component's host element
    }
})
```

**Response:** `sqlite:created:{timeStamp}` ← response · scoped

```js
event.detail = { result: string } // confirmation message from sqlite-wasm
```

---

### `sqlite:query`
**→ request · scoped**

Execute a raw SQL string. Use for DDL, multi-statement scripts, or queries
where column-keyed results are not required.

```js
new CustomEvent('sqlite:query', {
    detail: {
        sql: string,    // SQL to execute
        name: string,   // database name
        target: host
    }
})
```

**Response (SELECT):** `sqlite:result:{timeStamp}` ← response · scoped

```js
event.detail = { result: Array<Array<any>> } // rows as positional arrays
```

**Response (non-SELECT):** `sqlite:updated:{timeStamp}` ← response · scoped

```js
event.detail = { result: any }
```

---

### `sqlite:statement`
**→ request · scoped**

Execute a parameterised SQL statement. Prefer this over `sqlite:query` for any
statement that includes user-supplied values. Uses positional placeholders
(`$1`, `$2`, …).

```js
new CustomEvent('sqlite:statement', {
    detail: {
        sql: string,        // SQL with $1, $2, … placeholders
        values: Array<any>, // positional values
        name: string,       // database name
        target: host
    }
})
```

**Response (SELECT):** `sqlite:result:{timeStamp}` ← response · scoped

```js
event.detail = { result: Array<Record<string, any>> } // rows as column-keyed objects
```

**Response (non-SELECT):** `sqlite:updated:{timeStamp}` ← response · scoped

```js
event.detail = { result: any }
```

> **Note:** `sqlite:query` returns rows as positional arrays; `sqlite:statement`
> returns rows as column-keyed objects. This asymmetry is intentional —
> `sqlite:statement` uses `db.prepare()` which provides column metadata.

---

### `sqlite:upload`
**→ request · scoped**

Import a `.sqlite` or `.sqlite3` file into OPFS, replacing the named database.

```js
new CustomEvent('sqlite:upload', {
    detail: {
        fileName: string,       // must end in .sqlite or .sqlite3
        arrayBuffer: ArrayBuffer,
        target: host
    }
})
```

**Response:** `sqlite:uploaded` ← response · **broadcast**

```js
event.detail = { result: any }
```

---

### `sqlite:download`
**→ request · scoped**

Export the named database as a `.sqlite3` file download (triggers browser save dialog).

```js
new CustomEvent('sqlite:download', {
    detail: {
        name: string,   // database name
        target: host
    }
})
```

**Response:** `sqlite:downloaded` ← response · **broadcast**

```js
event.detail = { name: string }
```

---

### `sqlite:closeDB`
**→ request · scoped**

Close the database connection and terminate the worker. The OPFS file is kept.

```js
new CustomEvent('sqlite:closeDB', {
    detail: {
        name: string,   // database name
        target: host
    }
})
```

**Response:** `sqlite:closed` ← response · **broadcast**

```js
event.detail = { name: string }
```

---

### `sqlite:deleteDB`
**→ request · scoped**

Close the database connection, terminate the worker, and permanently delete the
OPFS file. Irreversible.

```js
new CustomEvent('sqlite:deleteDB', {
    detail: {
        name: string,   // database name
        target: host
    }
})
```

**Response:** `sqlite:deleted` ← response · **broadcast**

```js
event.detail = { name: string }
```

---

### `sqlite:error`
**← response · broadcast**

Emitted by the bridge on any failure. Consumers should always register a
listener for this event.

```js
event.detail = {
    error: string,          // error message
    action: string,         // the bridge action that failed (e.g. 'executeQuery')
    event: CustomEvent      // the original request event that caused the failure
}
```

---

## Dispatch Pattern (consumer side)

```js
const { dispatchEvent, addEventListener } = window.eventbus;
const host = shadowDocument.host;

// 1. Construct the request before registering the listener
//    so that timeStamp is captured before any async gap.
const req = new CustomEvent('sqlite:statement', {
    detail: {
        sql: 'SELECT * FROM items WHERE id=$1;',
        values: [id],
        name: 'mydb',
        target: host
    }
});

// 2. Register the response listener using the request's timeStamp.
addEventListener(`sqlite:result:${req.timeStamp}`, (event) => {
    const rows = event.detail.result; // Array<Record<string, any>>
    render(rows);
}, host);

// 3. Dispatch after the listener is in place.
dispatchEvent(req, host);
```

---

## Routing Decision Tree

```
Does the event need a specific response?
├── Yes → scoped + timestamp correlation
│         dispatchEvent(event, host)          // request
│         addEventListener(`event:name:${req.timeStamp}`, handler, host)
└── No (lifecycle notification) → broadcast
          dispatchEvent(new CustomEvent('sqlite:closed', { detail: { name } }))
          // no context, no target — all listeners fire
```

---

## Summary Table

| Event | Dir | Routing | Detail keys |
|---|---|---|---|
| `sqlite:create` | → | scoped | `name`, `target` |
| `sqlite:created:{ts}` | ← | scoped | `result` |
| `sqlite:query` | → | scoped | `sql`, `name`, `target` |
| `sqlite:statement` | → | scoped | `sql`, `values`, `name`, `target` |
| `sqlite:result:{ts}` | ← | scoped | `result` (objects) |
| `sqlite:updated:{ts}` | ← | scoped | `result` |
| `sqlite:upload` | → | scoped | `fileName`, `arrayBuffer`, `target` |
| `sqlite:uploaded` | ← | broadcast | `result` |
| `sqlite:download` | → | scoped | `name`, `target` |
| `sqlite:downloaded` | ← | broadcast | `name` |
| `sqlite:closeDB` | → | scoped | `name`, `target` |
| `sqlite:closed` | ← | broadcast | `name` |
| `sqlite:deleteDB` | → | scoped | `name`, `target` |
| `sqlite:deleted` | ← | broadcast | `name` |
| `sqlite:error` | ← | broadcast | `error`, `action`, `event` |