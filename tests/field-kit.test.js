import test from "node:test";
import assert from "node:assert/strict";
import {mkdtemp,readFile,rm} from "node:fs/promises";
import {tmpdir} from "node:os";
import {join,resolve} from "node:path";
import {inflateRawSync} from "node:zlib";
import {buildFieldKit,escapeHtml,renderHtml,renderText,renderJson,makeZip,sha256} from "../scripts/build-field-kit.mjs";
import {GUIDES} from "../data/guides.js";
function extract(zip) {
  const result={}; let pos=0;
  while(pos+30<zip.length && zip.readUInt32LE(pos)===0x04034b50) {
    assert.equal(zip.readUInt16LE(pos+8),8);
    const packed=zip.readUInt32LE(pos+18), plain=zip.readUInt32LE(pos+22);
    const nameLen=zip.readUInt16LE(pos+26),extra=zip.readUInt16LE(pos+28);
    const name=zip.subarray(pos+30,pos+30+nameLen).toString("utf8");
    const start=pos+30+nameLen+extra;
    const data=inflateRawSync(zip.subarray(start,start+packed));
    assert.equal(data.length,plain);
    result[name]=data;pos=start+packed;
  }
  assert.equal(zip.readUInt32LE(pos),0x02014b50);
  assert.equal(zip.readUInt32LE(zip.length-22),0x06054b50);
  assert.equal(zip.readUInt16LE(zip.length-12),Object.keys(result).length);
  return result;
}
test("standalone HTML has no scripts, external styles or missing cards",()=>{
  const html=renderHtml();
  assert.match(html,/<!doctype html>/i);
  assert.doesNotMatch(html,/<script|<link[^>]+stylesheet/i);
  for(const g of GUIDES){assert.ok(html.includes('id="'+g.id+'"')); assert.ok(html.includes(escapeHtml(g.title)));}
  assert.equal(escapeHtml('<&"'),"&lt;&amp;&quot;");
  assert.match(html,/first 72 hours/i);
});
test("plain text and JSON contain guide steps",()=>{
  const txt=renderText(), json=JSON.parse(renderJson());
  assert.equal(json.guides.length,GUIDES.length);
  assert.equal(json.format,"codebound-fieldbook-v1");
  for(const g of GUIDES){assert.ok(txt.includes(g.title));for(const s of g.steps)assert.ok(txt.includes(s));}
});
test("ZIP pack prevents traversal",()=>{
  assert.throws(()=>makeZip({"../x":"bad"}),/Unsafe ZIP path/);
  assert.throws(()=>makeZip({"/etc/file":"bad"}),/Unsafe ZIP path/);
});
test("ZIP is deterministic, self-contained and its checksums match",async()=>{
  const dir=await mkdtemp(join(tmpdir(),"codebound-"));
  try{
    const a=await buildFieldKit(resolve("."),join(dir,"a"));
    const b=await buildFieldKit(resolve("."),join(dir,"b"));
    const zipA=await readFile(join(a.out,"site/codebound-field-kit.zip"));
    const zipB=await readFile(join(b.out,"site/codebound-field-kit.zip"));
    assert.deepEqual(zipA,zipB);
    assert.equal(sha256(zipA),a.digest);
    const files=extract(zipA);
    for(const name of ["fieldbook.html","fieldbook.txt","fieldbook.json","README.txt","LICENSE.txt","SHA256SUMS.txt","site/index.html","site/app.js","site/scripts/serve.mjs"])
      assert.ok(files[name],"missing "+name);
    for(const line of files["SHA256SUMS.txt"].toString().trim().split("\n")){
      const m=line.match(/^([a-f0-9]{64})  (.+)$/);
      assert.ok(m);assert.ok(files[m[2]]);assert.equal(sha256(files[m[2]]),m[1]);
    }
    assert.equal((await readFile(join(a.out,"site/fieldbook.html"))).toString(),files["fieldbook.html"].toString());
    const checksum=await readFile(join(a.out,"site/codebound-field-kit.zip.sha256"),"utf8");
    assert.ok(checksum.startsWith(a.digest));
  }finally{await rm(dir,{recursive:true,force:true});}
});
