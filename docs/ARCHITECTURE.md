# CodeBound architecture

## Design constraints

- Offline-first: installation and initial caching require a connection, but navigation, search, reference text, calculations, and ledger work offline.
- Static hosting: no remote API, third-party SDK, font CDN, cookie banner, or account.
- Indexed, inspectable content: all source material is in data/guides.js, suitable for peer review and future export formats.
- Accessible and printable: native HTML elements, keyboard-operable filters, dialog details, and a print stylesheet.
- Local data ownership: ledger uses browser localStorage and user-driven JSON import/export. Data is never transmitted by the app.
- Trust boundaries: user input is rendered as text nodes, never parsed as HTML. JSON import validates number and text limits.

## Services and files

| Concern | File |
| --- | --- |
| Atlas content | data/guides.js |
| Search, calculator, ledger validation | src/core.js |
| DOM and persistence | app.js |
| Shell and printable structure | index.html, styles.css |
| Offline pre-cache | service-worker.js |
| Schema-level checks | tests/core.test.js |
| Host-only static server | scripts/serve.mjs |

## Future

- Downloadable PDF/EPUB and raw plain-text packs for non-browser devices.
- Localization, audio guides, SVG diagrams, and unit conversion.
- Better dependency graph with provenance and revision links.
- Content verification workflow: reviewer signatures, review dates, conditions, and field-test results.
- Optional peer-to-peer synchronization with conflict resolution, consent, and data minimization.
- Materials quantity estimators for safe low-risk builds.

No remote synchronization or real-time verification is currently implemented. PWA cache may be evicted by the browser; use the ZIP/USB copy for long-term offline preservation.