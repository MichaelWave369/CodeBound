import { WORKSHOP_LESSONS, WORKSHOP_SOURCES } from "./data/workshops.js";
import {
  renderWorkshopDiagram, validateWorkshopLog,
  exportWorkshopLog, summarizeWorkshopProgress, WORKSHOP_LOG_FORMAT
} from "./src/workshop-core.js";

const byId=id=>document.getElementById(id);
const el=(tag,className="",content)=>{
  const n=document.createElement(tag);
  if(className)n.className=className;
  if(content!==undefined)n.textContent=content;
  return n;
};
const ids=WORKSHOP_LESSONS.map(l=>l.id);
const STORE_KEY="codebound-workshop-practice-v1";
let entries=[];
function setStatus(message){byId("workshop-status").textContent=message;}
function readLocal(){
  try {
    const raw=localStorage.getItem(STORE_KEY);
    if(raw)entries=validateWorkshopLog(JSON.parse(raw),ids);
  } catch {
    entries=[];
    setStatus("Saved practice log could not be read. Export a new log after practicing.");
  }
}
function persist(){
  try { localStorage.setItem(STORE_KEY,exportWorkshopLog(entries,ids));return true; }
  catch {setStatus("Browser storage is unavailable. Export a JSON copy before closing.");return false;}
}
function refresh(){
  const total=summarizeWorkshopProgress(entries,ids);
  byId("workshop-progress").textContent=total.practiced+" / "+total.total+" PRACTICED";
  for(const checkbox of document.querySelectorAll("[data-practice-id]")) {
    checkbox.checked=entries.some(record=>record.id===checkbox.dataset.practiceId);
  }
}
function list(items,ordered=false){
  const list=el(ordered?"ol":"ul","workshop-list");
  for(const item of items)list.append(el("li","",item));
  return list;
}
function group(title,items,ordered=false,warning=false){
  const container=el("section","workshop-group"+(warning?" workshop-warning":""));
  container.append(el("h4","",title),list(items,ordered));
  return container;
}
function lessonCard(l){
  const card=el("article","workshop-card");
  const heading=el("div","workshop-card-heading");
  const tags=el("div","workshop-tags");
  tags.append(el("span","",l.category+" / "+l.effort),el("span","",l.review));
  heading.append(tags,el("h3","",l.title),el("p","",l.summary));
  card.append(heading);
  const detail=el("details","workshop-details");
  detail.append(el("summary","","Open workshop lesson"));
  const body=el("div","workshop-detail-body");
  const figure=el("figure","workshop-figure");
  const img=el("img");
  img.alt="Conceptual diagram: "+l.diagram.nodes.map(n=>n.title).join(" then ");
  img.loading="lazy";
  // Generated exclusively from static project-owned lesson data, escaped by renderWorkshopDiagram.
  img.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(renderWorkshopDiagram(l.diagram));
  figure.append(img,el("figcaption","",l.diagram.caption));
  body.append(figure);
  body.append(el("p","workshop-skill","SKILL: "+l.skill));
  body.append(group("Materials / components",l.materials));
  body.append(group("Build and practice",l.steps,true));
  body.append(group("Acceptance checks",l.checks));
  body.append(group("Stop conditions and exclusions",l.stop,false,true));
  body.append(group("Maintenance and next use",l.maintenance));
  body.append(el("p","workshop-teachback","TEACH-BACK: "+l.teachBack));
  const related=el("section","workshop-group");
  related.append(el("h4","","Related atlas guides"));
  const relatedList=el("ul","workshop-list");
  for(const guideId of l.guideIds){
    const li=el("li");
    const a=el("a","",guideId.replaceAll("-"," "));
    a.href="./?guide="+encodeURIComponent(guideId)+"#atlas";
    li.append(a);relatedList.append(li);
  }
  related.append(relatedList);body.append(related);
  const refGroup=el("section","workshop-group");
  refGroup.append(el("h4","","Source references (internet needed)"));
  const refs=el("ul","workshop-list");
  for(const sourceId of l.sourceIds) {
    const src=WORKSHOP_SOURCES[sourceId];
    const li=el("li");const a=el("a","",src.title);
    a.href=src.url;a.target="_blank";a.rel="noopener noreferrer";li.append(a);refs.append(li);
  }
  refGroup.append(refs);body.append(refGroup);
  const practice=el("div","workshop-practice");
  const practiceId="practice-"+l.id;
  const checkbox=el("input");
  checkbox.type="checkbox";checkbox.id=practiceId;checkbox.dataset.practiceId=l.id;
  checkbox.addEventListener("change",()=>{
    entries=entries.filter(row=>row.id!==l.id);
    if(checkbox.checked)entries.push({id:l.id,practicedAt:new Date().toISOString()});
    const saved=persist();
    refresh();
    if(saved)setStatus("Local practice log updated. Practice is not certification or independent safety review.");
  });
  const label=el("label","","Mark this lesson practiced (not certified)");
  label.htmlFor=practiceId;
  practice.append(checkbox,label);
  const fieldbook=el("a","workshop-fieldbook-link","Read / print standalone lesson");
  fieldbook.href="./fieldbook.html#workshop-"+encodeURIComponent(l.id);
  practice.append(fieldbook);
  body.append(practice,el("p","workshop-disclaimer","This is a training exercise. Follow product instructions, current local rules and competent review for real deployments."));
  detail.append(body);card.append(detail);
  return card;
}
function exportLog(){
  const file=new Blob([exportWorkshopLog(entries,ids)],{type:"application/json"});
  const url=URL.createObjectURL(file);
  const anchor=el("a");anchor.href=url;anchor.download="codebound-practice-"+new Date().toISOString().slice(0,10)+".json";
  document.body.append(anchor);anchor.click();anchor.remove();
  setTimeout(()=>URL.revokeObjectURL(url),2000);
  setStatus("Practice log download requested. The file contains lesson IDs and completion timestamps only.");
}
function resetLog(){
  if(!entries.length)return;
  if(!window.confirm("Clear all local workshop practice marks? Download a backup first."))return;
  entries=[];
  const saved=persist();
  refresh();
  if(saved)setStatus("Local practice marks cleared.");
}
function init(){
  const container=byId("workshop-lessons");
  if(!container)return;
  readLocal();
  container.replaceChildren(...WORKSHOP_LESSONS.map(lessonCard));
  refresh();
  byId("workshop-export").addEventListener("click",exportLog);
  byId("workshop-reset").addEventListener("click",resetLog);
}
init();
