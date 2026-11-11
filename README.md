# CODEBOUND
### A living, offline-first atlas for restoring essential community systems

> Preserve knowledge. Restore services. Share what works. Leave no one behind.

**CodeBound** is a free, practical field library for neighbors, responders and makerspaces preparing for or recovering from infrastructure disruption. This is an open resilience project, **not a prediction of collapse**.

## What's included in v0.3

- 16 foundational, structured system cards across water, sanitation, food, shelter, energy, communications, health, repair, education, and community.
- **Six 72-hour response plans** for water disruption, power outages, unsafe food storage, communications loss, shelter displacement and voluntary neighborhood coordination. Each has timed checkpoints, acceptance tests, escalation warnings and source provenance.
- Searchable, accessible, printable mobile-friendly web atlas with dependencies, materials, ordered steps, acceptance checks, cautions, and links to primary sources.
- Two client-side tools: minimum emergency water planner and local-only inventory ledger with JSON export/import.
- Offline-first PWA with a service worker; runtime has no third-party packages or required cloud API.
- **Portable field kit:** one-click ZIP containing a completely standalone HTML fieldbook, a plain-text edition, machine-readable JSON, a snapshot of the web app, README, license and SHA-256 checksums.
- A reproducible Node.js build, automated archive verification, and GitHub Actions deployment.

## Choose the right offline mode

| Situation | Use | Requirements |
| --- | --- | --- |
| Browse after previously loading the site | Installed/cached PWA | A compatible browser and a successful first online load |
| Open field instructions from USB, even after a complete outage | **fieldbook.html** from the portable ZIP | Any modern browser; double-click the file; **no server, JavaScript, internet or storage** |
| Read on a simple device or print | **fieldbook.txt** from the ZIP | Any text reader or printer |
| Access the interactive water calculator and shared-supply ledger | Website / local HTTP server | A modern browser with JavaScript, a local HTTP server and an HTML5-compatible device |
| Integrate guides into other tools | **fieldbook.json** | A JSON parser |

The portable HTML contains all guide and response-plan text and inline styling. **External references are *links*, not bundled copies**, so source websites cannot be accessed without connectivity. Download authoritative documents separately and obey their licensing if archival use is necessary.

## Build locally

Requires Node.js 20+ to run tests, package builder and development server.

```sh
npm test
npm run build
npm run dev
```

The local interactive site runs at `http://localhost:4173`. The portable output is in `dist/site/`. Double-click `dist/site/fieldbook.html` or `dist/site/codebound-field-kit.zip` to distribute the fieldbook.

To run the interactive version from the extracted ZIP entirely offline, open a terminal in its `site/` directory and run `node scripts/serve.mjs`, then visit `http://localhost:4173`. Node.js 20+ must already be installed. The server binds only to `127.0.0.1`, not to the LAN.

**Response-plan times:** The 0–2, 2–24 and 24–72 hour windows are organizational prompts, not health, evacuation or safety deadlines. See current official alerts before acting. **Reproducibility:** given the same sources and Node-compatible compression, the ZIP has fixed timestamps and sorted entries. The tests build twice, compare archive bytes, independently extract files, and validate every file's SHA-256 from its manifest.

**Integrity is not authenticity:** the included checksums can detect accidental changes, but a malicious replacement can update its own checksum. Obtain downloads through a trusted channel and verify release provenance separately.

## Deploy on GitHub Pages

The Actions workflow validates, builds, publishes `dist/site/` and uploads the ZIP as an Actions artifact. In repository **Settings → Pages**, select **GitHub Actions** as deployment source. The expected URL is https://michaelwave369.github.io/CodeBound/ only after Pages is enabled and deployment succeeds.

## Safety & limitations

These are **starting points**, not certified medical, structural, water, sanitation or electrical procedures. Reference-backed means linked authoritative material underlies key safety facts; community drafts still need trained review. Verify current local guidance and conditions.

Never assume boiling removes chemical contamination; never improvise household mains wiring or fuel-burning equipment inside buildings. Respect consent, privacy and accessibility. Do not treat the atlas as legal authority.

## Contributing

Every guide must document its objective, materials, ordered steps, measurable acceptance checks, hazards, sources, maintenance and an honest review status. See [CONTRIBUTING.md](CONTRIBUTING.md), [docs/EDITORIAL.md](docs/EDITORIAL.md) and [docs/ROADMAP.md](docs/ROADMAP.md). Contributions focused on evidence, translations, tested low-risk builds, illustrations and community resilience are welcome.

## License

MIT for original CodeBound content; linked third-party documents retain their own licenses and copyrights. People above profit. Evidence above folklore. Cooperation above coercion.
