// Deterministic low-risk station BOM planner. Starter quantities are not capacity claims.
export function calculateBuildMaterials(selections, blueprints, catalog) {
  if (!Array.isArray(selections) || !Array.isArray(blueprints) || !catalog)
    throw new TypeError("Expected selections, blueprints and catalog");
  const byId=new Map(blueprints.map(b=>[b.id,b]));
  if (byId.size !== blueprints.length) throw new Error("Duplicate blueprint identifiers");
  const selected=new Set();
  const aggregate=new Map();
  let stations=0;
  for (const selection of selections) {
    if (!selection || typeof selection.id!=="string" || selected.has(selection.id) ||
        !byId.has(selection.id)) throw new RangeError("Unknown or repeated blueprint ID");
    selected.add(selection.id);
    const quantity=selection.quantity;
    if (!Number.isSafeInteger(quantity) || quantity<0 || quantity>25)
      throw new RangeError("Each build quantity must be a whole number from 0 to 25");
    stations+=quantity;
    if (stations>100)throw new RangeError("Maximum total: 100 starter stations");
    if (quantity===0)continue;
    for (const part of byId.get(selection.id).materials) {
      if (!Number.isSafeInteger(part.quantity) || part.quantity<1) throw new Error("Invalid bill-of-material quantity");
      const item=catalog[part.id];
      if (!item || !item.name || !item.unit) throw new Error("Unknown catalog material: "+part.id);
      const previous=aggregate.get(part.id)?.quantity||0;
      const total=previous+part.quantity*quantity;
      if (!Number.isSafeInteger(total))throw new Error("Quantity overflow");
      aggregate.set(part.id,{id:part.id,name:item.name,unit:item.unit,quantity:total});
    }
  }
  return {stations,materials:[...aggregate.values()].sort((a,b)=>a.name.localeCompare(b.name))};
}
export function encodeCsvCell(value) {
  // Quote every field, prevent spreadsheet formula execution on later opening.
  const v=String(value).replace(/^[\t\r\n ]*([=+@-])/,"'$1");
  return '"'+v.replace(/"/g,'""')+'"';
}
export function buildMaterialsCsv(plan) {
  if (!plan || !Array.isArray(plan.materials))throw new TypeError("Invalid materials plan");
  const rows=[["Item ID","Component","Quantity","Unit"],...plan.materials.map(x=>[x.id,x.name,x.quantity,x.unit])];
  return rows.map(row=>row.map(encodeCsvCell).join(",")).join("\r\n")+"\r\n";
}
export function printableMaterialsText(plan) {
  if (!plan || !Array.isArray(plan.materials))throw new TypeError("Invalid materials plan");
  return ["CODEBOUND BUILD SHEET MATERIALS PLAN","Starter stations: "+plan.stations,
    "Quantities are per-station planning estimates, not usage capacity, building approval or food/water certification.","",
    ...plan.materials.map(item=>"[ ] "+item.quantity+" "+item.unit+" — "+item.name),
    "","Review availability, compatibility, site conditions and hazards before use."].join("\n");
}
