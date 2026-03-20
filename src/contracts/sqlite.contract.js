/**
 * @fileoverview Event API Contract for the sqlite-database module.
 *
 * Plain data declaration — no runtime behaviour. Exposed on `window` as
 * `window.SqliteContract` by `main.js` alongside `window.eventbus` and
 * `window.sqlite`.
 *
 * An AI CLI reads this contract to generate the correct `addEventListener`
 * and `dispatchEvent` calls inside any component `<script>` that needs
 * database access. No imports, no wrappers — just the event bus primitives
 * guided by the shapes declared here.
 *
 * **Naming convention**
 * ```
 * request:   sqlite:{action}                     2-fold, scoped to host
 * response:  sqlite:{past}:{event.timeStamp}     3-fold, correlated
 * error:     sqlite:error:{event.timeStamp}      3-fold, correlated
 * ```
 *
 * **Routing**
 * Pass `host` as the second argument to both `eventbus.addEventListener` and
 * `eventbus.dispatchEvent` to scope events to a single component instance.
 *
 * **Correlation**
 * Capture `event.timeStamp` from the request event before dispatching.
 * Use it to construct the response/error event type so each call gets its
 * own listener and concurrent calls never interfere with each other.
 *
 * @example <caption>Bridge side (sqlite-notes.html)</caption>
 * const host = shadowDocument.host;
 * eventbus.addEventListener('sqlite:query', async (event) => {
 *     const { sql, name } = event.detail;
 *     const result = await sqlite.executeQuery(sql, name);
 *     eventbus.dispatchEvent(
 *         new CustomEvent(`sqlite:queried:${event.timeStamp}`, { detail: { result } }),
 *         host
 *     );
 * }, host);
 *
 * @example <caption>Consumer side (any component)</caption>
 * const host = shadowDocument.host;
 * const req = new CustomEvent('sqlite:query', { detail: { sql: 'SELECT * FROM notes', name: 'notes' } });
 * eventbus.addEventListener(`sqlite:queried:${req.timeStamp}`, (e) => {
 *     console.log(e.detail.result);
 * }, host);
 * eventbus.dispatchEvent(req, host);
 *
 * @module contracts/sqlite
 */

/**
 * Supported field types for contract detail schemas.
 * @typedef {'string'|'number'|'boolean'|'array'|'object'|'any'} FieldType
 */

/**
 * A map of field names to their expected types.
 * @typedef {Record<string, FieldType>} Schema
 */

/**
 * A single event definition within the contract.
 * @typedef {object} EventDef
 * @property {Schema} detail - Expected shape of the request `event.detail`.
 * @property {string} past   - Past-tense verb used in the correlated response
 *   event type: `{namespace}:{past}:{event.timeStamp}`.
 */

/**
 * The window key under which this contract is registered by `main.js`.
 * @type {'SqliteContract'}
 */
export const name = 'SqliteContract';

/**
 * Event namespace prefix. All event types in this contract are prefixed with
 * this string followed by a colon.
 * @type {'sqlite'}
 */
export const namespace = 'sqlite';

/**
 * Event definitions for all sqlite-database actions.
 *
 * Each key is an action name that maps to a 2-fold request event type
 * `sqlite:{action}` and a 3-fold correlated response `sqlite:{past}:{ts}`.
 *
 * @type {Record<string, EventDef>}
 */
export const events = {
    /** Open (or reuse) a named SQLite database in OPFS. */
    create: { detail: { name: 'string' }, past: 'created' },
    /** Execute a raw SQL string. Use for DDL or non-parameterised queries. */
    query: { detail: { sql: 'string', name: 'string' }, past: 'queried' },
    /** Execute a parameterised SQL statement. Prefer over `query` for user data. */
    statement: { detail: { sql: 'string', values: 'array', name: 'string' }, past: 'executed' },
    /** Flush and close the named database's Worker. */
    close: { detail: { name: 'string' }, past: 'closed' },
    /** Close and permanently remove the named database file from OPFS. */
    delete: { detail: { name: 'string' }, past: 'deleted' },
    /** Upload a `.sqlite3` or `.sqlite` file into OPFS as a named database. */
    upload: { detail: { fileName: 'string', arrayBuffer: 'any' }, past: 'uploaded' },
    /** Download the named database file from OPFS as a `.sqlite3` blob. */
    download: { detail: { name: 'string' }, past: 'downloaded' },
};