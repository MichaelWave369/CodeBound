import {PRESERVATION_RECORDS,PRESERVATION_SOURCES,MEASUREMENT_RULES} from "./data/preservation.js";
import {assessLocalInputs,searchPreservation,convertLength} from "./src/preservation-core.js";
const $=id=>document.getElementById(id);
const node=(tag,className="",text)=>{const n=document.createElement(tag);if(className)n.className=className;if(text!==undefined)n.textContent=text;return n;};
const checked=new Map(PRESERVATION_RECORDS.map(x=>[x.id,new Set()]));
function list(items){
 const ul=node("ul","preserve-list");
 for(const text of items)ul.append(node("li","",text));
 return ul;
}
function section(root,title,items){
 const box=node("section","preserve-subsection");
 box.append(node("h4","",title),list(items));root.append(box);
}
function updateCounts(){
 let available=0;
 for(const record of PRESERVATION_RECORDS){
  if(assessLocalInputs(record,[...checked.get(record.id)]).missing.length===0)available++;
 }
 $("preserve-status").textContent=available+" / "+PRESERVATION_RECORDS.length+" INPUT SETS SELF-REPORTED COMPLETE · NO SAFETY CERTIFICATION";
}
function render(record){
 const card=node("article","preserve-card");
 card.append(node("div","preserve-meta",record.category+" / REV "+record.revision+" / "+record.review),
   node("h3","",record.title),node("p","preserve-summary",record.summary));
 const details=node("details","preserve-details");
 details.append(node("summary","","Open preservation pack"));
 const body=node("div","preserve-body");
 body.append(node("p","preserve-limit","SCOPE: "+record.scope),node("p","preserve-origin","PROVENANCE: "+record.provenance));
 if(record.id==="label-stand"||record.id==="seed-layout"||record.id==="water-status"){
  const drawing=record.files.find(path=>path.endsWith(".svg"));
  if(drawing){
   const image=node("img","preserve-image");
   image.src="./"+drawing;
   image.alt="Illustrative, not-to-scale drawing for "+record.title;
   image.loading="lazy";
   body.append(image);
  }
 }
 const assets=node("section","preserve-subsection");
 assets.append(node("h4","","Originals and printable companions"));
 const assetLinks=node("ul","preserve-list");
 for(const path of record.files){
  const li=node("li");
  const a=node("a","",path);
  a.href="./"+path;a.download=path.split("/").at(-1);
  li.append(a);assetLinks.append(li);
 }
 assets.append(assetLinks);body.append(assets);
 const units=record.dimensions.map(d=>d.name+": "+(d.value===null?"TO MEASURE":d.value+" "+d.unit));
 section(body,"Measurements and units",units.length?units:["No physical dimensions specified."]);
 body.append(node("p","preserve-origin","TOLERANCE: "+record.tolerance));
 section(body,"Acceptance and evidence checks",record.checks);
 const refs=node("section","preserve-subsection");
 refs.append(node("h4","","Reference sources (online only)"));
 const sources=node("ul","preserve-list");
 for(const id of record.sources){
  const s=PRESERVATION_SOURCES[id];
  const li=node("li"),a=node("a","",s.title);a.href=s.url;a.target="_blank";a.rel="noopener noreferrer";
  li.append(a);sources.append(li);
 }
 refs.append(sources);body.append(refs);
 const checklist=node("fieldset","preserve-checklist");
 checklist.append(node("legend","","Local reproduction inputs · self-assessment"));
 const state=node("p","preserve-readiness");
 function refresh(){
  const result=assessLocalInputs(record,[...checked.get(record.id)]);
  state.textContent=result.missing.length
    ?result.present+" / "+result.total+" inputs reported · "+result.missing.length+" still missing"
    :"All inputs reported · physical trial and qualified review NOT verified";
  updateCounts();
 }
 for(const req of record.inputs){
  const line=node("label","preserve-checkrow");
  const cb=node("input");cb.type="checkbox";cb.checked=checked.get(record.id).has(req.id);
  cb.addEventListener("change",()=>{
   if(cb.checked)checked.get(record.id).add(req.id);
   else checked.get(record.id).delete(req.id);
   refresh();
  });
  line.append(cb,node("span","",req.label));checklist.append(line);
 }
 checklist.append(state);
 body.append(checklist);
 refresh();
 body.append(node("p","preserve-limit","Checkmarks mean claimed local access only. They do NOT prove safety, source authenticity, dimensions, compatibility or reproducibility."));
 details.append(body);card.append(details);
 return card;
}
function init(){
 if(!$("preservation-cards"))return;
 const cards=$("preservation-cards");
 function show(){
  let results;
  try{results=searchPreservation(PRESERVATION_RECORDS,$("preservation-search").value);}
  catch{results=[];}
  cards.replaceChildren(...results.map(render));
  $("preservation-match-count").textContent=results.length+" / "+PRESERVATION_RECORDS.length+" PACKS MATCH";
 }
 $("preservation-search").addEventListener("input",show);
 const rules=$("measurement-rules");
 rules.replaceChildren(...MEASUREMENT_RULES.map(x=>node("li","",x)));
 $("preservation-convert").addEventListener("click",()=>{
  const n=Number($("preservation-input").value);
  try{
   if($("preservation-input").value.trim()==="")throw Error("Enter a number");
   const from=$("preservation-from").value,to=from==="mm"?"in":"mm";
   $("preservation-result").textContent=n+" "+from+" = "+Number(convertLength(n,from,to).toPrecision(10))+" "+to+
     " (conversion does not improve measurement precision)";
  }catch(error){$("preservation-result").textContent=error.message;}
 });
 show();updateCounts();
}
init();
