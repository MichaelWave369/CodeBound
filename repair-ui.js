import {REPAIR_PATTERNS,REPAIR_SOURCES,REPAIR_EVENT_KINDS} from "./data/repairs.js";
import {REPAIR_LOG_FORMAT,validateRepairLog,validateRepairEvent,repairEventSummary,repairLogExport,repairCsv} from "./src/repair-core.js";

const $=id=>document.getElementById(id);
const e=(tag,className="",text)=>{
  const el=document.createElement(tag);
  if(className)el.className=className;
  if(text!==undefined)el.textContent=text;
  return el;
};
const knownIds=REPAIR_PATTERNS.map(p=>p.id);
const KEY="codebound-repair-events-v1";
let events=[];
function note(message){$("repair-message").textContent=message;}
function list(values,ordered=false){
  const ul=e(ordered?"ol":"ul","repair-detail-list");
  for(const value of values)ul.append(e("li","",value));
  return ul;
}
function section(root,title,values,ordered=false,warning=false) {
  const section=e("section","repair-step"+(warning?" repair-danger":""));
  section.append(e("h4","",title),list(values,ordered));root.append(section);
}
function patternCard(p){
  const card=e("article","repair-card");
  const top=e("div","repair-card-head");
  top.append(e("span","",p.category+" / "+p.effort),e("span","",p.review));
  card.append(top,e("h3","",p.title),e("p","repair-summary",p.summary));
  const details=e("details","repair-details");
  details.append(e("summary","","Read repair / replacement pattern"));
  const body=e("div","repair-body");
  body.append(e("p","repair-scope","SCOPE: "+p.scope));
  const compatibility=e("section","repair-compatibility");
  compatibility.append(e("h4","","Interchangeability criteria"),
    e("p","","MEASURE: "+p.compatibility.measure),
    e("p","","ONLY IF: "+p.compatibility.allowed),
    e("p","","NOT IF: "+p.compatibility.forbidden));
  body.append(compatibility);
  section(body,"Gather",p.parts);
  section(body,"Inspect / practice",p.steps,true);
  section(body,"Acceptance checks",p.checks);
  section(body,"Stop / quarantine",p.stop,false,true);
  section(body,"Maintenance and records",p.care);
  body.append(e("p","repair-teach","TEACH-BACK: "+p.teachBack));
  const links=e("section","repair-step");
  links.append(e("h4","","Related atlas and system sheets"));
  const list=e("ul","repair-detail-list");
  for(const id of p.guides){
    const li=e("li"),a=e("a","",id.replaceAll("-"," "));
    a.href="./?guide="+encodeURIComponent(id)+"#atlas";
    li.append(a);list.append(li);
  }
  for(const id of p.blueprints){
    const li=e("li"),a=e("a","",id.replaceAll("-"," "));
    a.href="#blueprints";
    li.append(a);list.append(li);
  }
  links.append(list);body.append(links);
  const sources=e("section","repair-step");
  sources.append(e("h4","","References (online only)"));
  const sourceList=e("ul","repair-detail-list");
  for(const id of p.sources){
    const s=REPAIR_SOURCES[id];
    const li=e("li"),a=e("a","",s.title);
    a.href=s.url;a.target="_blank";a.rel="noopener noreferrer";
    li.append(a);sourceList.append(li);
  }
  sources.append(sourceList);body.append(sources);
  if(p.id==="printable-sign-holder"){
    const a=e("a","repair-sample-link","Download parametric OpenSCAD example");
    a.href="./examples/label-holder.scad";a.download="label-holder.scad";
    body.append(a);
  }
  const staticLink=e("a","repair-sample-link","Read in standalone fieldbook");
  staticLink.href="./fieldbook.html#repair-"+encodeURIComponent(p.id);
  body.append(staticLink);
  body.append(e("p","repair-disclaimer","Educational, noncritical practice. A physical fit check alone does not establish material strength, safety approval or fitness for another application."));
  details.append(body);card.append(details);
  return card;
}
function readStored(){
  try{
    const raw=localStorage.getItem(KEY);
    if(raw)events=validateRepairLog(JSON.parse(raw),knownIds);
  }catch{
    note("Saved data could not be read. Import a known-good backup or start a new log.");
  }
}
function persist(){
  try{localStorage.setItem(KEY,repairLogExport(events,knownIds));return true;}
  catch{note("Local storage is unavailable. Export your repair records to retain this session.");return false;}
}
function renderLog(){
  const today=new Date().toISOString().slice(0,10);
  const s=repairEventSummary(events,knownIds,today);
  $("repair-count").textContent=s.records+" RECORDS / "+s.assets+" ASSETS";
  $("repair-flags").textContent=s.quarantined+" QUARANTINE HISTORY / "+s.reviewDue+" REVIEW DUE";
  const rows=[...events].reverse().map(record=>{
    const row=e("tr"),name=e("td");
    name.append(e("strong","",record.asset),e("small","",record.pattern.replaceAll("-"," ")));
    const status=e("td");status.append(e("span","",record.kind.replaceAll("-"," ")),e("small","",record.observedAt));
    const notes=e("td","",record.note||"—");
    const removeCell=e("td");const remove=e("button","","Remove");
    remove.type="button";remove.setAttribute("aria-label","Remove record "+record.id);
    remove.addEventListener("click",()=>{
      if(!window.confirm("Remove this local record? Consider exporting first."))return;
      events=events.filter(item=>item.id!==record.id);
      const saved=persist();renderLog();
      if(saved)note("Record removed from local history.");
    });
    removeCell.append(remove);row.append(name,status,notes,removeCell);return row;
  });
  if(!rows.length){
    const row=e("tr"),td=e("td","","No inspection or repair events recorded. Start with a tagged, noncritical asset.");
    td.colSpan=4;row.append(td);rows.push(row);
  }
  $("repair-log-rows").replaceChildren(...rows);
}
function fileDownload(name,body,type){
  const file=new Blob([body],{type});
  const url=URL.createObjectURL(file);
  const anchor=e("a");anchor.href=url;anchor.download=name;
  document.body.append(anchor);anchor.click();anchor.remove();
  setTimeout(()=>URL.revokeObjectURL(url),2000);
}
function init(){
  if(!$("repair-patterns"))return;
  $("repair-patterns").replaceChildren(...REPAIR_PATTERNS.map(patternCard));
  const select=$("repair-pattern");
  select.replaceChildren(...REPAIR_PATTERNS.map(p=>{
    const option=e("option","",p.title);option.value=p.id;return option;
  }));
  const status=$("repair-event");
  status.replaceChildren(...REPAIR_EVENT_KINDS.map(id=>{
    const option=e("option","",id.replaceAll("-"," "));option.value=id;return option;
  }));
  $("repair-date").value=new Date().toISOString().slice(0,10);
  readStored();renderLog();
  $("repair-form").addEventListener("submit",evt=>{
    evt.preventDefault();
    try{
      const record=validateRepairEvent({
        id:"evt_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,9),
        asset:$("repair-asset").value,
        pattern:$("repair-pattern").value,
        kind:$("repair-event").value,
        observedAt:$("repair-date").value,
        nextReview:$("repair-next").value,
        note:$("repair-note").value
      },knownIds);
      const next=[...events,record];
      validateRepairLog({format:REPAIR_LOG_FORMAT,events:next},knownIds);
      events=next;
      const saved=persist();renderLog();
      $("repair-asset").value="";$("repair-note").value="";$("repair-next").value="";
      if(saved)note("Event recorded locally. This is NOT a return-to-service approval.");
    }catch(error){note(error.message);}
  });
  $("repair-export").addEventListener("click",()=>{
    fileDownload("codebound-repair-events.json",repairLogExport(events,knownIds),"application/json");
    note("JSON export requested. Store your backup independently.");
  });
  $("repair-csv").addEventListener("click",()=>{
    fileDownload("codebound-repair-events.csv",repairCsv(events,knownIds),"text/csv;charset=utf-8");
    note("CSV export requested. Only non-sensitive asset identifiers should appear in shared records.");
  });
  $("repair-import").addEventListener("change",async evt=>{
    const file=evt.target.files?.[0];
    if(!file)return;
    try{
      if(file.size>250000)throw new Error("Maximum repair log import: 250 KB");
      const next=validateRepairLog(JSON.parse(await file.text()),knownIds);
      if(!window.confirm("Replace "+events.length+" current records with "+next.length+" imported records? Export your current log first."))return;
      events=next;const saved=persist();renderLog();
      if(saved)note("Imported records saved to this browser.");
    }catch(error){note("Import rejected: "+error.message);}
    finally{evt.target.value="";}
  });
  $("repair-clear").addEventListener("click",()=>{
    if(!events.length||!window.confirm("Clear all local repair records? Export a backup first."))return;
    events=[];const saved=persist();renderLog();
    if(saved)note("Local repair records cleared.");
  });
}
init();
