// Portable, deterministic, dependency-free CodeBound field kit builder.
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { resolve, dirname, join, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { deflateRawSync } from "node:zlib";
import { GUIDES, SOURCES } from "../data/guides.js";
import { RESPONSE_PLANS, RESPONSE_SOURCES } from "../data/scenarios.js";
import { WORKSHOP_LESSONS, WORKSHOP_SOURCES } from "../data/workshops.js";
import { BUILD_SHEETS, BUILD_SOURCES, MATERIALS } from "../data/blueprints.js";
import {REPAIR_PATTERNS,REPAIR_SOURCES} from "../data/repairs.js";
import { renderWorkshopDiagram } from "../src/workshop-core.js";

export const VERSION = "0.6.0";
const SITE_FILES = [
  "index.html", "styles.css", "app.js", "service-worker.js",
  "manifest.webmanifest", "icon.svg", "data/guides.js", "data/scenarios.js", "scenarios-ui.js", "data/workshops.js", "workshop-ui.js", "data/blueprints.js", "blueprints-ui.js", "src/blueprint-core.js", "data/repairs.js", "repair-ui.js", "src/repair-core.js", "examples/label-holder.scad", "docs/REPAIR-WORKSHEET.txt", "src/core.js", "src/workshop-core.js", "scripts/serve.mjs"
];
const WARNING = "Starting points only, NOT certified field procedures. Follow local emergency instructions and qualified guidance. External references are links, not cached documents.";
const HTML_CSS = "body{max-width:850px;margin:0 auto;padding:2rem 1.25rem;background:#f8faf6;color:#213329;font:16px/1.6 system-ui,sans-serif}" +
  "h1{font-size:2.6rem;line-height:1.12}h2{line-height:1.18}h3{margin-top:1.35rem}" +
  "a{color:#16563e}a:focus-visible{outline:3px solid #205f3a}" +
  "header{padding:1.5rem;background:#e6eee1;border:2px solid #31513f}" +
  ".warning{border-left:4px solid #aa5f2c;padding:.5rem 1rem;background:#fff3e5}" +
  ".guide{padding-top:1.5rem;border-top:2px solid #31513f;break-before:page}" +
  "li{margin:.4rem 0;overflow-wrap:anywhere}.diagram svg{width:100%;height:auto}.diagram{margin:1rem 0}.diagram figcaption{font-size:.85rem}.meta,.review{font:12px/1.5 ui-monospace,monospace}" +
  "@media print{@page{margin:15mm}body{max-width:none;padding:0;background:white;color:black;font-size:10pt}" +
  "header,.warning{background:white}.guide{break-before:page}h2,h3{break-after:avoid}a{color:black}}";

export function escapeHtml(v) {
  return String(v).replace(/[&<>"']/g, ch => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  })[ch]);
}
const escapeList = (items, tag = "ul") => "<" + tag + ">" +
  items.map(x => "<li>" + escapeHtml(x) + "</li>").join("") + "</" + tag + ">";
const dependency = (id) => GUIDES.find(g => g.id === id)?.title || id;
function refsHtml(g) {
  if (!g.sources.length) return "<p>No references yet: independent review required.</p>";
  return "<ul>" + g.sources.map(key => {
    const s = SOURCES[key];
    if (!s) throw new Error("Unknown source: " + key);
    return '<li><a href="' + escapeHtml(s.url) + '">' + escapeHtml(s.title) + "</a> (online only)</li>";
  }).join("") + "</ul>";
}
export function renderHtml() {
  const index = GUIDES.map((g,i) =>
    '<li><a href="#' + escapeHtml(g.id) + '">' + (i+1) + ". " + escapeHtml(g.title) + "</a></li>"
  ).join("");
  const cards = GUIDES.map((g,i) =>
    '<section class="guide" id="' + escapeHtml(g.id) + '">' +
    '<p class="meta">CARD ' + (i+1) + " / " + escapeHtml(g.category.toUpperCase()) + "</p>" +
    "<h2>" + escapeHtml(g.title) + "</h2><p>" + escapeHtml(g.summary) + "</p>" +
    '<p class="meta">Stage: ' + escapeHtml(g.phase) + " | Priority: " + g.priority +
    " | Time: " + escapeHtml(g.effort) + " | Status: " + escapeHtml(g.review) + "</p>" +
    "<h3>Dependencies</h3>" + escapeList(g.depends.map(dependency)) +
    "<h3>Materials</h3>" + escapeList(g.materials) +
    "<h3>Steps</h3>" + escapeList(g.steps,"ol") +
    "<h3>Acceptance checks</h3>" + escapeList(g.checks) +
    '<div class="warning"><h3>Hazards / limitations</h3>' + escapeList(g.cautions) + "</div>" +
    "<h3>Recordkeeping and code</h3><p>" + escapeHtml(g.code) + "</p>" +
    "<h3>Source links</h3>" + refsHtml(g) +
    '<p class="review">Not independently field-certified. Confirm local conditions before use.</p></section>'
  ).join("\n");
  const responses = RESPONSE_PLANS.map((p,i) => {
    const step = (heading, entries) => "<h3>" + heading + "</h3>" + escapeList(entries,"ol");
    const labels = p.guides.map(dependency);
    const sourceList = p.sourceIds.map(key => {
      const source = RESPONSE_SOURCES[key];
      if (!source) throw Error("Unknown response source " + key);
      return '<li><a href="' + escapeHtml(source.url) + '">' + escapeHtml(source.title) + "</a> (online only)</li>";
    }).join("");
    return '<section class="guide" id="response-' + escapeHtml(p.id) + '">' +
      '<p class="meta">72-HOUR RESPONSE ' + (i+1) + " / " + escapeHtml(p.category) +
      " / " + escapeHtml(p.review) + "</p><h2>" + escapeHtml(p.title) + "</h2>" +
      "<p>" + escapeHtml(p.summary) + "</p><p><strong>Trigger:</strong> " + escapeHtml(p.trigger) + "</p>" +
      step("First 0–2 hours",p.first) + step("Hours 2–24",p.day) + step("Hours 24–72",p.next) +
      "<h3>Materials</h3>" + escapeList(p.tools) + "<h3>Acceptance checks</h3>" + escapeList(p.verify) +
      '<div class="warning"><h3>Escalate to qualified help</h3>' + escapeList(p.escalate) + "</div>" +
      "<h3>Related field guides</h3>" + escapeList(labels) +
      "<h3>Official online sources</h3><ul>" + sourceList + "</ul>" +
      '<p class="review">Planning times are prompts, not emergency deadlines. Not field-certified.</p></section>';
  }).join("\n");
  const workshopCards = WORKSHOP_LESSONS.map((l,i)=>{
    const group=(title,items,ordered=false)=>
      "<h3>"+title+"</h3>"+escapeList(items,ordered?"ol":"ul");
    const sourceList=l.sourceIds.map(id=>{
      const s=WORKSHOP_SOURCES[id];
      if(!s)throw Error("Unknown workshop source "+id);
      return '<li><a href="'+escapeHtml(s.url)+'">'+escapeHtml(s.title)+"</a> (online only)</li>";
    }).join("");
    return '<section class="guide" id="workshop-'+escapeHtml(l.id)+'">' +
      '<p class="meta">WORKSHOP '+(i+1)+" / "+escapeHtml(l.category)+" / "+escapeHtml(l.review)+"</p>"+
      "<h2>"+escapeHtml(l.title)+"</h2><p>"+escapeHtml(l.summary)+"</p>"+
      '<p class="meta">TIME: '+escapeHtml(l.effort)+" | SKILL: "+escapeHtml(l.skill)+"</p>"+
      '<figure class="diagram">'+renderWorkshopDiagram(l.diagram)+"<figcaption>"+escapeHtml(l.diagram.caption)+"</figcaption></figure>"+
      group("Materials and components",l.materials)+
      group("Build and practice",l.steps,true)+
      group("Acceptance checks",l.checks)+
      '<div class="warning">'+group("Stop conditions",l.stop)+"</div>"+
      group("Maintenance",l.maintenance)+
      "<p><strong>Teach-back:</strong> "+escapeHtml(l.teachBack)+"</p>"+
      group("Related atlas guides",l.guideIds.map(dependency))+
      "<h3>Sources (online only)</h3><ul>"+sourceList+"</ul>"+
      '<p class="review">Practice draft only; not certification or an approved technical installation.</p></section>';
  }).join("\n");
  const blueprintCards = BUILD_SHEETS.map((b,i)=>{
    const group=(title,items,ordered=false)=>"<h3>"+title+"</h3>"+escapeList(items,ordered?"ol":"ul");
    const sources=b.sources.map(id=>{
      const s=BUILD_SOURCES[id];
      if(!s)throw Error("Unknown blueprint source "+id);
      return '<li><a href="'+escapeHtml(s.url)+'">'+escapeHtml(s.title)+"</a> (online only)</li>";
    }).join("");
    const parts=b.materials.map(m=>m.quantity+" "+MATERIALS[m.id].unit+" — "+MATERIALS[m.id].name);
    return '<section class="guide" id="blueprint-'+escapeHtml(b.id)+'">' +
      '<p class="meta">SYSTEM BUILD SHEET '+(i+1)+" / "+escapeHtml(b.domain)+" / "+escapeHtml(b.review)+"</p>"+
      "<h2>"+escapeHtml(b.title)+"</h2><p>"+escapeHtml(b.summary)+"</p>"+
      '<p class="meta">TIME: '+escapeHtml(b.duration)+" | SCOPE: "+escapeHtml(b.makes)+"</p>"+
      "<p><strong>Component flow:</strong> "+escapeHtml(b.diagram.join(" → "))+"</p>"+
      group("Starter bill of materials / one station",parts)+group("Tools and conditions",b.tools)+
      group("Build and operate",b.steps,true)+group("Acceptance checks",b.checks)+
      '<div class="warning">'+group("Stop conditions",b.stop)+"</div>"+
      group("Maintenance",b.maintenance)+
      "<p><strong>Teach-back:</strong> "+escapeHtml(b.handoff)+"</p>"+
      group("Related guides",b.dependencies.map(dependency))+
      "<h3>Source references (online only)</h3><ul>"+sources+"</ul>"+
      '<p class="review">Community starter design only. Quantities are not population capacity or technical certification.</p></section>';
  }).join("\n");
  const repairCards=REPAIR_PATTERNS.map((p,i)=>{
    const group=(name,arr,ordered=false)=>"<h3>"+escapeHtml(name)+"</h3>"+escapeList(arr,ordered?"ol":"ul");
    const links=p.sources.map(id=>{
      const s=REPAIR_SOURCES[id];
      if(!s)throw Error("Unknown repair source: "+id);
      return '<li><a href="'+escapeHtml(s.url)+'">'+escapeHtml(s.title)+'</a> (online only)</li>';
    }).join("");
    return '<section class="guide" id="repair-'+escapeHtml(p.id)+'">'+
      '<p class="meta">REPAIR PATTERN '+(i+1)+" / "+escapeHtml(p.category)+" / "+escapeHtml(p.review)+"</p>"+
      "<h2>"+escapeHtml(p.title)+"</h2><p>"+escapeHtml(p.summary)+"</p>"+
      "<p><strong>Scope:</strong> "+escapeHtml(p.scope)+"</p>"+
      "<h3>Part compatibility</h3>"+
      "<p>MEASURE: "+escapeHtml(p.compatibility.measure)+"</p>"+
      "<p>ONLY IF: "+escapeHtml(p.compatibility.allowed)+"</p>"+
      "<p>NOT IF: "+escapeHtml(p.compatibility.forbidden)+"</p>"+
      group("Tools / parts",p.parts)+group("Procedure",p.steps,true)+
      group("Acceptance checks",p.checks)+'<div class="warning">'+group("Stop / quarantine",p.stop)+"</div>"+
      group("Maintenance and records",p.care)+"<p><strong>Teach-back:</strong> "+escapeHtml(p.teachBack)+"</p>"+
      group("Related guides",p.guides.map(dependency))+"<h3>Sources (online only)</h3><ul>"+links+"</ul>"+
      (p.id==="printable-sign-holder"?"<p>OpenSCAD source: examples/label-holder.scad included in the portable archive.</p>":"")+
      '<p class="review">Community draft only. Fit alone is not approval or certification.</p></section>';
  }).join("\n");
  return '<!doctype html><html lang="en"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<title>CodeBound Standalone Fieldbook</title><style>' + HTML_CSS + "</style></head><body>" +
    "<header><small>CODEBOUND / OFFLINE FIELD KIT / " + VERSION + "</small>" +
    "<h1>Knowledge that survives the network.</h1><p>All " + GUIDES.length +
    " guides, " + RESPONSE_PLANS.length + " 72-hour response cards, " + WORKSHOP_LESSONS.length + " workshops and " + BUILD_SHEETS.length + " starter system blueprints plus " + REPAIR_PATTERNS.length + " repair patterns inside one self-contained HTML file. Open directly from a USB drive; no server, JavaScript or network.</p></header>" +
    '<div class="warning"><strong>SAFETY:</strong> ' + escapeHtml(WARNING) + "</div>" +
    '<section><h2>First 72 hours: essential checks</h2><ol>' +
    "<li>Assess immediate danger and reach available emergency services. Avoid unsafe buildings and routes.</li>" +
    "<li>Check safe drinking water and handwashing, sanitation, food condition and urgent health needs.</li>" +
    "<li>Check shelter, temperature hazards, lighting, accessible paths and communication backups.</li>" +
    "<li>Coordinate voluntary help, record task owners and preserve personal privacy.</li>" +
    "<li>Use the field cards for verification, limits and references, not as professional certification.</li>" +
    "</ol></section>" +
    '<nav id="response-contents" aria-label="72-hour response cards"><h2>72-hour scenario plans</h2><ol>' +
    RESPONSE_PLANS.map(p => '<li><a href="#response-' + escapeHtml(p.id) + '">' + escapeHtml(p.title) + '</a></li>').join("") +
    '</ol></nav>' + responses +
    '<nav id="workshop-contents" aria-label="Community workshop lessons"><h2>Community workshop lessons</h2><ol>' +
    WORKSHOP_LESSONS.map(l => '<li><a href="#workshop-' + escapeHtml(l.id) + '">' + escapeHtml(l.title) + '</a></li>').join("") +
    '</ol></nav>' + workshopCards +
    '<nav id="blueprint-contents" aria-label="Community system blueprints"><h2>Community system build sheets</h2><ol>' +
    BUILD_SHEETS.map(b=>'<li><a href="#blueprint-'+escapeHtml(b.id)+'">'+escapeHtml(b.title)+'</a></li>').join("") +
    '</ol></nav>' + blueprintCards +
    '<nav id="repair-contents" aria-label="Repair patterns"><h2>Repair and replacement patterns</h2><ol>' +
    REPAIR_PATTERNS.map(p=>'<li><a href="#repair-'+escapeHtml(p.id)+'">'+escapeHtml(p.title)+'</a></li>').join("") +
    '</ol></nav>' + repairCards +
    '<nav id="contents" aria-label="Field guide contents"><h2>Field guide contents</h2><ol>' + index + "</ol></nav>" +
    cards + '<footer><p>CodeBound contributors / MIT. Referenced third-party works retain their rights.</p></footer></body></html>\n';
}
export function renderText() {
  const lines = ["CODEBOUND OFFLINE FIELD KIT " + VERSION, "Knowledge that survives the network.",
    "Contains " + GUIDES.length + " guides. Plain text. No software or network required.", "",
    "WARNING: " + WARNING, "",
    "FIRST 72 HOURS: Check immediate danger, people, safe water, sanitation, food safety, shelter and communications. Follow official guidance.", "",
    "GUIDE INDEX", ...GUIDES.map((g,i) => (i+1) + ". " + g.title), ""];
  function section(name, values) {
    lines.push(name);
    values.forEach((x,i) => lines.push("  " + (i+1) + ". " + x));
    if (!values.length) lines.push("  (none listed)");
    lines.push("");
  }
  lines.push("RESPONSE SCENARIO INDEX", ...RESPONSE_PLANS.map(p => p.title), "");
  lines.push("72-HOUR RESPONSE CARDS (times are planning prompts, not official deadlines)", "");
  for (const [i,p] of RESPONSE_PLANS.entries()) {
    lines.push("=".repeat(72), "RESPONSE " + (i+1) + " / " + p.id, p.title.toUpperCase(),
      "Trigger: " + p.trigger, "Review: " + p.review, p.summary, "");
    section("FIRST 0–2 HOURS",p.first);
    section("HOURS 2–24",p.day);
    section("HOURS 24–72",p.next);
    section("MATERIALS",p.tools);
    section("ACCEPTANCE CHECKS",p.verify);
    section("ESCALATE TO QUALIFIED HELP",p.escalate);
    section("RELATED FIELD GUIDES",p.guides.map(dependency));
    section("SOURCE LINKS (ONLINE ONLY)",p.sourceIds.map(key => RESPONSE_SOURCES[key].title + ": " + RESPONSE_SOURCES[key].url));
    lines.push("Not field-certified. Follow locally issued advice and real-time alerts.", "");
  }
  lines.push("COMMUNITY WORKSHOP INDEX",...WORKSHOP_LESSONS.map(l=>l.title),"");
  for(const [i,l] of WORKSHOP_LESSONS.entries()) {
    lines.push("=".repeat(72),"WORKSHOP "+(i+1)+" / "+l.id,l.title.toUpperCase(),
      "Skill: "+l.skill+"; Time: "+l.effort+"; Review: "+l.review,"",l.summary,"",
      "CONCEPTUAL DIAGRAM: "+l.diagram.nodes.map(n=>n.title+" ("+n.detail+")").join(" -> "),
      "Diagram note: "+l.diagram.caption,"");
    section("MATERIALS",l.materials);
    section("BUILD AND PRACTICE",l.steps);
    section("ACCEPTANCE CHECKS",l.checks);
    section("STOP CONDITIONS",l.stop);
    section("MAINTENANCE",l.maintenance);
    lines.push("TEACH-BACK: "+l.teachBack,"");
    section("RELATED ATLAS GUIDES",l.guideIds.map(dependency));
    section("SOURCE LINKS (ONLINE ONLY)",l.sourceIds.map(id=>WORKSHOP_SOURCES[id].title+": "+WORKSHOP_SOURCES[id].url));
    lines.push("Practice draft only, not field certification.","");
  }
  lines.push("COMMUNITY SYSTEM BUILD SHEET INDEX",...BUILD_SHEETS.map(b=>b.title),"");
  for(const [i,b] of BUILD_SHEETS.entries()) {
    lines.push("=".repeat(72),"BUILD SHEET "+(i+1)+" / "+b.id,b.title.toUpperCase(),
      "Scope: "+b.makes,"Review: "+b.review,"Duration: "+b.duration,b.summary,"",
      "COMPONENT FLOW: "+b.diagram.join(" -> "), "");
    section("STARTER MATERIALS / ONE STATION",b.materials.map(m=>m.quantity+" "+MATERIALS[m.id].unit+" — "+MATERIALS[m.id].name));
    section("TOOLS AND CONDITIONS",b.tools);
    section("BUILD AND OPERATE",b.steps);
    section("ACCEPTANCE CHECKS",b.checks);
    section("STOP CONDITIONS",b.stop);
    section("MAINTENANCE",b.maintenance);
    lines.push("TEACH-BACK: "+b.handoff,"");
    section("RELATED GUIDES",b.dependencies.map(dependency));
    section("SOURCES (ONLINE ONLY)",b.sources.map(id=>BUILD_SOURCES[id].title+": "+BUILD_SOURCES[id].url));
    lines.push("Starter station quantities are planning estimates, not population capacity or certification.","");
  }
  lines.push("REPAIR PATTERN INDEX",...REPAIR_PATTERNS.map(p=>p.title),"");
  for(const [i,p] of REPAIR_PATTERNS.entries()){
    lines.push("=".repeat(72),"REPAIR PATTERN "+(i+1)+" / "+p.id,p.title.toUpperCase(),
      "Scope: "+p.scope,"Review: "+p.review,p.summary,"",
      "MEASURE: "+p.compatibility.measure,
      "ONLY IF: "+p.compatibility.allowed,
      "NOT IF: "+p.compatibility.forbidden,"");
    section("TOOLS AND PARTS",p.parts);
    section("PROCEDURE",p.steps);
    section("ACCEPTANCE CHECKS",p.checks);
    section("STOP AND QUARANTINE",p.stop);
    section("MAINTENANCE",p.care);
    lines.push("TEACH-BACK: "+p.teachBack,"");
    section("RELATED FIELD GUIDES",p.guides.map(dependency));
    section("SOURCES ONLINE ONLY",p.sources.map(id=>REPAIR_SOURCES[id].title+": "+REPAIR_SOURCES[id].url));
    if(p.id==="printable-sign-holder")lines.push("OPENSCAD: examples/label-holder.scad within portable archive.","");
    lines.push("Not certified. Physical fit does not prove rated strength.","");
  }
  lines.push("FOUNDATIONAL FIELD GUIDES", "");
  for (const [i,g] of GUIDES.entries()) {
    lines.push("=".repeat(72), "FIELD " + (i+1) + " / " + g.id, g.title.toUpperCase(),
      "Category: " + g.category + "; Stage: " + g.phase + "; Priority: " + g.priority +
      "; Effort: " + g.effort + "; Review: " + g.review, "", g.summary, "");
    section("DEPENDENCIES",g.depends.map(dependency));
    section("MATERIALS",g.materials);
    section("STEPS",g.steps);
    section("ACCEPTANCE CHECKS",g.checks);
    section("HAZARDS AND LIMITS",g.cautions);
    lines.push("CODE / RECORDKEEPING: " + g.code, "");
    section("SOURCE LINKS (ONLINE ONLY)",g.sources.map(key => SOURCES[key].title + ": " + SOURCES[key].url));
    lines.push("Not independently field-certified; consult qualified local expertise.", "");
  }
  lines.push("END / CODEBOUND / MIT");
  return lines.join("\n") + "\n";
}
export function renderJson() {
  return JSON.stringify({format:"codebound-fieldbook-v1",version:VERSION,warning:WARNING,sources:SOURCES,guides:GUIDES,responseSources:RESPONSE_SOURCES,responsePlans:RESPONSE_PLANS,workshopSources:WORKSHOP_SOURCES,workshopLessons:WORKSHOP_LESSONS,buildSources:BUILD_SOURCES,materialCatalog:MATERIALS,buildSheets:BUILD_SHEETS,repairPatterns:REPAIR_PATTERNS,repairSources:REPAIR_SOURCES},null,2) + "\n";
}
export const sha256 = bytes => createHash("sha256").update(bytes).digest("hex");
function crc32(data) {
  let crc=0xffffffff;
  for (const byte of data) {
    crc ^= byte;
    for (let i=0;i<8;i++) crc=(crc>>>1) ^ (0xedb88320 & -(crc&1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}
// ZIP uses deflate, CRC32 and a central directory; archive has fixed DOS timestamps.
export function makeZip(files) {
  const bodies=[], centers=[];
  let offset=0;
  for (const path of Object.keys(files).sort()) {
    if (!/^[a-zA-Z0-9._/-]+$/.test(path) || path.startsWith("/") || path.split("/").includes("..")) throw Error("Unsafe ZIP path: " + path);
    const name=Buffer.from(path,"utf8");
    const data=Buffer.isBuffer(files[path])?files[path]:Buffer.from(files[path],"utf8");
    const zipped=deflateRawSync(data,{level:9});
    const checksum=crc32(data);
    const head=Buffer.alloc(30);
    head.writeUInt32LE(0x04034b50,0); head.writeUInt16LE(20,4);
    head.writeUInt16LE(0x0800,6); head.writeUInt16LE(8,8);
    head.writeUInt16LE(33,12); head.writeUInt32LE(checksum,14);
    head.writeUInt32LE(zipped.length,18); head.writeUInt32LE(data.length,22);
    head.writeUInt16LE(name.length,26);
    bodies.push(head,name,zipped);
    const center=Buffer.alloc(46);
    center.writeUInt32LE(0x02014b50,0); center.writeUInt16LE(20,4);
    center.writeUInt16LE(20,6); center.writeUInt16LE(0x0800,8); center.writeUInt16LE(8,10);
    center.writeUInt16LE(33,14); center.writeUInt32LE(checksum,16);
    center.writeUInt32LE(zipped.length,20); center.writeUInt32LE(data.length,24);
    center.writeUInt16LE(name.length,28); center.writeUInt32LE(offset,42);
    centers.push(center,name);
    offset += head.length+name.length+zipped.length;
  }
  const dir=Buffer.concat(centers);
  const end=Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50,0);
  end.writeUInt16LE(Object.keys(files).length,8);
  end.writeUInt16LE(Object.keys(files).length,10);
  end.writeUInt32LE(dir.length,12); end.writeUInt32LE(offset,16);
  return Buffer.concat([...bodies,dir,end]);
}
function kitReadme() {
  return "CODEBOUND PORTABLE KIT " + VERSION + "\n\n" +
    "OPEN fieldbook.html by double-clicking, without a server or network.\n" +
    "fieldbook.txt is plain text. fieldbook.json contains structured records.\n" +
    "All formats include six 72-hour plans, five workshops, six system build sheets, six repair patterns and sixteen field guides.\n" +
    "The ZIP also includes examples/label-holder.scad and docs/REPAIR-WORKSHEET.txt.\n" +
    "site/ contains an offline-capable local HTTP server for the interactive web app.\n" +
    "From inside site/, run: node scripts/serve.mjs, then open http://localhost:4173.\n" +
    "Node.js 20+ is required for this interactive local server; fieldbook.html needs none.\n" +
    "Sources are external links, not copied into the package.\n" +
    "Use SHA256SUMS.txt to check each package file's integrity. Hashes detect corruption,\n" +
    "not authenticity; verify trusted provenance separately.\n\n" + WARNING + "\n\n" +
    "Original CodeBound materials are MIT-licensed. External sources retain their rights.\n";
}
export async function buildFieldKit(root=process.cwd(),out=join(root,"dist")) {
  root=resolve(root); out=resolve(out);
  if (root===out || root.startsWith(out+sep)) throw Error("Invalid output path.");
  await rm(out,{recursive:true,force:true});
  const site=join(out,"site");
  await mkdir(site,{recursive:true});
  const archive={};
  for (const name of SITE_FILES) {
    const bytes=await readFile(join(root,name));
    const target=join(site,name);
    await mkdir(dirname(target),{recursive:true});
    await writeFile(target,bytes);
    archive["site/"+name]=bytes;
  }
  archive["LICENSE.txt"]=await readFile(join(root,"LICENSE"));
  archive["README.txt"]=Buffer.from(kitReadme());
  archive["fieldbook.html"]=Buffer.from(renderHtml());
  archive["fieldbook.txt"]=Buffer.from(renderText());
  archive["fieldbook.json"]=Buffer.from(renderJson());
  archive["SHA256SUMS.txt"]=Buffer.from(Object.keys(archive).sort()
    .map(name => sha256(archive[name])+"  "+name).join("\n")+"\n");
  const zip=makeZip(archive);
  const digest=sha256(zip);
  for (const name of ["fieldbook.html","fieldbook.txt","fieldbook.json","SHA256SUMS.txt"])
    await writeFile(join(site,name),archive[name]);
  await writeFile(join(site,"codebound-field-kit.zip"),zip);
  await writeFile(join(site,"codebound-field-kit.zip.sha256"),digest+"  codebound-field-kit.zip\n");
  return {out,zipBytes:zip.length,digest,files:Object.keys(archive).sort()};
}
if (process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const result=await buildFieldKit();
  console.log("CodeBound "+VERSION+" built "+result.files.length+" files; ZIP "+result.zipBytes+" bytes; SHA256 "+result.digest);
}
