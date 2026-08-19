/**
 * @fileoverview Application entry point for the @vanillaspa/boilerplate.
 *
 * Boot sequence:
 * 1. The shared @vanillaspa/web-components runtime is imported. Every raw
 *    component from the @vanillaspa/components-library will be registered.
 * 2. The Tailwind stylesheet is converted into a `CSSStyleSheet` and passed to
 *    the component registry.
 * 3. All custom `.sfc.html` files under `/src/components` are discovered with
 *    `import.meta.glob(...)` and registered with the tailwindSheet.
 * 4. Optional runtime modules are loaded in parallel and exposed on `window`
 *    under their exported `name` value or alias.
 *
 * @module main
 */
import tailwindCss from '/src/styles/tailwind.css?inline';
import { registerComponents } from '@vanillaspa/web-components';
import { rawComponents } from '@vanillaspa/components-library';
const myComponents = import.meta.glob('/src/components/**/*.sfc.html', { eager: true, query: '?raw' });

const tailwindSheet = new CSSStyleSheet();
tailwindSheet.replaceSync(tailwindCss.replaceAll(':root', ':host')); // patch known Tailwind issue with :root selector in shadow DOM
registerComponents(rawComponents, tailwindSheet);
registerComponents(myComponents, tailwindSheet);

let root = 'router-app'; // the root element to replace body children with 
await customElements.whenDefined(root);

// use optional name to tell, how it should be named on 'window'
const modulesToLoad = [
    { load: () => import('@vanillaspa/event-bus') },
    { load: () => import('@vanillaspa/sqlite-database') },
    { load: () => import('@vanillaspa/sqlite-database/contract') },
    { load: () => import('graphql'), name: 'graphqlmod' }
]

try {
    const results = await Promise.allSettled( // Promise.allSettled saves from blocking on error
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
            window[name] = Object.freeze({ ...module });
        }
    });
} catch (error) {
    console.error('Critical error during module initialization:', error);
} finally {
    document.body.replaceChildren(document.createElement(root));
};
