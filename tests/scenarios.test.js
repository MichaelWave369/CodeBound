import test from "node:test";
import assert from "node:assert/strict";
import { RESPONSE_PLANS, RESPONSE_WINDOWS, RESPONSE_SOURCES } from "../data/scenarios.js";
import { GUIDES } from "../data/guides.js";

test("72-hour plans have unique IDs, nonempty timed steps and verifiable safeguards", () => {
  const ids=new Set(RESPONSE_PLANS.map(p=>p.id));
  assert.equal(ids.size,RESPONSE_PLANS.length);
  assert.equal(RESPONSE_PLANS.length,6);
  const guideIds=new Set(GUIDES.map(g=>g.id));
  for(const plan of RESPONSE_PLANS){
    assert.match(plan.id,/^[a-z0-9-]+$/);
    assert.ok(plan.title&&plan.summary&&plan.trigger);
    assert.ok(["High","Critical"].includes(plan.severity));
    assert.ok(plan.review);
    for(const key of ["first","day","next","tools","verify","escalate","guides","sourceIds"]) {
      assert.ok(Array.isArray(plan[key]),plan.id+" missing "+key);
      assert.ok(plan[key].length>=2,plan.id+" too few entries: "+key);
      assert.ok(plan[key].every(v=>typeof v==="string"&&v.length>(["first","day","next","verify","escalate"].includes(key)?12:2)),plan.id+" invalid text in "+key);
    }
    for(const id of plan.guides)assert.ok(guideIds.has(id),plan.id+" unknown guide "+id);
    for(const id of plan.sourceIds)assert.ok(RESPONSE_SOURCES[id],plan.id+" unknown source "+id);
  }
  assert.deepEqual(RESPONSE_WINDOWS.map(w=>w.id),["immediate","first-day","following-days"]);
  assert.ok(Object.values(RESPONSE_SOURCES).every(s=>s.url.startsWith("https://")));
});
test("72-hour plan safety boundaries cover high-consequence mistakes",()=>{
  const byId=Object.fromEntries(RESPONSE_PLANS.map(p=>[p.id,p]));
  assert.match(byId["water-disruption"].first.join(" "),/chemicals/i);
  assert.match(byId["power-outage"].first.join(" "),/20 feet/);
  assert.match(byId["food-safety"].day.join(" "),/4 hours/);
  assert.match(byId["communications-loss"].day.join(" "),/without smartphones|texting/i);
  assert.match(byId["shelter-displacement"].first.join(" "),/damaged buildings/i);
  assert.match(byId["neighborhood-coordination"].next.join(" "),/coercion/i);
});
