/**
 * @fileoverview Application entry point for Vanilla SPA.
 *
 * Boot sequence:
 * 1. `@vanillaspa/web-components` is imported immediately so that all SFCs
 *    under `/src/components` are defined in the `customElements` registry
 *    as early as possible.
 * 2. Once the root element (`router-app2`) is defined, the optional modules
 *    and all event API contracts are loaded in parallel.
 * 3. Every imported module — including contracts — is frozen and exposed on
 *    `window` under its `name` export. This makes `window.eventbus`,
 *    `window.sqlite`, `window.SqliteContract`, etc. available to all
 *    component scripts without explicit imports.
 * 4. The app is mounted by replacing `document.body` with `<router-app2>`.
 *
 * **Module contract:** Every module (npm package or local contract file)
 * registered on `window` MUST export a `name` string. An error is thrown at
 * boot time if `name` is absent so misconfigured modules fail loudly.
 *
 * **Contract convention:** Local event API contracts live in
 * `/src/contracts/*.contract.js`. They are plain data modules — no runtime
 * behaviour — picked up automatically via `import.meta.glob`. Add a new
 * `*.contract.js` file and it will be available on `window` on next boot
 * without any changes to this file.
 *
 * @module main
 */

/**
 * @typedef {object} NamedModule
 * @property {string} name - The key under which this module is exposed on `window`.
 */

import('@vanillaspa/web-components');

customElements.whenDefined("router-app2").then(() => {
    Promise.all([
        import('@vanillaspa/event-bus'),
        import('@vanillaspa/sqlite-database'),
        ...Object.values(import.meta.glob('/src/contracts/*.contract.js', { eager: true })),
    ]).then((importedModules) => {
        importedModules.forEach((/** @type {NamedModule} */ module) => {
            if (!module.name) {
                throw new Error('Missing name in imported module.');
            }
            window[module.name] = Object.freeze({ ...module });
        });
    }).finally(() => {
        const root = document.body;
        root.replaceChildren();
        const app = document.createElement('router-app2');
        root.appendChild(app);
    });
});