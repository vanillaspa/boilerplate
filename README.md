You are currently LIVE @Stackblitz! Trying out [https://github.com/vanillaspa/boilerplate](https://github.com/vanillaspa/boilerplate)
You are in a dev-container. Currently running a complete AI-ready website. Look how it is build in the Terminal. Stackblitz may be a little bit laggy..

No, this is not about LOOKS! This is a boilerplate project for a vanilla JS micro-framework 'Vanilla SPA' with the latest web-components, event-bus and sqlite-database module.

# Vanilla SPA

With Vanilla SPA your web development experience can become a dream. There is nothing so complicated that it can't be made simple. Vanilla SPA is an AI-ready micro-framework with a fraction of the complexity of established JavaScript-Frameworks.

I kid You not: Vanilla SPA is an advanced, yet minimalistic WebComponents framework featuring most of the functionality of popular JavaScript frameworks, but in a fraction of their complexity. It is written in vanilla JavaScript.

This is free and unencumbered software released into the public domain. [The Unlicense](https://choosealicense.com/licenses/unlicense/)

## Installation

### Prerequisites

You need to have <a title="NodeJS" href="https://nodejs.org"><img height="20" alt="NodeJS-logo" src="https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21.svg"></a> installed. (This is being taken care of, if you are @Stackblitz)

The Vanilla SPA boilerplate consists of [web-components](https://github.com/vanillaspa/web-components), an [event-bus](https://github.com/vanillaspa/event-bus), and a [sqlite-database](https://github.com/vanillaspa/sqlite-database) (<a title="SQLite" href="https://sqlite.org/wasm"><img height="20" alt="SQLite-logo" src="https://sqlite.org/images/sqlite370_banner.gif"></a>) within the [Origin Private Filesystem (OPFS)](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system)
on top of [Vite](https://vitejs.dev)<a title="Vite" href=""><img height="20" alt="Vitejs-logo" src="https://vitejs.dev/logo.svg"></a>

### Getting started

Running Vanilla SPA is as easy as cloning the boilerplate repository.
```bash
  git clone https://github.com/vanillaspa/boilerplate.git
  cd boilerplate
  npm install
```
and then simply 
```bash
  npm run dev
```

You can then access the app via https://localhost:4173 in your browser.

## How It's done

You create SNIPPETS by using dedicated Single File Components (SFCs) à la Vue or Svelte with a ```template```, ```script``` and ```style``` tag on the top-level of the `.sfc` file.

You combine standard HTML templates vith vanilla JS. [SEE THE EXAMPLE](https://github.com/vanillaspa/boilerplate/blob/main/src/components/please/please-donate.sfc)

![Conceptual graphic](https://github.com/vanillaspa/boilerplate/blob/main/assets/conceptual.png)

This is AI-ready.
Say to the AI, for instance Copilot in VS Code: *Learn how to create sfc components with vanillaspa and create a single file component for a donate paypal button.*

This is a no-brainer.

```html
<template>
  <button id="donate-btn">
    Donate to VanillaSPA
  </button>
</template>

<script>
  function sendDonation(email, currency) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://www.paypal.com/cgi-bin/webscr';
    
    const params = {
      cmd: '_donations',
      business: email,
      currency_code: currency,
      item_name: 'Support VanillaSPA Development'
    };

    for (const [key, value] of Object.entries(params)) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  const button = shadowDocument.querySelector("#donate-btn");
    button.addEventListener("click", () => {
      sendDonation('robert.meissner@outlook.com', 'EUR')";
    }
</script>

<style>
  button {
    background: #0070ba;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
</style>
```

**Important!** Only restriction: Each component must be located in your project under [./src/components/](https://github.com/vanillaspa/boilerplate/blob/main/src/components). For a component named `<app-start></app-start>` it should be `src/components/app/app-start.sfc`. While the `app` folder is optional, the [import.meta.glob Wildcard-Pattern](https://github.com/vanillaspa/web-components/blob/881048a70a58854eb364f30c03b5b12483f47307/index.js#L1) will work for any components using [custom elements naming conventions](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name).

All the `.sfc` files under [./src/components/](https://github.com/vanillaspa/boilerplate/blob/main/src/components) are automagically defined as web-components in the customElements registry, see [./src/main.js](https://github.com/vanillaspa/boilerplate/blob/main/src/main.js). You just have to register your elements in the CustomElements registry. Your custom elements can be instantiated immediately without further ado.

## API description

- `shadowDocument` is the private scope DOM on each of your custom `HTMLElement`s. Most methods available on the `document` are also available on the `shadowDocument`, for instance `getElementById` or  `querySelector`.
- The EventBus implements `EventTarget`. `addEventListener`, `removeEventListener`, `dispatchEvent` are available on the `eventbus` object.
- `getWorkers`, `createDB`, `closeDB`, `deleteDB`, `executeQuery`, `executeStatement`, `uploadDB`, `downloadDB` are available on the `sqlite` object.

## Features

- written in vanilla JavaScript
- support for custom elements in dedicated .sfc single file components (SFCs). Now you can create or use your own library of custom-elements!
- following [W3C standards and MDN-recommended best practices](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks) where people claim: *"This is impossible with WebComponents"*
- direct access to ShadowDOM in each component's script (via `shadowDocument`)
- out of the box SCSS support
- Event-Bus!!!!
- local first SQLite database for global state management with the Origin Private File System (OPFS). Your data stays private.
- dedicated workers for database pooling
- offline capabilities
- history-driven sitemap router [navigation module](https://github.com/vanillaspa/boilerplate/blob/main/src/components/router/router-app.sfc)
- support for Tailwind CSS or other global stylesheets
- support for containerized builds. Docker ready.
- https support out of the box ([@vitejs/plugin-basic-ssl](https://github.com/vitejs/vite-plugin-basic-ssl))
- basic functionality in under <100LOC

## Component Lifecycle

In case you want some deeper insights you should learn and understand how the [WebComponents lifecycle](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks) is working.

## Feedback

If you still have questions please let me know. Your opinion is valuable to me and sharing what you think is higly appreciated! If you have any feedback and want to share your suggestions please consider the contribution guidelines and reach out to @jahro_me

## Example

Adding a router navigation is very easy. [As the example shows](https://github.com/vanillaspa/boilerplate/blob/main/src/components/router/router-app.sfc) You can have an entire navigation in one single sfc file defined as just another custom element. After having it integrated into your app with a single tag (`<router-app></router-app>`), you can have routing support and all the things you would expect.

Of course you are completely free to customize the themes, modules and components and make them whatever you want them to become!
