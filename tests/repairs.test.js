import test from "node:test";
import assert from "node:assert/strict";
import {REPAIR_PATTERNS,REPAIR_SOURCES,REPAIR_EVENT_KINDS} from "../data/repairs.js";
import {GUIDES} from "../data/guides.js";
import {BUILD_SHEETS} from "../data/blueprints.js";
import {REPAIR_LOG_FORMAT,EVENT_KINDS,validateRepairEvent,validateRepairLog,repairLogExport,repairEventSummary,repairCsv} from "../src/repair-core.js";
const ids=REPAIR_PATTERNS.map(x=>x.id);
const sample={id:"event_0001",asset:"TOOL-001",pattern:"fastener-identification",kind:"quarantined",observedAt:"2026-11-11",nextReview:"2026-11-14",note:"Unknown thread pitch"};
test("repair patterns have clear scope, compatibility gates, safety stops and valid references",()=>{
  assert.equal(REPAIR_PATTERNS.length,6);
  assert.equal(new Set(ids).size,ids.length);
  const guides=new Set(GUIDES.map(x=>x.id));
  const blueprints=new Set(BUILD_SHEETS.map(x=>x.id));
  for(const pattern of REPAIR_PATTERNS){
    assert.match(pattern.id,/^[a-z0-9-]+$/);
    for(const field of ["title","summary","scope","effort","category","review","teachBack"])
      assert.ok(pattern[field],pattern.id+" missing "+field);
    for(const field of ["steps","parts","checks","stop","care","guides","blueprints","sources"])
      assert.ok(Array.isArray(pattern[field]) && pattern[field].length>=2,pattern.id+" invalid "+field);
    assert.ok(pattern.steps.length>=4&&pattern.checks.length>=3&&pattern.stop.length>=3);
    assert.ok(pattern.compatibility.measure && pattern.compatibility.allowed && pattern.compatibility.forbidden);
    for(const ref of pattern.guides)assert.ok(guides.has(ref),pattern.id+" unknown guide: "+ref);
    for(const ref of pattern.blueprints)assert.ok(blueprints.has(ref),pattern.id+" unknown blueprint: "+ref);
    for(const ref of pattern.sources)assert.ok(REPAIR_SOURCES[ref],pattern.id+" unknown source "+ref);
  }
  assert.deepEqual(REPAIR_EVENT_KINDS,EVENT_KINDS);
  for(const s of Object.values(REPAIR_SOURCES))assert.ok(s.url.startsWith("https://"));
});
test("events validate, reject invalid dates and cap personal/text data",()=>{
  assert.deepEqual(validateRepairEvent(sample,ids),sample);
  for(const invalid of [
    {...sample,id:"!"},{...sample,asset:"../../secret"},{...sample,kind:"certified"},
    {...sample,pattern:"unknown"},{...sample,observedAt:"2026-02-30"},
    {...sample,nextReview:"2026-13-01"},{...sample,note:"a".repeat(181)}
  ])assert.throws(()=>validateRepairEvent(invalid,ids));
  assert.throws(()=>validateRepairLog({format:REPAIR_LOG_FORMAT,events:[sample,sample]},ids));
  assert.throws(()=>validateRepairLog({format:"wrong",events:[]},ids));
});
test("maintenance summary is based on latest observations and due dates, not assumed certification",()=>{
  const events=[sample,{...sample,id:"event_0002",kind:"inspection-recorded",observedAt:"2026-11-13",nextReview:"2026-11-20"}];
  const summary=repairEventSummary(events,ids,"2026-11-15");
  assert.deepEqual(summary,{records:2,assets:1,quarantined:0,retired:0,reviewDue:0});
  assert.equal(repairEventSummary([sample],ids,"2026-11-15").reviewDue,1);
  assert.equal(repairEventSummary([sample],ids,"2026-11-12").quarantined,1);
});
test("repair exports are portable and safe to open in spreadsheet programs",()=>{
  const parsed=JSON.parse(repairLogExport([sample],ids));
  assert.equal(parsed.format,REPAIR_LOG_FORMAT);
  assert.equal(parsed.events.length,1);
  const csv=repairCsv([{...sample,note:"=1+1"}],ids);
  assert.match(csv,/"'=1\+1"/);
  assert.match(csv,/TOOL-001/);
});
