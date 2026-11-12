// Local-only repair history. All events are observations, never certification.
export const REPAIR_LOG_FORMAT="codebound-repair-events-v1";
export const EVENT_KINDS=["inspection-recorded","quarantined","approved-part-installed","retired"];
const ISO_DAY=/^\d{4}-\d{2}-\d{2}$/;
function validDay(value){
  return typeof value==="string" && ISO_DAY.test(value) &&
    !Number.isNaN(Date.parse(value+"T00:00:00Z")) &&
    new Date(value+"T00:00:00Z").toISOString().slice(0,10)===value;
}
export function validateRepairEvent(data,patternIds){
  const patterns=new Set(patternIds);
  if(!data || typeof data!=="object")throw new Error("Missing repair event");
  const id=String(data.id??"");
  const asset=String(data.asset??"").trim();
  const pattern=String(data.pattern??"");
  const kind=String(data.kind??"");
  const observedAt=String(data.observedAt??"");
  const nextReview=data.nextReview == null || data.nextReview === "" ? "" : String(data.nextReview);
  const note=String(data.note??"").trim();
  if(!/^[A-Za-z0-9_-]{4,80}$/.test(id))throw new Error("Invalid record ID");
  if(!/^[A-Za-z0-9][A-Za-z0-9._ -]{0,47}$/.test(asset))throw new Error("Asset tag must be 1-48 basic characters");
  if(!patterns.has(pattern))throw new Error("Unknown repair pattern");
  if(!EVENT_KINDS.includes(kind))throw new Error("Unknown repair event type");
  if(!validDay(observedAt))throw new Error("Invalid inspection date");
  if(nextReview && !validDay(nextReview))throw new Error("Invalid next review date");
  if(note.length>180 || /[\u0000-\u001f\u007f]/.test(note))throw new Error("Invalid note");
  return {id,asset,pattern,kind,observedAt,nextReview,note};
}
export function validateRepairLog(data,patternIds){
  if(!data || data.format!==REPAIR_LOG_FORMAT || !Array.isArray(data.events) || data.events.length>500)
    throw new Error("Invalid CodeBound repair log");
  if(JSON.stringify(data).length>250000)throw new Error("Repair log exceeds limit");
  const ids=new Set();
  return data.events.map(event=>{
    const clean=validateRepairEvent(event,patternIds);
    if(ids.has(clean.id))throw new Error("Duplicate record ID");
    ids.add(clean.id);
    return clean;
  });
}
export function repairLogExport(events,patternIds){
  const clean=validateRepairLog({format:REPAIR_LOG_FORMAT,events},patternIds);
  return JSON.stringify({format:REPAIR_LOG_FORMAT,disclaimer:"Records describe observations only, not safety approval.",events:clean},null,2)+"\n";
}
export function repairEventSummary(events,patternIds,today){
  const clean=validateRepairLog({format:REPAIR_LOG_FORMAT,events},patternIds);
  if(!validDay(today))throw new Error("Invalid current date");
  const assets=new Map();
  // Sort chronologically before grouping; later entries on the same date take precedence by insertion order.
  for(const event of [...clean].sort((a,b)=>a.observedAt.localeCompare(b.observedAt))){
    assets.set(event.asset,event);
  }
  const latest=[...assets.values()];
  const everQuarantined=new Set(clean.filter(x=>x.kind==="quarantined").map(x=>x.asset));
  const retired=new Set(latest.filter(x=>x.kind==="retired").map(x=>x.asset));
  return {
    records:clean.length,
    assets:assets.size,
    quarantined:[...everQuarantined].filter(asset=>!retired.has(asset)).length,
    retired:retired.size,
    reviewDue:latest.filter(x=>x.nextReview && x.nextReview<=today && x.kind!=="retired").length
  };
}
export function repairCsv(events,patternIds){
  const clean=validateRepairLog({format:REPAIR_LOG_FORMAT,events},patternIds);
  function cell(raw) {
    // Always quote cells and prevent spreadsheet-formula interpretation.
    const value=String(raw).replace(/^[\u0009-\u0020]*([=+@-])/,"'$1");
    return '"'+value.replace(/"/g,'""')+'"';
  }
  const rows=[["Asset tag","Pattern","Event","Date","Next review","Notes"],...clean.map(x=>
    [x.asset,x.pattern,x.kind,x.observedAt,x.nextReview,x.note])];
  return rows.map(row=>row.map(cell).join(",")).join("\r\n")+"\r\n";
}
