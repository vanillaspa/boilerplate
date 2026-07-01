/**
 * @fileoverview Application entry point for the @vanillaspa/boilerplate.
 *
 * Boot sequence:
 * 1. The shared web-components runtime is imported so every `.sfc` component
 *    under `/src/components` can be registered as a custom element.
 * 2. The Tailwind stylesheet is converted into a `CSSStyleSheet` and passed to
 *    the component registry.
 * 3. All `.sfc` files are discovered with `import.meta.glob(...)`, registered,
 *    and the root component is mounted into the document body.
 * 4. Optional runtime modules are loaded in parallel and exposed on `window`
 *    under their exported `name` value.
 *
 * Every module exposed on `window` must export a `name` string. Missing names
 * fail fast during boot so configuration mistakes are visible immediately.
 *
 * @module main
 */
import tailwindCss from '/src/styles/tailwind.css?inline';
import { registerComponents } from '@vanillaspa/web-components';

const tailwindSheet = new CSSStyleSheet();
tailwindSheet.replaceSync(tailwindCss.replaceAll(':root', ':host')); // patch known Tailwind issue with :root selector in shadow DOM

const rawComponents = import.meta.glob('/src/components/**/*.sfc', { eager: true, query: '?raw' });
console.debug('Booting Vanilla SPA...', rawComponents);

registerComponents(rawComponents, tailwindSheet);

let root = 'router-app';

await customElements.whenDefined(root);

try {
    const modules = await Promise.all([
        import('@vanillaspa/event-bus'),
        import('@vanillaspa/sqlite-database'),
        import('@vanillaspa/sqlite-database/contract'),
        import('./components/hero/hero-contract.js'),
    ]);
    modules.forEach((module) => {
        if (!module.name) throw new Error(`Missing name in imported module.`);
        window[module.name] = Object.freeze({ ...module });
    });
} finally {
    document.body.replaceChildren(document.createElement(root));
};
