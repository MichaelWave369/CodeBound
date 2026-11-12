import test from "node:test";
import assert from "node:assert/strict";
import {BUILD_SHEETS,MATERIALS,BUILD_SOURCES} from "../data/blueprints.js";
import {GUIDES} from "../data/guides.js";
import {calculateBuildMaterials,buildMaterialsCsv,encodeCsvCell,printableMaterialsText} from "../src/blueprint-core.js";
test("all six build sheets have valid dependencies, quantities and safety acceptance criteria",()=>{
  assert.equal(BUILD_SHEETS.length,6);
  assert.equal(new Set(BUILD_SHEETS.map(b=>b.id)).size,BUILD_SHEETS.length);
  const guides=new Set(GUIDES.map(g=>g.id));
  for (const b of BUILD_SHEETS) {
    assert.match(b.id,/^[a-z0-9-]+$/);
    for (const key of ["title","summary","domain","duration","review","makes","handoff"])assert.ok(b[key],b.id+" missing "+key);
    for (const key of ["materials","steps","checks","stop","maintenance","dependencies","sources","tools","diagram"])assert.ok(Array.isArray(b[key])&&b[key].length>=2,b.id+" invalid "+key);
    assert.equal(b.diagram.length,3);
    assert.ok(b.steps.length>=4&&b.checks.length>=3&&b.stop.length>=2);
    assert.ok(b.materials.every(x=>MATERIALS[x.id]&&Number.isSafeInteger(x.quantity)&&x.quantity>0));
    assert.equal(new Set(b.materials.map(x=>x.id)).size,b.materials.length);
    for(const id of b.dependencies)assert.ok(guides.has(id),b.id+" guide "+id);
    for(const id of b.sources)assert.ok(BUILD_SOURCES[id],b.id+" source "+id);
  }
  for(const s of Object.values(BUILD_SOURCES))assert.ok(s.url.startsWith("https://"));
});
test("material planner combines matching item IDs but not different units",()=>{
  const result=calculateBuildMaterials([
    {id:"water-label-bench",quantity:2},
    {id:"supply-accountability",quantity:3}
  ],BUILD_SHEETS,MATERIALS);
  assert.equal(result.stations,5);
  assert.equal(result.materials.find(x=>x.id==="marker").quantity,8);
  assert.equal(result.materials.find(x=>x.id==="labels").quantity,10);
  assert.equal(calculateBuildMaterials([],BUILD_SHEETS,MATERIALS).stations,0);
  assert.ok(result.materials.every(x=>Number.isSafeInteger(x.quantity)&&x.quantity>0));
});
test("planner rejects malformed or dangerous counts",()=>{
  const base={id:"water-label-bench",quantity:1};
  for(const quantity of [-1,0.2,26,NaN,Infinity,"2"])
    assert.throws(()=>calculateBuildMaterials([{...base,quantity}],BUILD_SHEETS,MATERIALS));
  assert.throws(()=>calculateBuildMaterials([base,base],BUILD_SHEETS,MATERIALS));
  assert.throws(()=>calculateBuildMaterials([{id:"missing",quantity:1}],BUILD_SHEETS,MATERIALS));
  assert.throws(()=>calculateBuildMaterials(BUILD_SHEETS.map(b=>({id:b.id,quantity:25})),BUILD_SHEETS,MATERIALS));
});
test("CSV safe to open in spreadsheet applications, printable version is independent",()=>{
  assert.equal(encodeCsvCell('=1+2'),"\"'=1+2\"");
  assert.equal(encodeCsvCell('a,"b"'),'"a,""b"""');
  const plan=calculateBuildMaterials([{id:BUILD_SHEETS[0].id,quantity:1}],BUILD_SHEETS,MATERIALS);
  assert.match(buildMaterialsCsv(plan),/Item ID/);
  assert.match(printableMaterialsText(plan),/Starter stations: 1/);
  assert.match(printableMaterialsText(plan),/water container/i);
});
