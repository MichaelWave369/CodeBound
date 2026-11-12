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
## v0.2 portable field kit

- `scripts/build-field-kit.mjs` takes the structured guide catalog, emits standalone `fieldbook.html` (inline CSS, no JavaScript), `fieldbook.txt`, `fieldbook.json`, and a deterministic ZIP.
- `dist/site/` contains the deployable website plus the portable documents and ZIP download. Deploy `dist/site/`, not the repository root.
- The ZIP includes the static site source, a license, README, and per-file SHA-256 sums. A separate `.sha256` accompanies the ZIP.
- This provides independent *readability* of the guide collection without the network; interactive features still require an HTTP server and JavaScript.
- External third-party reference documents are not bundled. Hashes detect corruption, but do not independently establish publisher identity.

## v0.3 First 72 Hours scenarios

- `data/scenarios.js`: six reviewable scenario cards and primary official source references. The 0–2h, 2–24h and 24–72h windows are planning aids, not safety deadlines or clinical triage.
- `scenarios-ui.js`: static-source, text-node-only DOM rendering with native `details` and `summary` accessibility controls.
- `scripts/build-field-kit.mjs`: automatically includes the same plans in the standalone HTML, plain text, JSON, and portable ZIP. No manual copying of advice into separate publications.
- `tests/scenarios.test.js`: checks uniqueness, cross-references, minimum safety criteria and provenance; `tests/field-kit.test.js` confirms all plans are in every export format.

## v0.4 Community Workshop

- `data/workshops.js` is the shared content source for five materials-based lessons and their cited sources.
- `src/workshop-core.js` generates accessible, safe, three-stage conceptual SVG diagrams and validates a minimal lesson-practice log. Diagrams are not technical wiring schematics.
- `workshop-ui.js` renders native expandable lessons and stores optional practice marks only in browser localStorage. The JSON export includes only lesson IDs and practice timestamps, not names, locations or health details. A mark is not certification.
- `scripts/build-field-kit.mjs` includes all workshop text, SVG and sources in standalone HTML, plain text and JSON, with no external runtime dependency.
- `tests/workshops.test.js` verifies content completeness, cross-references, escaped diagrams and practice-log validation. Portable-kit tests check representation in every format.
