import('@vanillaspa/web-components');

customElements.whenDefined("sqlite-control").then(() => {
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
        const root = document.getElementsByTagName('body')[0];
        root.innerHTML = '<sqlite-control></sqlite-control>';
    });
})