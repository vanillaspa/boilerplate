import('@vanillaspa/web-components');

customElements.whenDefined("router-app2").then(() => {
    Promise.all([
        import('@vanillaspa/event-bus'),
        import('@vanillaspa/sqlite-database')
    ]).then((importedModules) => {
        importedModules.forEach((module) => {
            if (!module.name) {
                throw new Error('Missing name in imported module.');
            }
            window[module.name] = module;
        });
    }).finally(() => {
        const root = document.body;
        root.replaceChildren(); // clear existing content safely
        const app = document.createElement('router-app2');
        root.appendChild(app);
    });
})