import test from "node:test";
import assert from "node:assert/strict";
import {PRESERVATION_RECORDS,PRESERVATION_SOURCES,MEASUREMENT_RULES} from "../data/preservation.js";
import {REPAIR_PATTERNS} from "../data/repairs.js";
import {BUILD_SHEETS} from "../data/blueprints.js";
import {assessLocalInputs,convertLength,searchPreservation,validatePreservationManifest,PRESERVATION_FORMAT} from "../src/preservation-core.js";
const records=PRESERVATION_RECORDS;
test("registry has unique versioned packs, explicit safety limits, valid references and measurements",()=>{
 assert.equal(records.length,5);
 assert.equal(new Set(records.map(x=>x.id)).size,records.length);
 const repairIds=new Set(REPAIR_PATTERNS.map(x=>x.id));
 const buildIds=new Set(BUILD_SHEETS.map(x=>x.id));
 for(const item of records){
  assert.match(item.id,/^[a-z0-9-]+$/);assert.match(item.revision,/^\d+\.\d+\.\d+$/);
  for(const key of ["title","summary","scope","provenance","units","tolerance","review"])assert.ok(item[key]);
  assert.ok(item.files.length>=2&&item.checks.length>=3&&item.inputs.length>=3);
  assert.equal(new Set(item.files).size,item.files.length);
  for(const path of item.files)assert.match(path,/^(drawings|examples|templates|docs)\/[a-z0-9.-]+\.(svg|txt|scad|csv)$/);
  for(const d of item.dimensions) {
   assert.ok(d.name&&d.unit);
   assert.ok(d.value===null||(Number.isFinite(d.value)&&d.value>=0));
  }
  for(const id of item.sources)assert.ok(PRESERVATION_SOURCES[id],item.id+" source "+id);
  for(const id of item.related.repairs)assert.ok(repairIds.has(id),item.id+" repair "+id);
  for(const id of item.related.blueprints)assert.ok(buildIds.has(id),item.id+" blueprint "+id);
 }
 assert.ok(MEASUREMENT_RULES.length>=5);
 for(const s of Object.values(PRESERVATION_SOURCES))assert.ok(s.url.startsWith("https://"));
});
test("local inputs cannot silently become a safety certificate",()=>{
 const r=records[0];
 const zero=assessLocalInputs(r,[]);
 assert.equal(zero.present,0);assert.equal(zero.certified,false);
 assert.equal(zero.status,"inputs-missing");
 const full=assessLocalInputs(r,r.inputs.map(x=>x.id));
 assert.equal(full.missing.length,0);assert.equal(full.status,"inputs-present-trial-unverified");assert.equal(full.certified,false);
 assert.throws(()=>assessLocalInputs(r,["not-recognized"]));
 assert.throws(()=>assessLocalInputs(r,[r.inputs[0].id,r.inputs[0].id]));
});
test("NIST length conversion is exact but not a tolerance claim",()=>{
 assert.equal(convertLength(1,"in","mm"),25.4);
 assert.equal(convertLength(25.4,"mm","in"),1);
 assert.equal(convertLength(0,"mm","mm"),0);
 for(const x of [-1,Number.POSITIVE_INFINITY,Number.NaN])assert.throws(()=>convertLength(x,"mm","in"));
 assert.throws(()=>convertLength(10,"feet","mm"));
});
test("search and manifest validation enforce the indexed asset set",()=>{
 assert.equal(searchPreservation(records,"").length,5);
 assert.equal(searchPreservation(records,"seeds").length,0);
 assert.equal(searchPreservation(records,"seed").length,1);
 const unique=[...new Set(records.flatMap(x=>x.files))];
 const files=unique.map(path=>({path,bytes:23,sha256:"a".repeat(64)}));
 assert.equal(validatePreservationManifest({format:PRESERVATION_FORMAT,version:"0.7.0",files},records),true);
 assert.throws(()=>validatePreservationManifest({format:PRESERVATION_FORMAT,version:"0.7.0",files:files.slice(1)},records));
 assert.throws(()=>validatePreservationManifest({format:PRESERVATION_FORMAT,version:"0.7.0",files:[...files,files[0]]},records));
});
