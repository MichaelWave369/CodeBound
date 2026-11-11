export const GALLON_TO_LITER = 3.78541;

export function waterPlan(people, days) {
  const p = Number(people);
  const d = Number(days);
  if (!Number.isInteger(p) || p < 1 || p > 10000) {
    throw new RangeError("People must be a whole number from 1 to 10,000.");
  }
  if (!Number.isInteger(d) || d < 1 || d > 365) {
    throw new RangeError("Days must be a whole number from 1 to 365.");
  }
  const gallons = p * d;
  return { people: p, days: d, gallons, liters: Math.round(gallons * GALLON_TO_LITER * 100) / 100 };
}

export function filterGuides(guides, { query = "", category = "all", phase = "all" } = {}) {
  const needle = String(query).trim().toLocaleLowerCase();
  return guides.filter((guide) => {
    if (category !== "all" && guide.category !== category) return false;
    if (phase !== "all" && guide.phase !== phase) return false;
    const haystack = [guide.title, guide.summary, guide.category, guide.phase, ...guide.materials, ...guide.steps]
      .join(" ").toLocaleLowerCase();
    return !needle || haystack.includes(needle);
  }).sort((a, b) => a.priority - b.priority || a.title.localeCompare(b.title));
}

export function validateLedgerItem(raw) {
  const name = String(raw.name ?? "").trim();
  const quantity = Number(raw.quantity);
  const unit = String(raw.unit ?? "").trim();
  const note = String(raw.note ?? "").trim();
  if (!name || name.length > 80) throw new RangeError("Item name must contain 1–80 characters.");
  if (!Number.isFinite(quantity) || quantity <= 0 || quantity > 10000000) {
    throw new RangeError("Quantity must be greater than 0 and no more than 10,000,000.");
  }
  if (!unit || unit.length > 25) throw new RangeError("Unit must contain 1–25 characters.");
  if (note.length > 200) throw new RangeError("Note must contain at most 200 characters.");
  return { name, quantity, unit, note };
}

export function sanitizeLedgerImport(payload) {
  if (!payload || payload.format !== "codebound-ledger-v1" || !Array.isArray(payload.items)) {
    throw new Error("Invalid CodeBound ledger format.");
  }
  if (payload.items.length > 5000) throw new RangeError("Import exceeds 5,000 records.");
  return payload.items.map((row, index) => ({
    ...validateLedgerItem(row),
    id: String(row.id || "import-" + index).slice(0, 100),
    created: String(row.created || "").slice(0, 35)
  }));
}

export function ledgerExport(items) {
  return JSON.stringify({ format: "codebound-ledger-v1", exportedAt: new Date().toISOString(), items }, null, 2);
}
