# CODEBOUND
### A living, offline-first atlas for rebuilding the essentials

> Preserve knowledge. Restore services. Share what works. Leave no one behind.

**CodeBound** is a free, practical field library for communities preparing for or recovering from major disruptions. It combines hands-on build instructions, a dependency atlas, locally runnable software, and source-backed safety notes. It is equally useful for a neighborhood resilience project, a makerspace, a disaster-preparedness class, or a community recovering from an outage.

## What exists in v0.1

- 16 foundational system cards across water, sanitation, food, shelter, energy, communications, health, repair, education, and local governance.
- Searchable, printable, mobile-friendly atlas and interactive build details.
- Offline-first static web app with an installable web manifest and service-worker cache.
- Two working tools: minimum emergency water planner and local-only commons supply ledger with JSON export/import.
- Dependency references, practical checks, source links, risk warnings, and transparent review status.
- Zero runtime dependencies. Plain HTML, CSS, and JavaScript. Runs on modest hardware.
- Unit tests and GitHub Actions for quality checks.

## Run locally

Requires Node.js 20+ to use the included local web server and test suite.

1. Clone the repository.
2. Run: npm test
3. Run: npm run dev
4. Open http://localhost:4173

Alternatively serve the folder using any static HTTP server. Direct file:// opening is not supported because modules and service workers require HTTP(S). The first successful load requires internet or local hosting; **once cached**, core materials work offline in supported browsers. External source links are not cached.

## Deploy on GitHub Pages

In repository Settings > Pages, choose **GitHub Actions** as the build and deployment source. Merging to main runs tests and attempts a Pages deployment. The expected URL will be https://michaelwave369.github.io/CodeBound/ only after Pages is enabled and a deployment succeeds. Do not treat this address as live until verified.

## Reading a field guide

Each system has: objective, materials, build steps, acceptance checks, risks, dependencies, reference sources, and a practical software pattern where relevant. Some are **reference-backed starting points** and others are **community design drafts**. Neither means professionally certified. Verify locally before deploying high-risk systems.

**Safety:** This is NOT a substitute for professional medical advice, structural assessment, electrical qualifications, water-quality testing, sanitation regulations, or local emergency authority instructions. Do not rely on homemade filters to remove toxic chemicals, do not improvise mains connections, and do not use fuel-burning generators indoors. Knowledge should reduce harm, not multiply it.

## Core dependency chain

1. People, accountability, communications, and immediate risk assessment.
2. Safe water and hand hygiene.
3. Waste separation, sanitation, and safe food.
4. Shelter, heating/cooling safety, and basic lighting.
5. Growing food, repair capacity, teaching, and resilient offline records.
6. Legitimate, transparent local decision-making and long-term infrastructure recovery.

## Repository structure

- index.html, styles.css, app.js: offline-first interactive atlas
- data/guides.js: structured systems, steps, sources, dependencies
- src/core.js: tested calculations, search, and ledger validation
- examples/: independently runnable, small code recipes
- docs/: architecture, editorial criteria, and expansion plan
- tests/: regression tests for data and core utilities

## Philosophy

**People above profit. Evidence above folklore. Cooperation above coercion.** Designed for many possible futures, not as a prediction of collapse.

Contributions welcome. See CONTRIBUTING.md. Distributed under MIT; source documents linked from the atlas retain their original licenses and rights, and are not copied into this repository.