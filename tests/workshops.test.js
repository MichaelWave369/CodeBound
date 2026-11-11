import test from "node:test";
import assert from "node:assert/strict";
import {WORKSHOP_LESSONS,WORKSHOP_SOURCES} from "../data/workshops.js";
import {GUIDES} from "../data/guides.js";
import {
  renderWorkshopDiagram,validateWorkshopLog,exportWorkshopLog,
  summarizeWorkshopProgress,escapeSvgText,WORKSHOP_LOG_FORMAT
} from "../src/workshop-core.js";

test("five workshops contain concrete materials, steps, checks, safety limits and reference sources",()=>{
  assert.equal(WORKSHOP_LESSONS.length,5);
  const ids=new Set(WORKSHOP_LESSONS.map(l=>l.id));
  assert.equal(ids.size,WORKSHOP_LESSONS.length);
  const guideIds=new Set(GUIDES.map(g=>g.id));
  for(const l of WORKSHOP_LESSONS) {
    assert.match(l.id,/^[a-z0-9-]+$/);
    assert.ok(l.title&&l.summary&&l.category&&l.skill&&l.effort&&l.review&&l.teachBack);
    for(const field of ["materials","steps","checks","stop","maintenance","guideIds","sourceIds"]) {
      assert.ok(Array.isArray(l[field]),l.id+" missing "+field);
      assert.ok(l[field].length>=1,l.id+" empty "+field);
    }
    assert.ok(l.steps.length>=4&&l.checks.length>=3&&l.stop.length>=2,l.id+" incomplete");
    assert.equal(l.diagram.nodes.length,3);
    assert.ok(l.diagram.caption.length>30);
    for(const g of l.guideIds)assert.ok(guideIds.has(g),l.id+" missing guide "+g);
    for(const s of l.sourceIds)assert.ok(WORKSHOP_SOURCES[s],l.id+" missing source "+s);
    assert.ok(l.steps.every(s=>s.length>50),l.id+" steps too vague");
  }
  for(const source of Object.values(WORKSHOP_SOURCES))assert.ok(source.url.startsWith("https://"));
});

test("accessible SVG diagrams escape text and avoid dynamic scripts",()=>{
  for(const lesson of WORKSHOP_LESSONS) {
    const image=renderWorkshopDiagram(lesson.diagram);
    assert.match(image,/<svg/);
    assert.match(image,/<title>/);
    assert.doesNotMatch(image,/<script|onload=|onerror=/i);
    for(const label of lesson.diagram.nodes) {
      assert.ok(image.includes(escapeSvgText(label.title)));
      assert.ok(image.includes(escapeSvgText(label.detail)));
    }
  }
  assert.equal(escapeSvgText('<&"'),"&lt;&amp;&quot;");
  assert.throws(()=>renderWorkshopDiagram({nodes:[]}),/exactly three/);
});

test("practice logs retain only valid, unique lesson IDs and ISO timestamps",()=>{
  const ids=WORKSHOP_LESSONS.map(l=>l.id);
  const now="2026-11-11T12:00:00.000Z";
  const input={format:WORKSHOP_LOG_FORMAT,entries:[{id:ids[0],practicedAt:now}]};
  assert.deepEqual(validateWorkshopLog(input,ids),input.entries);
  assert.deepEqual(summarizeWorkshopProgress(input.entries,ids),{practiced:1,total:ids.length});
  const exported=JSON.parse(exportWorkshopLog(input.entries,ids));
  assert.deepEqual(exported.entries,input.entries);
  assert.throws(()=>validateWorkshopLog({...input,entries:[input.entries[0],input.entries[0]]},ids));
  assert.throws(()=>validateWorkshopLog({...input,entries:[{id:"not-a-lesson",practicedAt:now}]},ids));
  assert.throws(()=>validateWorkshopLog({...input,entries:[{id:ids[0],practicedAt:"yesterday"}]},ids));
  assert.throws(()=>validateWorkshopLog({format:"wrong",entries:[]},ids));
  assert.deepEqual(summarizeWorkshopProgress([],ids),{practiced:0,total:ids.length});
});
