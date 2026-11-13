import test from "node:test";
import assert from "node:assert/strict";
import { GUIDES, SOURCES, CATEGORIES } from "../data/guides.js";
import { renderHtml, renderText, renderJson } from "../scripts/build-field-kit.mjs";

const EIGHT = [
  "field-hunt-fish-harvest",
  "field-purify-water",
  "field-natural-medicine-literacy",
  "field-build-shelter",
  "field-grow-garden",
  "field-create-power",
  "field-personal-safety",
  "field-navigate"
];

test("all eight field skills are findable and complete", () => {
  const ids = new Set(GUIDES.map(g => g.id));
  assert.equal(ids.size, GUIDES.length, "guide IDs must be unique");
  for (const id of EIGHT) {
    const guide = GUIDES.find(g => g.id === id);
    assert.ok(guide, "missing skill: " + id);
    assert.ok(CATEGORIES.includes(guide.category), "unknown category: " + id);
    assert.ok(["Stabilize", "Sustain", "Rebuild"].includes(guide.phase));
    assert.ok(["community-draft", "reference-backed"].includes(guide.review));
    assert.ok(guide.materials.length >= 3);
    assert.ok(guide.steps.length >= 4);
    assert.ok(guide.checks.length >= 3);
    assert.ok(guide.cautions.length >= 2);
    assert.ok(guide.sources.length >= 1);
    for (const source of guide.sources) {
      assert.ok(SOURCES[source], "unresolved source " + source);
      assert.match(SOURCES[source].url, /^https:\/\//);
    }
    for (const dependency of guide.depends) {
      assert.ok(ids.has(dependency), "unresolved dependency: " + dependency);
    }
  }
});
test("all eight skills are bundled in offline html, text and JSON", () => {
  const html = renderHtml(), txt = renderText(), json = JSON.parse(renderJson());
  for (const id of EIGHT) {
    const guide = GUIDES.find(g => g.id === id);
    assert.ok(html.includes('id="' + id + '"'));
    assert.ok(txt.includes(guide.title));
    assert.ok(json.guides.some(g => g.id === id));
  }
});
