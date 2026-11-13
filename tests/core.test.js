import test from "node:test";
import assert from "node:assert/strict";
import { waterPlan, filterGuides, validateLedgerItem, sanitizeLedgerImport, ledgerExport } from "../src/core.js";
import { GUIDES, SOURCES, CATEGORIES, PHASES } from "../data/guides.js";

test("water plan uses CDC minimum baseline", () => {
  assert.deepEqual(waterPlan(4, 3), { people: 4, days: 3, gallons: 12, liters: 45.42 });
  assert.throws(() => waterPlan(0, 3));
  assert.throws(() => waterPlan(2.5, 3));
  assert.throws(() => waterPlan(1, 0));
  assert.throws(() => waterPlan("oops", 3));
});
test("filters use category, phase and search text", () => {
  assert.ok(filterGuides(GUIDES, { category: "water" }).length >= 2);
  assert.ok(filterGuides(GUIDES, { phase: "Stabilize" }).length >= 2);
  assert.deepEqual(filterGuides(GUIDES, { query: "unlikely search xyz" }), []);
});
test("ledger validates and safely imports records", () => {
  const item = validateLedgerItem({ name: " Bandages ", quantity: "12", unit: "packs", note: "" });
  assert.equal(item.name, "Bandages");
  assert.equal(item.quantity, 12);
  assert.throws(() => validateLedgerItem({ name: "NaN", quantity: "abc", unit: "pcs" }));
  const parsed = JSON.parse(ledgerExport([{ ...item, id: "a1" }]));
  assert.equal(sanitizeLedgerImport(parsed)[0].id, "a1");
  assert.throws(() => sanitizeLedgerImport({ items: [] }));
});
test("atlas guides are unique, coherent, and linked to valid sources", () => {
  assert.equal(GUIDES.length, 24); // 16 original system cards + 8 field-skill cards
  const ids = new Set(GUIDES.map((g) => g.id));
  assert.equal(ids.size, GUIDES.length);
  for (const guide of GUIDES) {
    assert.match(guide.id, /^[a-z0-9-]+$/);
    assert.ok(guide.title && guide.summary && guide.code);
    assert.ok(CATEGORIES.includes(guide.category));
    assert.ok(PHASES.includes(guide.phase));
    assert.ok([1, 2, 3].includes(guide.priority));
    assert.ok(["reference-backed", "community-draft"].includes(guide.review));
    for (const key of ["materials", "steps", "checks", "cautions", "sources", "depends"]) assert.ok(Array.isArray(guide[key]));
    assert.ok(guide.steps.length >= 3 && guide.checks.length >= 2 && guide.cautions.length >= 1);
    for (const s of guide.sources) assert.ok(SOURCES[s], guide.id + " missing source " + s);
    for (const dep of guide.depends) assert.ok(ids.has(dep), guide.id + " unknown dep " + dep);
    assert.ok(!guide.depends.includes(guide.id));
  }
  for (const source of Object.values(SOURCES)) assert.ok(source.url.startsWith("https://"));
});
