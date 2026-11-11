import { RESPONSE_PLANS, RESPONSE_WINDOWS, RESPONSE_SOURCES } from "./data/scenarios.js";

const find = (id) => document.getElementById(id);
const el = (tag, className, content) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content !== undefined) node.textContent = content;
  return node;
};
function list(items, ordered = false) {
  const parent = el(ordered ? "ol" : "ul", "response-list");
  for (const text of items) parent.append(el("li", "", text));
  return parent;
}
function section(title, items, ordered = false) {
  const root = el("section", "response-step");
  root.append(el("h4", "", title), list(items, ordered));
  return root;
}
function renderPlan(plan) {
  const outer = el("article", "response-card");
  const header = el("div", "response-card-head");
  header.append(el("span", "response-category", plan.category + " / " + plan.severity),
    el("span", "response-review", plan.review));
  outer.append(header, el("h3", "", plan.title), el("p", "response-summary", plan.summary));
  const details = el("details", "response-detail");
  const summary = el("summary", "", "Open 72-hour response card");
  details.append(summary);
  const inner = el("div", "response-inner");
  inner.append(el("p", "response-trigger", "WHEN THIS APPLIES: " + plan.trigger));
  inner.append(section("First 0–2 hours", plan.first, true));
  inner.append(section("Hours 2–24", plan.day, true));
  inner.append(section("Hours 24–72", plan.next, true));
  inner.append(section("Gather / prepare", plan.tools));
  inner.append(section("Check before relying on the plan", plan.verify));
  inner.append(section("Escalate to qualified help", plan.escalate));
  const guideSection = el("section", "response-step");
  guideSection.append(el("h4", "", "Related CodeBound guides"));
  const guideLinks = el("ul", "response-list");
  for (const guide of plan.guides) {
    const li = el("li");
    const link = el("a", "", guide.replaceAll("-", " "));
    link.href = "./?guide=" + encodeURIComponent(guide) + "#atlas";
    li.append(link); guideLinks.append(li);
  }
  guideSection.append(guideLinks); inner.append(guideSection);
  const refs = el("section", "response-step");
  refs.append(el("h4", "", "Official sources / online only"));
  const links = el("ul", "response-list");
  for (const id of plan.sourceIds) {
    const source = RESPONSE_SOURCES[id];
    const li = el("li"); const link = el("a", "", source.title);
    link.href = source.url; link.target = "_blank"; link.rel = "noopener noreferrer";
    li.append(link);links.append(li);
  }
  refs.append(links);inner.append(refs);
  inner.append(el("p", "response-note", "Response times are planning prompts, not authoritative emergency deadlines. This card is not field-certified; follow current local instructions."));
  details.append(inner);outer.append(details);
  return outer;
}
function init() {
  const wrapper = find("response-cards");
  if (!wrapper) return;
  wrapper.replaceChildren(...RESPONSE_PLANS.map(renderPlan));
  find("response-count").textContent = RESPONSE_PLANS.length + " SITUATIONS";
  const stages = find("response-stages");
  stages.replaceChildren(...RESPONSE_WINDOWS.map((stage, i) => {
    const row = el("div", "response-stage");
    row.append(el("strong", "", String(i + 1).padStart(2, "0") + " / " + stage.name),
      el("span", "", stage.caption));
    return row;
  }));
}
init();
