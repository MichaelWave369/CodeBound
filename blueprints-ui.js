import { BUILD_SHEETS,MATERIALS,BUILD_SOURCES } from "./data/blueprints.js";
import { calculateBuildMaterials,buildMaterialsCsv,printableMaterialsText } from "./src/blueprint-core.js";

const byId=id=>document.getElementById(id);
const el=(tag,className="",value)=>{
  const node=document.createElement(tag);
  if(className)node.className=className;
  if(value!==undefined)node.textContent=value;
  return node;
};
const selections=new Map(BUILD_SHEETS.map(sheet=>[sheet.id,0]));
function addList(values,ordered=false) {
  const parent=el(ordered?"ol":"ul","blueprint-list");
  for(const item of values)parent.append(el("li","",item));
  return parent;
}
function addGroup(parent,title,values,ordered=false,warning=false) {
  const section=el("section","blueprint-group"+(warning?" blueprint-danger":""));
  section.append(el("h4","",title),addList(values,ordered));
  parent.append(section);
}
function sheetCard(sheet) {
  const card=el("article","blueprint-card");
  const header=el("div","blueprint-card-head");
  header.append(el("p","blueprint-meta",sheet.domain+" / "+sheet.duration),el("h3","",sheet.title),el("p","blueprint-summary",sheet.summary));
  card.append(header);
  const controls=el("div","blueprint-controls");
  const label=el("label","","STATIONS");
  const input=el("input");
  input.id="station-"+sheet.id;
  input.type="number";input.min="0";input.max="25";input.step="1";input.value="0";input.inputMode="numeric";
  label.htmlFor=input.id;
  controls.append(label,input);
  const button=el("button","","Add one");
  button.type="button";
  button.addEventListener("click",()=>{
    const next=Number(input.value)+1;
    if(Number.isSafeInteger(next)&&next<=25){input.value=String(next);updateSelection(input,sheet.id);}
  });
  input.addEventListener("change",()=>updateSelection(input,sheet.id));
  controls.append(button);
  card.append(controls);
  const details=el("details","blueprint-details");
  details.append(el("summary","","Read build sheet"));
  const content=el("div","blueprint-detail-body");
  content.append(el("p","blueprint-claim","SCOPE: "+sheet.makes));
  const diagram=el("div","blueprint-flow");
  for(const [i,stage] of sheet.diagram.entries()){
    if(i)diagram.append(el("span","blueprint-flow-arrow","→"));
    diagram.append(el("span","blueprint-flow-node",stage));
  }
  content.append(diagram);
  const materials=sheet.materials.map(part=>part.quantity+" "+MATERIALS[part.id].unit+" · "+MATERIALS[part.id].name);
  addGroup(content,"Starter components / one station",materials);
  addGroup(content,"Other tools and conditions",sheet.tools);
  addGroup(content,"Build and operate",sheet.steps,true);
  addGroup(content,"Acceptance checks",sheet.checks);
  addGroup(content,"Stop conditions",sheet.stop,false,true);
  addGroup(content,"Maintenance",sheet.maintenance);
  content.append(el("p","blueprint-claim","TEACH-BACK: "+sheet.handoff));
  const related=el("section","blueprint-group");
  related.append(el("h4","","Related atlas guides"));
  const links=el("ul","blueprint-list");
  for(const id of sheet.dependencies){
    const li=el("li");
    const a=el("a","",id.replaceAll("-"," "));
    a.href="./?guide="+encodeURIComponent(id)+"#atlas";
    li.append(a);links.append(li);
  }
  related.append(links);content.append(related);
  const references=el("section","blueprint-group");
  references.append(el("h4","","Source guidance (internet needed)"));
  const sources=el("ul","blueprint-list");
  for(const id of sheet.sources){
    const src=BUILD_SOURCES[id];
    const li=el("li");
    const a=el("a","",src.title);
    a.href=src.url;a.target="_blank";a.rel="noopener noreferrer";
    li.append(a);sources.append(li);
  }
  references.append(sources);content.append(references);
  content.append(el("p","blueprint-claim","Community draft; not a certification, population-capacity rating, installation approval, or professional safety plan."));
  details.append(content);card.append(details);
  return card;
}
function selectionArray(){return [...selections].map(([id,quantity])=>({id,quantity}));}
function getPlan(){return calculateBuildMaterials(selectionArray(),BUILD_SHEETS,MATERIALS);}
function updateSelection(input,id){
  const n=Number(input.value);
  if(!Number.isSafeInteger(n)||n<0||n>25) {
    byId("blueprint-message").textContent="Use a whole number from 0 to 25 per station design.";
    input.value=String(selections.get(id));return;
  }
  const previous=selections.get(id);
  selections.set(id,n);
  try {
    getPlan();
    renderPlan();
    byId("blueprint-message").textContent="Starter quantities updated. Verify actual part compatibility and conditions before building.";
  } catch(error){
    selections.set(id,previous);input.value=String(previous);
    byId("blueprint-message").textContent=error.message;
    renderPlan();
  }
}
function renderPlan(){
  const plan=getPlan();
  byId("blueprint-count").textContent=plan.stations+" STARTER STATIONS / "+plan.materials.length+" COMPONENT TYPES";
  const body=byId("blueprint-bom");
  const rows=plan.materials.map(item=>{
    const tr=el("tr");
    tr.append(el("td","",item.name),el("td","",String(item.quantity)),el("td","",item.unit));
    return tr;
  });
  if(!rows.length){
    const tr=el("tr");
    const td=el("td","","Choose the number of stations to see a combined materials list.");
    td.colSpan=3;tr.append(td);rows.push(tr);
  }
  body.replaceChildren(...rows);
}
function download(name,body,mime){
  const blob=new Blob([body],{type:mime});
  const url=URL.createObjectURL(blob);
  const a=el("a");a.href=url;a.download=name;
  document.body.append(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),2000);
}
function exportCsv(){
  const plan=getPlan();
  if(plan.stations===0){byId("blueprint-message").textContent="Select a station quantity first.";return;}
  download("codebound-materials.csv",buildMaterialsCsv(plan),"text/csv;charset=utf-8");
  byId("blueprint-message").textContent="CSV download requested. Quantities are starter estimates, not a certified design.";
}
function printPlan(){
  const plan=getPlan();
  if(plan.stations===0){byId("blueprint-message").textContent="Select a station quantity first.";return;}
  const printable=printableMaterialsText(plan);
  const preview=byId("blueprint-print-copy");
  preview.textContent=printable;
  document.body.classList.add("printing-blueprints");
  window.print();
}
function init(){
  if(!byId("blueprint-list"))return;
  byId("blueprint-list").replaceChildren(...BUILD_SHEETS.map(sheetCard));
  byId("blueprint-export").addEventListener("click",exportCsv);
  byId("blueprint-print").addEventListener("click",printPlan);
  window.addEventListener("afterprint",()=>document.body.classList.remove("printing-blueprints"));
  renderPlan();
}
init();
