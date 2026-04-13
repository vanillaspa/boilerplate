/**
 * @fileoverview Application entry point for Vanilla SPA.
 *
 * Boot sequence:
 * 1. `@vanillaspa/web-components` is imported immediately so that all SFCs
 *    under `/src/components` are defined in the `customElements` registry
 *    as early as possible.
 * 2. Once the root element is defined, the optional modules
 *    and all event API contracts are loaded in parallel.
 * 3. Every imported module — including contracts — is frozen and exposed on
 *    `window` under its `name` export. This makes `window.eventbus`,
 *    `window.sqlite`, `window.SqliteContract`, etc. available to all
 *    component scripts without explicit imports.
 * 4. The app is mounted by replacing `document.body` with the root element.
 *
 * **Module contract:** Every module (npm package or local contract file)
 * registered on `window` MUST export a `name` string. An error is thrown at
 * boot time if `name` is absent so misconfigured modules fail loudly.
 *
 *
 * @module main
 */
import('@vanillaspa/web-components');

let root = 'router-app';

customElements.whenDefined(root).then(() => {
    Promise.all([
        import('@vanillaspa/event-bus'),
        import('@vanillaspa/sqlite-database'),
        import('@vanillaspa/sqlite-database/contract'),
        import('./components/hero/hero-contract.js'),
    ]).then((modules) => {
        modules.forEach((module) => {
            if (!module.name) throw new Error(`Missing name in imported module.`);
            window[module.name] = Object.freeze({ ...module });
        });
    }).finally(() => {
        document.body.replaceChildren();
        document.body.appendChild(document.createElement(root));
    });
});