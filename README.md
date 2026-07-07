# Vanilla SPA Boilerplate

A minimal, modern starter for WebComponents-based single page applications using Vite, Tailwind, an event bus, and a local SQLite-powered data layer.

This repository demonstrates how to build a real browser-first app with:
- standard HTML custom elements in `.sfc.html` single file components
- shadow DOM-based component isolation with `shadowDocument`
- `@vanillaspa/event-bus` for app-wide messaging
- `@vanillaspa/sqlite-database` backed by OPFS and web workers
- fast Vite development and HTTPS support

---

## Why this boilerplate?

Vanilla SPA is designed for developers who want more control than a framework offers, without losing modern app capabilities.

It is:
- small and dependency-light
- standards-based and framework-agnostic
- AI-ready for prompt-driven component creation
- built for offline-friendly local-first data access
- compatible with Tailwind, global CSS, and modern browser runtime modules

---

## Quick Start

```bash
git clone https://github.com/vanillaspa/boilerplate.git
cd boilerplate
npm install
npm run dev
```

Then open:

`https://localhost:5173`

### Production build

```bash
npm run build
npm run preview
```

---

## What’s included

- `src/main.js` – app entry point
- `src/components/` – collection of `.sfc.html` web component files
- `src/styles/` – global CSS and Tailwind styles
- `@vanillaspa/web-components` – automatic component registration
- `@vanillaspa/event-bus` – app-wide event messaging
- `@vanillaspa/sqlite-database` – SQLite OPFS persistence with worker support
- HTTPS support via `@vitejs/plugin-basic-ssl`

---

## How it works

`src/main.js` bootstraps the app by:
1. importing the shared web-components runtime
2. converting Tailwind CSS into a shadow-safe stylesheet
3. auto-registering every `src/components/**/*.sfc.html` file
4. rendering the root component `router-app`
5. loading runtime modules and exposing them on `window`

This project uses `import.meta.glob('/src/components/**/*.sfc.html', { eager: true, query: '?raw' })` to register file-based components automatically.

---

## Component authoring

Each `.sfc.html` file contains a top-level `<template>`, `<script>`, and `<style>` block.

Example:

```html
<template>
  <button id="donate-btn">Donate to VanillaSPA</button>
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
    item_name: 'Support VanillaSPA Development',
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
}

const button = shadowDocument.querySelector('#donate-btn');
button.addEventListener('click', () => {
  sendDonation('robert.meissner@outlook.com', 'EUR');
});
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
}
</style>
```

### Component location

Place components under `src/components/`.
A custom element named `<app-start>` can live at `src/components/app/app-start.sfc.html`, but the folder structure is flexible as long as the file name follows custom element conventions.

---

## Runtime APIs

- `shadowDocument` – the private shadow DOM scope for each component
- `eventbus` – implements `EventTarget` with `addEventListener`, `removeEventListener`, and `dispatchEvent`
- `sqlite` – includes `getWorkers`, `createDB`, `closeDB`, `deleteDB`, `executeQuery`, `executeStatement`, `uploadDB`, and `downloadDB`

These APIs are exposed globally from the modules imported in `src/main.js`.

---

## Key features

- vanilla JavaScript WebComponents
- single-file component authoring with `.sfc.html`
- automatic component registration
- Tailwind CSS + global stylesheet support
- event bus for message-driven architecture
- local-first SQLite persistence in OPFS
- worker-based database pooling
- built-in router example with `router-app`
- HTTPS dev server support
- low complexity, high clarity

---

## Recommended workflow

- Use VS Code for editing and live reload
- Add components under `src/components/`
- Keep styles inside each `.sfc.html` for scoped behavior
- Use `eventbus` for cross-component communication
- Use `sqlite` for persistent local data

---

## License

This project is released under the public domain via [The Unlicense](https://choosealicense.com/licenses/unlicense/).
