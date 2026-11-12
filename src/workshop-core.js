// Browser and Node compatible helpers for the CodeBound workshop.
export const WORKSHOP_LOG_FORMAT = "codebound-workshop-log-v1";

export function escapeSvgText(value) {
  return String(value).replace(/[&<>"']/g, x => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  })[x]);
}
// Informational process diagrams, not wiring schematics. No HTML injection or external assets.
export function renderWorkshopDiagram(diagram) {
  if (!diagram || !Array.isArray(diagram.nodes) || diagram.nodes.length !== 3)
    throw new Error("A workshop diagram needs exactly three stages");
  const title=escapeSvgText(diagram.caption || "Workshop sequence");
  const boxes=diagram.nodes.map((part,i)=>{
    const x=25+i*255;
    return '<rect x="'+x+'" y="38" width="216" height="116" rx="12" fill="#eaf3e4" stroke="#42684b" stroke-width="2"/>' +
      '<text x="'+(x+108)+'" y="85" font-family="system-ui,sans-serif" font-size="16" text-anchor="middle" font-weight="700" fill="#163b27">'+escapeSvgText(part.title)+'</text>' +
      '<text x="'+(x+108)+'" y="114" font-family="system-ui,sans-serif" font-size="12" text-anchor="middle" fill="#3a5c45">'+escapeSvgText(part.detail)+'</text>';
  }).join("");
  const arrows='<path d="M242 96 L267 96 M259 88 L267 96 L259 104 M497 96 L522 96 M514 88 L522 96 L514 104" fill="none" stroke="#396c46" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>';
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 770 205" role="img" aria-label="'+title+'">' +
    '<title>'+title+'</title><desc>Three-stage conceptual flow, left to right. Not a technical wiring schematic.</desc>' +
    '<rect width="770" height="205" rx="12" fill="#f6faf2"/>'+boxes+arrows+
    '<text x="385" y="182" font-family="system-ui,sans-serif" font-size="11" text-anchor="middle" fill="#35513e">'+title+'</text></svg>';
}

export function validateWorkshopLog(payload, lessonIds) {
  const ids=new Set(lessonIds);
  if (!payload || payload.format !== WORKSHOP_LOG_FORMAT || !Array.isArray(payload.entries) ||
      payload.entries.length > ids.size || ids.size > 500)
    throw new Error("Invalid CodeBound workshop practice log");
  const seen=new Set();
  return payload.entries.map(record=>{
    if (!record || !ids.has(record.id) || seen.has(record.id) ||
        typeof record.practicedAt !== "string" ||
        !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(record.practicedAt) ||
        !Number.isFinite(Date.parse(record.practicedAt)) ||
        new Date(record.practicedAt).toISOString() !== record.practicedAt)
      throw new Error("Invalid workshop practice record");
    seen.add(record.id);
    return {id:record.id,practicedAt:record.practicedAt};
  });
}
export function exportWorkshopLog(entries, lessonIds) {
  const clean=validateWorkshopLog({format:WORKSHOP_LOG_FORMAT,entries},lessonIds);
  return JSON.stringify({
    format:WORKSHOP_LOG_FORMAT,
    disclaimer:"Practice log only. A checked item is not proof of certification, safety or competence.",
    entries:clean
  },null,2)+"\n";
}
export function summarizeWorkshopProgress(entries, lessonIds) {
  const clean=validateWorkshopLog({format:WORKSHOP_LOG_FORMAT,entries},lessonIds);
  return {practiced:clean.length,total:lessonIds.length};
}
