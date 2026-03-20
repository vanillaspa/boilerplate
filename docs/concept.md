Create a conceptual architecture graphic for the Vanilla SPA framework.
The graphic flows top to bottom across five layers.

────────────────────────────────────────────────
LAYER 0 — Build tool (full width, neutral gray)

  Vite
  import.meta.glob · bundles all SFCs at build time

────────────────────────────────────────────────
LAYER 1 — web-components (full width, purple)

  web-components owns and mounts the SFC.
  It is the framework: reads each .html file,
  calls customElements.define, attaches shadowRoot,
  injects shadowDocument, manages hostDataIDs
  and connectedCallback.

  Inside it, three side-by-side panels representing
  the three sections of every SFC .html file:

  [<template>]               [<script>]                 [<style>]
  purple                     purple                     purple
  shadow DOM markup          shadowDocument injected    scoped to shadowRoot
  cloned into shadowRoot     component logic            no leakage in or out
  on connectedCallback       optional: eventbus         plain CSS / SCSS
                             optional: sqlite

  All three panels are purple — web-components owns all of them.
  No color distinction between the panels.

────────────────────────────────────────────────
LAYER 2 — Optional modules (two boxes side by side)

  Arrows flow downward from <script> only into both modules.
  Label between SFC and modules: "optional modules available in <script>"

  [event-bus]                          [sqlite-database]
  teal                                 amber
  WeakMap · WeakRef · typeIndex        enqueue via MessageChannel
  components communicate               one Worker spawned per DB name
  via CustomEvents

────────────────────────────────────────────────
LAYER 3 — sqlite-database internals (amber, right side only)
          event-bus pattern callout (teal dashed, left side)

  RIGHT SIDE — sqlite-database internals, flowing downward:

    sqlite-database
        ↓
    MessageChannel (dashed border)
    port1 stays in main thread · port2 transferred to Worker
        ↓  (fan out to three boxes)
    [Worker db:A]   [Worker db:B]   [Worker db:…]
    one Worker per named database, running sqlite-wasm
        ↓  (converge)
    OPFS
    *.sqlite3 files · private · offline-first

  LEFT SIDE — event-bus timestamped pattern callout (dashed border):

    dispatchEvent(myEvent)
        ↓
    addEventListener('type:' + myEvent.timeStamp, handler, host)

    isolates each async request
    no cross-talk between concurrent calls

────────────────────────────────────────────────
LEGEND

  purple = web-components (owns the SFC: template, script, style)
  teal   = event-bus module
  amber  = sqlite-database · Workers · OPFS

────────────────────────────────────────────────
Design language:
- Clean technical schematic, dark-mode friendly
- Flat fills, thin strokes (0.5px)
- Dashed borders for logical groupings (MessageChannel, callout boxes)
- Arrows show data/event flow, not import graph
- No icons, no decorative elements
- web-components is visually dominant as the outermost container
- sqlite-database Worker fan-out makes the one-Worker-per-DB
  pattern immediately obvious