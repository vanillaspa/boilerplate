<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>OWASP-Kommunikationsdiagramm – Vanilla SPA</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background: #f1f5f9;
      color: #0f172a;
      padding: 2rem;
    }

    header {
      text-align: center;
      margin-bottom: 2rem;
    }
    header h1 {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: .35rem;
    }
    header p {
      font-size: .8rem;
      color: #64748b;
    }

    /* ── Main diagram layout: two zones side by side ── */
    .diagram {
      display: grid;
      grid-template-columns: 1fr 4px 1fr;
      gap: 0;
      max-width: 1100px;
      margin: 0 auto 2.5rem;
      background: #fff;
      border: 1.5px solid #cbd5e1;
      border-radius: 16px;
      overflow: hidden;
    }

    .zone {
      padding: 1.5rem 1.5rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    .zone-client { background: #eef2ff; }
    .zone-server { background: #fef2f2; }

    .zone-divider {
      background: repeating-linear-gradient(
        to bottom,
        #a5b4fc 0px, #a5b4fc 8px,
        transparent 8px, transparent 14px
      );
      width: 4px;
    }

    .zone-label {
      font-size: .75rem;
      font-weight: 700;
      margin-bottom: 1.2rem;
      display: flex;
      align-items: center;
      gap: .5rem;
    }
    .zone-label::before {
      content: '';
      display: block;
      width: 10px; height: 10px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .zone-client .zone-label { color: #4338ca; }
    .zone-client .zone-label::before { background: #6366f1; }
    .zone-server .zone-label { color: #b91c1c; }
    .zone-server .zone-label::before { background: #dc2626; }

    /* ── Nodes ── */
    .node {
      background: #fff;
      border-radius: 10px;
      border: 2px solid;
      padding: .65rem 1rem;
      text-align: center;
    }
    .node h3 { font-size: .88rem; font-weight: 700; margin-bottom: .2rem; }
    .node p  { font-size: .71rem; color: #475569; line-height: 1.5; }

    .node-browser { border-color: #6366f1; }
    .node-browser h3 { color: #1e1b4b; }

    .node-worker { border-color: #059669; background: #ecfdf5; }
    .node-worker h3 { color: #064e3b; }
    .node-worker p  { color: #065f46; }

    .node-opfs { border-color: #6366f1; }
    .node-opfs h3 { color: #1e1b4b; }

    .node-http { border-color: #dc2626; }
    .node-http h3 { color: #7f1d1d; }

    .node-sql { border-color: #c2410c; background: #fff7ed; }
    .node-sql h3 { color: #7c2d12; }
    .node-sql p  { color: #7c2d12; }

    /* ── Vertical arrow between nodes ── */
    .v-connector {
      display: flex;
      align-items: stretch;
      padding: 0 0 0 3rem;
      min-height: 52px;
      gap: .75rem;
    }
    .v-connector .shaft {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 16px;
      flex-shrink: 0;
    }
    .v-connector .line {
      width: 2.5px;
      flex: 1;
      background: currentColor;
    }
    .tip-down::after {
      content: '';
      display: block;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 8px solid currentColor;
    }
    .tip-up::before {
      content: '';
      display: block;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 8px solid currentColor;
    }
    .v-connector .v-label {
      font-size: .7rem;
      font-weight: 600;
      color: inherit;
      display: flex;
      align-items: center;
    }

    /* ── Event-bus tunnel ── */
    .bus-row {
      display: flex;
      align-items: stretch;
      margin: .6rem 0;
      gap: 0;
    }

    /* Left stub: Browser ↕ Bus connector */
    .bus-stub-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 40px;
      flex-shrink: 0;
      gap: 0;
    }
    .bus-stub-left .arrow-up,
    .bus-stub-left .arrow-down {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
    }
    .bus-stub-left .line-v {
      width: 2.5px;
      flex: 1;
      background: #6366f1;
    }
    .tip-up-ind::before {
      content: '';
      display: block;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 8px solid #6366f1;
    }
    .tip-down-ind::after {
      content: '';
      display: block;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 8px solid #6366f1;
    }

    /* The tunnel itself */
    .bus-tunnel {
      flex: 1;
      background: linear-gradient(180deg, #e0e7ff 0%, #c7d2fe 40%, #e0e7ff 100%);
      border: 2.5px solid #6366f1;
      border-radius: 30px;
      padding: .5rem 1.2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      box-shadow: inset 0 2px 6px rgba(99,102,241,.15);
      min-height: 64px;
    }
    .bus-tunnel h3 {
      font-size: .85rem;
      font-weight: 700;
      color: #1e1b4b;
      margin-bottom: .15rem;
    }
    .bus-tunnel p {
      font-size: .68rem;
      color: #4338ca;
      text-align: center;
      line-height: 1.4;
    }

    /* event flow arrows inside tunnel */
    .bus-flow {
      display: flex;
      align-items: center;
      gap: .5rem;
      margin-top: .35rem;
    }
    .flow-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: #6366f1;
      animation: pulse 1.6s ease-in-out infinite;
    }
    .flow-dot:nth-child(2) { animation-delay: .3s; opacity: .7; }
    .flow-dot:nth-child(3) { animation-delay: .6s; opacity: .4; }
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(.6); opacity: .3; }
    }
    .flow-arrow {
      font-size: .7rem;
      color: #6366f1;
      font-weight: 700;
    }

    /* Right stub: Bus → SQL (crosses zone divider, shown via annotation) */
    .bus-exit {
      display: flex;
      align-items: center;
      padding-left: .6rem;
      gap: .4rem;
      flex-shrink: 0;
    }
    .bus-exit-label {
      font-size: .65rem;
      font-weight: 600;
      color: #b91c1c;
      white-space: nowrap;
      writing-mode: vertical-lr;
      transform: rotate(180deg);
      border-left: 2px dashed #b91c1c;
      padding-left: .3rem;
    }

    /* ── Cross-zone arrow (Bus → SQL-Server) ── */
    .cross-arrow {
      display: flex;
      align-items: center;
      gap: 0;
      margin: .4rem 0 .4rem -1.5rem;
      padding-right: 1rem;
    }
    .cross-line {
      height: 2.5px;
      flex: 1;
      background: #b91c1c;
    }
    .cross-tip::after {
      content: '';
      display: block;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-left: 8px solid #b91c1c;
    }
    .cross-label {
      font-size: .68rem;
      font-weight: 600;
      color: #b91c1c;
      white-space: nowrap;
      margin-left: .5rem;
    }

    /* Horizontal arrow between zones for Bus→SQL */
    .h-arrow-row {
      display: grid;
      grid-template-columns: 1fr 4px 1fr;
      align-items: center;
      max-width: 1100px;
      margin: 0 auto;
      /* positioned as overlay between diagram sections */
    }

    /* ── Legend ── */
    .legend {
      max-width: 1100px;
      margin: 0 auto;
      background: #fff;
      border: 1.5px solid #cbd5e1;
      border-radius: 12px;
      padding: 1.4rem 1.6rem;
    }
    .legend h2 {
      font-size: .95rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }
    .legend-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem 2.5rem;
    }
    .legend-item {
      display: flex;
      gap: .6rem;
    }
    .dot {
      flex-shrink: 0;
      width: 11px; height: 11px;
      border-radius: 50%;
      margin-top: 3px;
    }
    .legend-item h4 { font-size: .8rem; font-weight: 600; margin-bottom: .2rem; }
    .legend-item p  { font-size: .73rem; color: #475569; line-height: 1.55; }

    .legend-footer {
      margin-top: 1rem;
      padding-top: .85rem;
      border-top: 1px solid #e2e8f0;
      font-size: .73rem;
      color: #475569;
      line-height: 1.6;
    }
    .legend-footer strong { color: #0f172a; }

    /* Risk badge */
    .risk {
      display: inline-block;
      font-size: .65rem;
      font-weight: 700;
      padding: 1px 6px;
      border-radius: 4px;
      margin-right: 4px;
      vertical-align: middle;
    }
    .risk-low    { background: #dcfce7; color: #14532d; }
    .risk-high   { background: #fee2e2; color: #7f1d1d; }
    .risk-vhigh  { background: #fecdd3; color: #881337; }
  </style>
</head>
<body>

<header>
  <h1>Komponentenkommunikation – OWASP-Bewertung · Vanilla SPA · Vite-Build + SQL-Server-Backend</h1>
  <p>event-bus = Pub/Sub-Tunnel zwischen Custom Elements · Sync-Listener sendet direkt an SQL-Server · kein HTTP-Server-Proxy</p>
</header>

<!-- Main two-zone diagram -->
<div class="diagram">

  <!-- ══ CLIENT ZONE ══ -->
  <div class="zone zone-client">
    <div class="zone-label">Vertrauensgrenze: Client (nicht vertrauenswürdig aus Server-Sicht)</div>

    <!-- Browser -->
    <div class="node node-browser">
      <h3>Browser — Custom Elements (Main Thread)</h3>
      <p>DOM · Trusted Types · fetch() · Sync-/Persistenz-Logik der Elements</p>
    </div>

    <!-- Browser ↕ Bus (bidirectional) -->
    <div class="v-connector" style="color:#6366f1; min-height: 44px;">
      <div class="shaft">
        <div class="tip-up" style="color:#6366f1;"></div>
        <div class="line"></div>
        <div class="tip-down" style="color:#6366f1;"></div>
      </div>
      <span class="v-label">dispatchEvent / addEventListener</span>
    </div>

    <!-- Event-bus tunnel -->
    <div class="bus-tunnel">
      <h3>@vanillaspa/event-bus</h3>
      <p>Pub/Sub-Tunnel (EventTarget) · Custom-Element-zu-Custom-Element</p>
      <div class="bus-flow">
        <span class="flow-arrow">⟶ Event ⟶</span>
        <div class="flow-dot"></div>
        <div class="flow-dot"></div>
        <div class="flow-dot"></div>
        <span class="flow-arrow">⟶ Listener</span>
      </div>
    </div>

    <!-- Bus → SQLite-Worker (postMessage via Persistenz-Listener) -->
    <div class="v-connector" style="color:#0d9488; min-height: 44px;">
      <div class="shaft">
        <div class="line"></div>
        <div class="tip-down" style="color:#0d9488;"></div>
      </div>
      <span class="v-label">postMessage (CRUD-Befehle via Persistenz-Listener)</span>
    </div>

    <!-- SQLite-Worker -->
    <div class="node node-worker">
      <h3>SQLite-Worker</h3>
      <p>genau ein Worker je OPFS-DB · alleiniger Schreibzugriff · kein Service Worker</p>
    </div>

    <!-- Worker → OPFS -->
    <div class="v-connector" style="color:#059669; min-height: 44px;">
      <div class="shaft">
        <div class="line"></div>
        <div class="tip-down" style="color:#059669;"></div>
      </div>
      <span class="v-label">exklusives Sync-Access-Handle</span>
    </div>

    <!-- OPFS -->
    <div class="node node-opfs">
      <h3>OPFS</h3>
      <p>Origin Private File System · SQLite-Datei</p>
    </div>

  </div><!-- /zone-client -->

  <!-- ══ DIVIDER ══ -->
  <div class="zone-divider"></div>

  <!-- ══ SERVER ZONE ══ -->
  <div class="zone zone-server">
    <div class="zone-label">Vertrauensgrenze: Server</div>

    <!-- HTTP-Server -->
    <div class="node node-http">
      <h3>HTTP-Server (nginx)</h3>
      <p>statisches Ausliefern · CSP / COOP / COEP-Header · HMAC-Trust-Anchor (eigenständig)</p>
    </div>

    <!-- Browser ↔ HTTP-Server connector label (aligns with Browser↕Bus v-connector area) -->
    <div style="min-height: 44px; display:flex; align-items:center; padding-left:.5rem;">
      <div style="border-left: 2px dashed #94a3b8; padding-left:.6rem;">
        <span style="font-size:.68rem; color:#64748b; font-style:italic;">kein direkter Pfad zum SQL-Server</span>
      </div>
    </div>

    <!-- SQL-Server (aligns with event-bus tunnel row) -->
    <div class="node node-sql" style="margin-bottom:0;">
      <h3>SQL-Server</h3>
      <p>Server-seitige Datenbank · eigener Endpunkt · direkt vom Sync-Listener erreichbar</p>
    </div>

    <!-- Sync-Listener → SQL-Server cross-zone annotation -->
    <div style="min-height:44px; display:flex; align-items:center; padding: .3rem .5rem 0;">
      <span style="
        display:inline-flex; align-items:center; gap:.4rem;
        font-size:.68rem; font-weight:600; color:#b91c1c;
        border: 1.5px solid #fca5a5; border-radius:6px;
        background:#fef2f2; padding:.3rem .6rem;
      ">
        ← Sync-Listener (HMAC-Event-Sync)
      </span>
    </div>

    <!-- spacer to align with SQLite-Worker + OPFS rows -->
    <div style="flex:1;"></div>

  </div><!-- /zone-server -->

</div><!-- /diagram -->

<!-- Cross-zone arrow indicator (visual callout) -->
<div style="max-width:1100px; margin: -1.4rem auto 2rem; display:flex; justify-content:center; align-items:center; gap:.5rem; position:relative; z-index:2;">
  <div style="height:2.5px; width:120px; background:#b91c1c;"></div>
  <div style="width:0; height:0; border-top:5px solid transparent; border-bottom:5px solid transparent; border-left:8px solid #b91c1c;"></div>
  <span style="font-size:.72rem; font-weight:700; color:#b91c1c; background:#fef2f2; padding:.2rem .6rem; border-radius:6px; border:1.5px solid #fca5a5;">
    Sync-Listener (event-bus) → SQL-Server · HMAC-signiert · Zone-Grenze überschreiten
  </span>
  <div style="height:2.5px; width:120px; background:#b91c1c;"></div>
</div>

<!-- ── Legend ── -->
<div class="legend">
  <h2>OWASP-Risikobewertung je Kommunikationskanal</h2>
  <div class="legend-grid">

    <div class="legend-item">
      <div class="dot" style="background:#15803d;"></div>
      <div>
        <h4><span class="risk risk-low">Niedrig</span> Browser ↔ HTTP-Server</h4>
        <p>fetch() / Vite-Build-Module über HTTPS. Risiko: A08 bei Supply-Chain-Angriff auf Dependency, A05 bei fehlenden Headern. Mitigation: Lockfile, gepinnte Versionen, CSP + Trusted-Types + COOP/COEP gesetzt.</p>
      </div>
    </div>

    <div class="legend-item">
      <div class="dot" style="background:#b91c1c;"></div>
      <div>
        <h4><span class="risk risk-vhigh">Sehr hoch</span> Sync-Listener → SQL-Server</h4>
        <p>A01: SQL-Server direkt vom nicht vertrauenswürdigen Client erreichbar — trägt Auth, Rate-Limiting und Input-Validation allein. A03: parametrisierte Queries/Prepared Statements zwingend. A02: eigenes TLS-Zertifikat/Port nötig (kein Durchreichen über HTTPS des HTTP-Servers).</p>
      </div>
    </div>

    <div class="legend-item">
      <div class="dot" style="background:#15803d;"></div>
      <div>
        <h4><span class="risk risk-low">Niedrig</span> Browser ↔ event-bus (Tunnel)</h4>
        <p>Kein Netzwerk-Hop. Pub/Sub ausschließlich zwischen Custom Elements im Main Thread. A03 relevant falls Event-Payloads ungeprüft in innerHTML landen — Mitigation: textContent statt innerHTML (notes-article-Fix bereits angewendet).</p>
      </div>
    </div>

    <div class="legend-item">
      <div class="dot" style="background:#b91c1c;"></div>
      <div>
        <h4><span class="risk risk-high">Hoch</span> Vertrauensverschiebung ohne Gateway</h4>
        <p>Ohne HTTP-Server als Vermittler entfällt die zentrale Validierungsinstanz. Auth, Rate-Limiting und Schema-Validierung müssen vollständig im SQL-Server-Endpunkt liegen. Empfehlung: schlanker REST/WebSocket-Adapter direkt vor dem SQL-Server.</p>
      </div>
    </div>

    <div class="legend-item">
      <div class="dot" style="background:#059669;"></div>
      <div>
        <h4><span class="risk risk-low">Niedrig</span> SQLite-Worker ↔ OPFS</h4>
        <p>Single-Writer-Garantie: genau ein Worker je OPFS-DB, kein paralleler Schreibzugriff (A04 entschärft). Natürlicher Punkt für Input-Validation (A03) und Storage-Exhaustion-Schutz (A04). OPFS schützt nur die Origin — Dateiinhalt selbst ist unverschlüsselt (A02).</p>
      </div>
    </div>

    <div class="legend-item">
      <div class="dot" style="background:#15803d;"></div>
      <div>
        <h4><span class="risk risk-low">Niedrig</span> HTTP-Server: nur Asset-Auslieferung</h4>
        <p>Keine Verbindung zum SQL-Server, keine Vermittlerrolle im Datenpfad. Risiko beschränkt sich auf A08/A05 bei der Asset-Auslieferung. Security-Header (CSP, COOP, COEP) werden hier korrekt gesetzt.</p>
      </div>
    </div>

  </div>

  <div class="legend-footer">
    <strong>Gesamtfazit:</strong>
    Größtes Risiko ist der direkte Sync-Listener→SQL-Server-Pfad, der die Zonengrenze ohne Gateway überquert.
    Der SQL-Server muss Auth, TLS, Rate-Limiting und Injection-Schutz vollständig selbst tragen.
    Alle anderen Kanäle sind durch Single-Writer-Garantie (OPFS), CSP/Trusted-Types (Browser) und
    rein In-Process-Kommunikation (event-bus-Tunnel) gut abgesichert.
  </div>
</div>

<svg viewBox="0 0 1280 940" xmlns="http://www.w3.org/2000/svg" font-family="'Segoe UI', Arial, sans-serif">
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#334155"/>
    </marker>
    <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#b91c1c"/>
    </marker>
    <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#15803d"/>
    </marker>
  </defs>

  <rect width="1280" height="940" fill="#f8fafc"/>
  <text x="640" y="36" text-anchor="middle" font-size="22" font-weight="700" fill="#0f172a">Komponentenkommunikation – OWASP-Bewertung (Vanilla SPA, Vite-Build + SQL-Server-Backend)</text>
  <text x="640" y="58" text-anchor="middle" font-size="13" fill="#64748b">event-bus = Pub/Sub zwischen Custom Elements; Sync-Listener verbindet sich direkt mit dem SQL-Server (kein HTTP-Server-Proxy)</text>

  <!-- Trust boundary: Client -->
  <rect x="30" y="90" width="820" height="500" rx="14" fill="#eef2ff" stroke="#a5b4fc" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="50" y="115" font-size="13" font-weight="700" fill="#4338ca">Vertrauensgrenze: Client (nicht vertrauenswürdig aus Server-Sicht)</text>

  <!-- Trust boundary: Server -->
  <rect x="900" y="90" width="350" height="430" rx="14" fill="#fef2f2" stroke="#fca5a5" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="920" y="115" font-size="13" font-weight="700" fill="#b91c1c">Vertrauensgrenze: Server</text>

  <!-- Browser node -->
  <rect x="80" y="150" width="220" height="100" rx="10" fill="#ffffff" stroke="#6366f1" stroke-width="2"/>
  <text x="190" y="178" text-anchor="middle" font-size="15" font-weight="700" fill="#1e1b4b">Browser (Main Thread)</text>
  <text x="190" y="198" text-anchor="middle" font-size="11" fill="#475569">DOM, Custom Elements,</text>
  <text x="190" y="213" text-anchor="middle" font-size="11" fill="#475569">Trusted Types, fetch(),</text>
  <text x="190" y="228" text-anchor="middle" font-size="11" fill="#475569">Sync-/Persistenz-Logik der Elements</text>

  <!-- SQLite Worker node (single writer per DB) -->
  <rect x="80" y="330" width="220" height="100" rx="10" fill="#ecfdf5" stroke="#059669" stroke-width="2.5"/>
  <text x="190" y="356" text-anchor="middle" font-size="14" font-weight="700" fill="#064e3b">SQLite-Worker</text>
  <text x="190" y="374" text-anchor="middle" font-size="10.5" fill="#065f46">genau ein Worker je OPFS-DB,</text>
  <text x="190" y="388" text-anchor="middle" font-size="10.5" fill="#065f46">alleiniger OPFS-Zugriffspunkt,</text>
  <text x="190" y="402" text-anchor="middle" font-size="10.5" fill="#065f46">kein zusätzlicher Service Worker</text>

  <!-- OPFS node -->
  <rect x="80" y="480" width="220" height="70" rx="10" fill="#ffffff" stroke="#6366f1" stroke-width="2"/>
  <text x="190" y="508" text-anchor="middle" font-size="15" font-weight="700" fill="#1e1b4b">OPFS</text>
  <text x="190" y="528" text-anchor="middle" font-size="11" fill="#475569">Origin Private File System</text>

  <!-- Event-bus node (moved: same row as SQLite-Worker / SQL-Server) -->
  <rect x="420" y="330" width="220" height="100" rx="10" fill="#ffffff" stroke="#6366f1" stroke-width="2"/>
  <text x="530" y="358" text-anchor="middle" font-size="15" font-weight="700" fill="#1e1b4b">@vanillaspa/event-bus</text>
  <text x="530" y="378" text-anchor="middle" font-size="11" fill="#475569">Pub/Sub-Hub (EventTarget),</text>
  <text x="530" y="393" text-anchor="middle" font-size="11" fill="#475569">Custom-Element-zu-Custom-Element +</text>
  <text x="530" y="408" text-anchor="middle" font-size="11" fill="#475569">Sync-Listener für Server-Anbindung</text>

  <!-- HTTP Server node -->
  <rect x="950" y="150" width="250" height="100" rx="10" fill="#ffffff" stroke="#dc2626" stroke-width="2"/>
  <text x="1075" y="178" text-anchor="middle" font-size="15" font-weight="700" fill="#7f1d1d">HTTP-Server</text>
  <text x="1075" y="198" text-anchor="middle" font-size="11" fill="#475569">statisches Ausliefern,</text>
  <text x="1075" y="213" text-anchor="middle" font-size="11" fill="#475569">CSP/COOP/COEP-Header,</text>
  <text x="1075" y="228" text-anchor="middle" font-size="11" fill="#475569">HMAC-Trust-Anchor (eigenständig)</text>

  <!-- SQL Server node (new, behind HTTP Server) -->
  <rect x="950" y="330" width="250" height="110" rx="10" fill="#fff7ed" stroke="#c2410c" stroke-width="2.5"/>
  <text x="1075" y="358" text-anchor="middle" font-size="15" font-weight="700" fill="#7c2d12">SQL-Server</text>
  <text x="1075" y="378" text-anchor="middle" font-size="11" fill="#7c2d12">Server-seitige Datenbank,</text>
  <text x="1075" y="393" text-anchor="middle" font-size="11" fill="#7c2d12">eigener Endpunkt, direkt vom</text>
  <text x="1075" y="408" text-anchor="middle" font-size="11" fill="#7c2d12">Client erreichbar (kein HTTP-Proxy)</text>

  <!-- Edges -->
  <!-- Browser <-> HTTP Server (static delivery) -->
  <path d="M300,185 L950,190" fill="none" stroke="#15803d" stroke-width="2.5" marker-end="url(#arrowGreen)"/>
  <path d="M950,210 L300,205" fill="none" stroke="#15803d" stroke-width="2.5" marker-end="url(#arrowGreen)"/>
  <text x="620" y="165" text-anchor="middle" font-size="11" fill="#15803d" font-weight="600">HTTPS fetch() / Vite-Build-Module</text>

  <!-- Browser <-> EventBus (moved down, diagonal connection) -->
  <path d="M300,210 C 360,260 380,300 420,355" fill="none" stroke="#15803d" stroke-width="2.5" marker-end="url(#arrowGreen)"/>
  <path d="M420,395 C 380,330 360,260 300,220" fill="none" stroke="#15803d" stroke-width="2.5" marker-end="url(#arrowGreen)"/>
  <text x="330" y="290" text-anchor="middle" font-size="10" fill="#15803d" font-weight="600">dispatchEvent /</text>
  <text x="330" y="303" text-anchor="middle" font-size="10" fill="#15803d" font-weight="600">addEventListener</text>

  <!-- Browser <-> SQLite-Worker (direct, no service worker in between) -->
  <path d="M190,250 L190,330" fill="none" stroke="#0d9488" stroke-width="2.5" marker-end="url(#arrow)"/>
  <text x="245" y="295" font-size="11" fill="#0d9488" font-weight="600">postMessage (CRUD-Befehle)</text>

  <!-- SQLite-Worker <-> OPFS (single writer) -->
  <path d="M190,430 L190,480" fill="none" stroke="#059669" stroke-width="2.5" marker-end="url(#arrowGreen)"/>
  <text x="245" y="460" font-size="11" fill="#059669" font-weight="600">exklusives Sync-Access-Handle</text>

  <!-- EventBus (Sync-Listener) <-> SQL-Server: same row, direct horizontal connection -->
  <path d="M640,380 L950,380" fill="none" stroke="#b91c1c" stroke-width="2.5" marker-end="url(#arrowRed)"/>
  <text x="795" y="368" text-anchor="middle" font-size="10.5" fill="#b91c1c" font-weight="600">Sync-Listener → HMAC-Event-Sync (eigener Endpunkt)</text>

  <!-- Legend -->
  <rect x="30" y="610" width="1220" height="310" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="50" y="638" font-size="14" font-weight="700" fill="#0f172a">OWASP-Risikobewertung je Kommunikationskanal</text>

  <!-- Legend rows -->
  <circle cx="55" cy="662" r="6" fill="#15803d"/>
  <text x="70" y="667" font-size="12" font-weight="600" fill="#0f172a">Browser ↔ HTTP-Server (fetch, Vite-Build-Module)</text>
  <text x="70" y="683" font-size="11" fill="#475569">Niedrig – sofern CSP/Trusted-Types greifen. Risiko: A08 (Software/Data Integrity) bei Supply-Chain-Angriff; A05 falls Header fehlen.</text>
  <text x="70" y="698" font-size="11" fill="#475569">Mitigation: gepinnte Versionen + Lockfile, CSP+Trusted-Types, COOP/COEP gesetzt.</text>

  <circle cx="55" cy="720" r="6" fill="#15803d"/>
  <text x="70" y="725" font-size="12" font-weight="600" fill="#0f172a">Browser ↔ Event-Bus / Browser ↔ SQLite-Worker ↔ OPFS</text>
  <text x="70" y="741" font-size="11" fill="#475569">Niedrig – kein Netzwerk-Hop für Bus; genau ein Worker pro OPFS-Datenbank, kein paralleler Schreibzugriff (A04 entschärft).</text>
  <text x="70" y="756" font-size="11" fill="#475569">A03 weiterhin relevant bei ungeprüften Event-Payloads, die in innerHTML landen könnten.</text>

  <circle cx="55" cy="778" r="6" fill="#15803d"/>
  <text x="70" y="783" font-size="12" font-weight="600" fill="#0f172a">HTTP-Server: nur noch statisches Ausliefern</text>
  <text x="70" y="799" font-size="11" fill="#475569">Niedrig – HTTP-Server hat keine Verbindung mehr zum SQL-Server und keine Vermittlerrolle. Sein Risiko reduziert sich auf den</text>
  <text x="70" y="814" font-size="11" fill="#475569">Browser↔HTTP-Server-Kanal oben (Asset-Auslieferung). Er ist nicht mehr Teil der Datenpfad-Kette.</text>

  <circle cx="55" cy="838" r="6" fill="#b91c1c"/>
  <text x="640" y="662" font-size="12" font-weight="600" fill="#0f172a">Event-Bus (Sync-Listener) ↔ SQL-Server (direkt, kein HTTP-Server dazwischen)</text>
  <text x="640" y="678" font-size="11" fill="#475569">Sehr hoch – A01 (Broken Access Control): der SQL-Server ist damit ein eigener, vom nicht vertrauenswürdigen Client direkt erreichbarer</text>
  <text x="640" y="693" font-size="11" fill="#475569">Netzwerk-Endpunkt. Ohne vorgeschalteten Gatekeeper trägt der SQL-Server selbst die volle Last von Auth, Rate-Limiting und Input-Validation.</text>
  <text x="640" y="710" font-size="11" fill="#475569">A03 (Injection): zwingend parametrisierte Queries/Prepared Statements server-seitig. A02: Verbindung muss TLS-verschlüsselt sein (eigenes</text>
  <text x="640" y="725" font-size="11" fill="#475569">Zertifikat/Port nötig, da kein Durchreichen über die HTTPS-Verbindung des HTTP-Servers). Konkrete Frage: welches Protokoll/Port? Ein</text>
  <text x="640" y="740" font-size="11" fill="#475569">SQL-Wire-Protokoll direkt im Browser ist unüblich – vermutlich ein REST/WebSocket-Adapter vor dem eigentlichen SQL-Server nötig.</text>

  <text x="640" y="767" font-size="12" font-weight="600" fill="#0f172a">Vertrauensverschiebung durch direkten SQL-Server-Zugriff</text>
  <text x="640" y="783" font-size="11" fill="#475569">Ohne HTTP-Server als Vermittler entfällt die zentrale Validierungsinstanz. Jede Authentifizierungs-, Rate-Limiting- und Schema-Prüfung</text>
  <text x="640" y="798" font-size="11" fill="#475569">muss jetzt im SQL-Server-Endpunkt selbst (oder seinem direkt vorgeschalteten Adapter) liegen – ein einzelner Fehler dort exponiert die DB.</text>

  <text x="70" y="868" font-size="11" fill="#475569">Gesamtfazit: höchstes Risiko ist jetzt der direkte SQL-Server-Endpunkt – ohne HTTP-Server als Gatekeeper trägt er Auth, Rate-Limiting,</text>
  <text x="70" y="882" font-size="11" fill="#475569">Input-Validation und TLS allein. Empfehlung: einen schlanken Adapter (REST/WebSocket mit eigener Auth) direkt vor den SQL-Server stellen,</text>
  <text x="70" y="896" font-size="11" fill="#475569">statt SQL-Wire-Protokoll im Browser-Kontext zu exponieren – sonst sind A01/A02/A03 gleichzeitig betroffen.</text>
</svg>
</body>
</html>