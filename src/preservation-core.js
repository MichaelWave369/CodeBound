// CodeBound preservation helpers. Readiness means claimed inputs, not certified reproduction.
export const PRESERVATION_FORMAT="codebound-preservation-v1";
export function convertLength(n,from,to){
 if(!Number.isFinite(n)||n<0||n>1000000||!["mm","in"].includes(from)||!["mm","in"].includes(to))
   throw new RangeError("Length must be finite (0 to 1 million) with unit mm or in");
 return from===to?n:from==="in"?n*25.4:n/25.4;
}
export function assessLocalInputs(item,provided=[]){
 if(!item||!Array.isArray(item.inputs)||!Array.isArray(provided))throw new TypeError("Bad preservation checklist");
 const expected=new Set(item.inputs.map(x=>x.id)),seen=new Set();
 if(expected.size!==item.inputs.length)throw new Error("Duplicate required input");
 for(const id of provided){if(!expected.has(id)||seen.has(id))throw new Error("Unknown or repeated input");seen.add(id);}
 const missing=item.inputs.filter(x=>!seen.has(x.id)).map(x=>x.id);
 return {present:seen.size,total:expected.size,missing,status:missing.length?"inputs-missing":"inputs-present-trial-unverified",certified:false};
}
export function searchPreservation(records,query=""){
 const q=String(query).trim().toLowerCase();
 if(q.length>140)throw new RangeError("Search too long");
 return records.filter(x=>[x.id,x.title,x.summary,x.category,...x.files].join(" ").toLowerCase().includes(q));
}
export function validatePreservationManifest(index,records){
 if(!index||index.format!==PRESERVATION_FORMAT||!index.version||!Array.isArray(index.files))throw Error("Invalid manifest");
 const expected=new Set(records.flatMap(x=>x.files));
 const seen=new Set();
 for(const file of index.files){
  if(!file||!expected.has(file.path)||seen.has(file.path)||!/^[a-f0-9]{64}$/.test(file.sha256)||
     !Number.isSafeInteger(file.bytes)||file.bytes<0)throw Error("Invalid manifest file");
  seen.add(file.path);
 }
 if(seen.size!==expected.size)throw Error("Missing archived file");
 return true;
}
