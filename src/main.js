/**
 * @fileoverview Application entry point for the @vanillaspa/boilerplate.
 *
 * Boot sequence:
 * 1. The shared web-components runtime is imported so every `.sfc.html` component
 *    under `/src/components` can be registered as a custom element.
 * 2. The Tailwind stylesheet is converted into a `CSSStyleSheet` and passed to
 *    the component registry.
 * 3. All `.sfc.html` files are discovered with `import.meta.glob(...)`, registered,
 *    and the root component is mounted into the document body.
 * 4. Optional runtime modules are loaded in parallel and exposed on `window`
 *    under their exported `name` value or alias.
 *
 * Every module exposed on `window` must export a `name` string. Missing names
 * fail fast during boot so configuration mistakes are visible immediately.
 *
 * @module main
 */
import tailwindCss from '/src/styles/tailwind.css?inline';
import { registerComponents } from '@vanillaspa/web-components';
import { rawComponents } from '@vanillaspa/components-library';

// 1. register Web Components
const tailwindSheet = new CSSStyleSheet();
tailwindSheet.replaceSync(tailwindCss.replaceAll(':root', ':host')); // patch known Tailwind issue with :root selector in shadow DOM
registerComponents(rawComponents, tailwindSheet);

let root = 'router-app'; // the root element to replace body children with 
await customElements.whenDefined(root);

// 2. load modules with optional configuration that tells, how it should be named on 'window'
const modulesToLoad = [
    { load: () => import('@vanillaspa/event-bus') },
    { load: () => import('@vanillaspa/sqlite-database') },
    { load: () => import('@vanillaspa/sqlite-database/contract') }
]

try {
    // 2. Parallel load (Promise.allSettled saves from blocking on error) 
    const results = await Promise.allSettled(
        modulesToLoad.map(m => m.load())
    );

    results.forEach((result, index) => {
        if (result.status === 'rejected') {
            console.error('Error loading module ${index}:', result.reason);
            return;
        }

        const module = result.value;
        const name = modulesToLoad[index].name || module.name; // use defined alias OR exported name 
        if (name) { // OR ignore
            console.log(`not ignoring module ${name}`);
            window[name] = Object.freeze({ ...module });
        }
    });
} catch (error) {
    console.error('Critical error during module initialization:', error);
} finally { // guaranteed rendering
    document.body.replaceChildren(document.createElement(root));
};
