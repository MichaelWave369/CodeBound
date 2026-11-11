import { GUIDES, SOURCES, CATEGORIES } from "./data/guides.js";
import { waterPlan, filterGuides, validateLedgerItem, sanitizeLedgerImport, ledgerExport } from "./src/core.js";

const byId = (id) => document.getElementById(id);
const node = (tag, className = "", content = "") => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (content !== "") element.textContent = content;
  return element;
};
const titleize = (word) => word.charAt(0).toUpperCase() + word.slice(1);
const catalog = new Map(GUIDES.map((guide) => [guide.id, guide]));
let activeGuide = null;
let ledger = [];
const LEDGER_KEY = "codebound-ledger-v1";

byId("system-count").textContent = GUIDES.length;
for (const category of CATEGORIES.filter((item) => item !== "all")) {
  const option = node("option", "", titleize(category)); option.value = category;
  byId("category").append(option);
}

function renderAtlas() {
  const filtered = filterGuides(GUIDES, {
    query: byId("search").value,
    category: byId("category").value,
    phase: byId("phase").value
  });
  byId("results-count").textContent = filtered.length + " / " + GUIDES.length + " SYSTEMS VISIBLE";
  byId("no-results").hidden = filtered.length !== 0;
  const cards = filtered.map((guide) => {
    const article = node("article", "guide-card");
    const tags = node("div", "card-tags");
    tags.append(node("span", "", guide.category + " / " + guide.phase));
    tags.append(node("span", "review-tag", guide.review === "reference-backed" ? "SOURCE-BACKED" : "DRAFT"));
    article.append(tags, node("h3", "", guide.title), node("p", "", guide.summary));
    const foot = node("div", "card-foot");
    foot.append(node("span", "", "PRIORITY " + String(guide.priority).padStart(2, "0") + " · " + guide.effort));
    const open = node("button", "", "Read field guide ↗"); open.type = "button";
    open.setAttribute("aria-label", "Read " + guide.title);
    open.addEventListener("click", () => openGuide(guide.id));
    foot.append(open); article.append(foot);
    return article;
  });
  byId("guide-grid").replaceChildren(...cards);
}
for (const id of ["search", "category", "phase"]) byId(id).addEventListener("input", renderAtlas);
renderAtlas();

function section(heading, values, ordered = false, extraClass = "") {
  const wrap = node("section", "detail-group " + extraClass);
  wrap.append(node("h3", "", heading));
  const list = node(ordered ? "ol" : "ul");
  for (const value of values) list.append(node("li", "", value));
  wrap.append(list); return wrap;
}
function openGuide(id) {
  const guide = catalog.get(id);
  if (!guide) return;
  activeGuide = guide;
  const detail = byId("guide-detail");
  const frag = document.createDocumentFragment();
  frag.append(node("p", "dialog-kicker", guide.category.toUpperCase() + " / " + guide.phase.toUpperCase()));
  const headline = node("h2", "", guide.title); headline.id = "dialog-title"; frag.append(headline);
  frag.append(node("p", "dialog-lede", guide.summary));
  const meta = node("div", "dialog-meta");
  for (const item of ["Priority " + guide.priority, "Estimated: " + guide.effort, guide.review === "reference-backed" ? "Reference-backed starter" : "Community design draft"]) {
    meta.append(node("span", "", item));
  }
  frag.append(meta);
  if (guide.depends.length) frag.append(section("Depends on", guide.depends.map((key) => catalog.get(key).title)));
  frag.append(section("Gather / prepare", guide.materials));
  frag.append(section("Build / operate", guide.steps, true));
  frag.append(section("Checks before relying on it", guide.checks));
  frag.append(section("Hazards and boundaries", guide.cautions, false, "warning"));
  const code = node("section", "detail-group");
  code.append(node("h3", "", "Software / recordkeeping pattern"), node("p", "", guide.code));
  frag.append(code);
  const evidence = node("section", "detail-group");
  evidence.append(node("h3", "", "Sources and review"));
  if (guide.sources.length) {
    const list = node("ul");
    for (const sourceKey of guide.sources) {
      const source = SOURCES[sourceKey];
      const li = node("li");
      const link = node("a", "", source.title + " ↗");
      link.href = source.url; link.target = "_blank"; link.rel = "noopener noreferrer";
      li.append(link); list.append(li);
    }
    evidence.append(list);
  } else {
    evidence.append(node("p", "", "Community design draft; sources and specialist review are still needed before high-consequence use."));
  }
  evidence.append(node("p", "", "This entry is not a certified field procedure. Check current local rules and technical guidance."));
  frag.append(evidence);
  detail.replaceChildren(frag);
  const dialog = byId("guide-dialog");
  if (!dialog.open) {
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }
  const url = new URL(window.location.href);
  url.searchParams.set("guide", id);
  window.history.replaceState(null, "", url);
}
function closeGuide() {
  const dialog = byId("guide-dialog");
  if (typeof dialog.close === "function") dialog.close();
  else dialog.removeAttribute("open");
}
byId("close-dialog").addEventListener("click", closeGuide);
byId("guide-dialog").addEventListener("close", () => {
  activeGuide = null;
  const url = new URL(window.location.href);
  url.searchParams.delete("guide");
  window.history.replaceState(null, "", url);
  document.body.classList.remove("printing-guide");
});
byId("guide-dialog").addEventListener("click", (event) => {
  if (event.target === byId("guide-dialog")) closeGuide();
});
byId("print-guide").addEventListener("click", () => {
  document.body.classList.add("printing-guide");
  window.print();
});
window.addEventListener("afterprint", () => document.body.classList.remove("printing-guide"));
byId("copy-guide").addEventListener("click", async () => {
  if (!activeGuide) return;
  const url = new URL(window.location.href);
  url.searchParams.set("guide", activeGuide.id);
  try {
    await navigator.clipboard.writeText(url.toString());
    byId("copy-guide").textContent = "Link copied";
    setTimeout(() => byId("copy-guide").textContent = "Copy guide link", 1800);
  } catch {
    byId("copy-guide").textContent = "Copy address bar URL";
  }
});
const initialGuide = new URL(location.href).searchParams.get("guide");
if (initialGuide && catalog.has(initialGuide)) openGuide(initialGuide);

function updateWater(event) {
  if (event) event.preventDefault();
  const output = byId("water-result");
  try {
    const result = waterPlan(byId("people").value, byId("days").value);
    const bold = node("b", "", result.gallons.toLocaleString() + " US gallons");
    const subtitle = node("span", "", result.liters.toLocaleString() + " liters minimum for " + result.people + " people over " + result.days + " days.");
    output.replaceChildren(bold, subtitle);
  } catch (error) { output.textContent = error.message; }
}
byId("water-form").addEventListener("submit", updateWater);
updateWater();

function persistLedger() {
  try {
    localStorage.setItem(LEDGER_KEY, ledgerExport(ledger));
    return true;
  } catch { return false; }
}
function alertLedger(message) { byId("ledger-message").textContent = message; }
function renderLedger() {
  byId("inventory-count").textContent = ledger.length + " SUPPLY RECORD" + (ledger.length === 1 ? "" : "S");
  const rows = ledger.map((entry) => {
    const row = node("tr");
    const item = node("td");
    item.append(node("strong", "", entry.name));
    if (entry.note) item.append(node("small", "", entry.note));
    row.append(item, node("td", "", entry.quantity + " " + entry.unit));
    const action = node("td");
    const remove = node("button", "", "✕");
    remove.type = "button"; remove.setAttribute("aria-label", "Remove " + entry.name);
    remove.addEventListener("click", () => {
      ledger = ledger.filter((item) => item.id !== entry.id);
      const saved = persistLedger();
      renderLedger();
      alertLedger(saved ? "Record removed." : "Storage blocked. Export your records.");
    });
    action.append(remove); row.append(action); return row;
  });
  if (!rows.length) {
    const row = node("tr"); const cell = node("td", "", "No entries yet. Add a shared supply above."); cell.colSpan = 3; row.append(cell); rows.push(row);
  }
  byId("inventory-rows").replaceChildren(...rows);
}
try {
  const saved = localStorage.getItem(LEDGER_KEY);
  if (saved) ledger = sanitizeLedgerImport(JSON.parse(saved));
} catch { alertLedger("Local data could not be read. Start fresh or import a backup."); }
renderLedger();
byId("ledger-form").addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    const valid = validateLedgerItem({
      name: byId("item-name").value,
      quantity: byId("item-qty").value,
      unit: byId("item-unit").value,
      note: byId("item-note").value
    });
    ledger.push({ ...valid, id: "cb-" + Date.now() + "-" + Math.random().toString(36).slice(2, 9), created: new Date().toISOString() });
    const saved = persistLedger();
    renderLedger();
    byId("ledger-form").reset(); byId("item-name").focus();
    alertLedger(saved ? "Saved on this device. Export JSON for backup." : "Storage unavailable. Export JSON to preserve this session.");
  } catch (error) { alertLedger(error.message); }
});
byId("export-ledger").addEventListener("click", () => {
  const blob = new Blob([ledgerExport(ledger)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = node("a"); anchor.href = url; anchor.download = "codebound-ledger-" + new Date().toISOString().slice(0, 10) + ".json";
  document.body.append(anchor); anchor.click(); anchor.remove(); setTimeout(() => URL.revokeObjectURL(url), 2000);
  alertLedger("Download requested. Store a backup separately.");
});
byId("import-ledger").addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    if (file.size > 1024 * 1024) throw new Error("File too large. Maximum import size: 1 MB.");
    const next = sanitizeLedgerImport(JSON.parse(await file.text()));
    if (!window.confirm("Replace " + ledger.length + " local records with " + next.length + " imported records?")) return;
    ledger = next;
    const saved = persistLedger(); renderLedger();
    alertLedger(saved ? "Backup imported and saved locally." : "Imported in memory; export it because storage is blocked.");
  } catch (error) { alertLedger("Import failed: " + error.message); }
  finally { event.target.value = ""; }
});
byId("clear-ledger").addEventListener("click", () => {
  if (!ledger.length || !window.confirm("Clear all " + ledger.length + " local records? Export a backup first.")) return;
  ledger = []; const saved = persistLedger(); renderLedger();
  alertLedger(saved ? "Local ledger cleared." : "Ledger cleared in memory; local storage may still contain old records.");
});
function updateNetwork() {
  byId("network-status").textContent = navigator.onLine ? "LOCAL FIRST / ONLINE" : "OFFLINE MODE";
}
window.addEventListener("online", updateNetwork);
window.addEventListener("offline", updateNetwork);
updateNetwork();
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(() => {
    byId("network-status").textContent = "LOCAL FIRST / CACHE UNAVAILABLE";
  }));
}
