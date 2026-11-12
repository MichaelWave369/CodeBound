// CodeBound 0.7: source-preservation registry. Drafts, not certifications.
export const PRESERVATION_SOURCES={
  loc:{title:"Library of Congress Recommended Formats Statement",url:"https://www.loc.gov/preservation/resources/rfs/format-pref-summary.html"},
  nist:{title:"NIST Guide to the SI: unit symbols and conventions",url:"https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-6-rules-and-style-conventions-printing-and-using"},
  niosh:{title:"NIOSH: Safer 3D printing",url:"https://www.cdc.gov/niosh/bulletin/2024/safe-3d-printing.html"},
  cdc:{title:"CDC: Emergency safe-water storage",url:"https://www.cdc.gov/water-emergency/about/how-to-create-and-store-an-emergency-water-supply.html"},
  extension:{title:"University of Minnesota Extension: Starting seeds indoors",url:"https://extension.umn.edu/garden-and-home/yard-and-garden/gardening-in-minnesota/starting-seeds-indoors"},
  fema:{title:"FEMA Ready: Make a plan",url:"https://www.ready.gov/plan"}
};
export const MEASUREMENT_RULES=[
  "Always record units with numbers. Use case-sensitive SI symbols, e.g. 80 mm, not 80 MM.",
  "Nominal drawing dimensions are not measured physical outcomes. Include a date, tool and method.",
  "Write UNSPECIFIED when no approved tolerance exists; never invent one.",
  "Retain original source files, revisions, author/license and an independently readable companion.",
  "SHA-256 detects changed file bytes but does NOT establish authorship, correctness or safety."
];
export const PRESERVATION_RECORDS=[
{
 id:"label-stand",title:"Parametric desktop label holder",category:"Fabrication",revision:"1.0.0",units:"mm",review:"Community draft",
 summary:"Editable OpenSCAD model and a dimensioned reference sketch for a non-load-bearing tabletop card holder.",
 scope:"Dry indoor desktop labels only. Do not use for structures, electrical enclosures, water or pressure.",
 provenance:"CodeBound original / MIT. Default dimensions from the bundled OpenSCAD source.",
 files:["examples/label-holder.scad","drawings/label-holder-v1.svg"],
 inputs:[{id:"source",label:"Both source and drawing files copied locally"},{id:"measurer",label:"Ruler or caliper and actual card measurements"},{id:"cad",label:"Local OpenSCAD or equivalent viewer"},{id:"printer",label:"Compatible 3D printer, material and safe print area"}],
 dimensions:[{name:"Base width",value:80,unit:"mm"},{name:"Base depth",value:40,unit:"mm"},{name:"Base height",value:8,unit:"mm"},{name:"Slot length",value:65,unit:"mm"},{name:"Slot width",value:2.5,unit:"mm"},{name:"Slot depth",value:5,unit:"mm"}],
 tolerance:"UNSPECIFIED. Verify printed fit; do not infer strength or accuracy from nominal CAD dimensions.",
 checks:["Match OpenSCAD dimensions to the sketch and confirm units are millimeters.","Print under documented manufacturer and NIOSH precautions; record printer and material.","Verify actual test-card fit and log measured differences before attempting a revision."],
 related:{repairs:["printable-sign-holder"],blueprints:[]},sources:["nist","niosh","loc"]
},
{
 id:"seed-layout",title:"Seed observation grid and CSV",category:"Growing",revision:"1.0.0",units:"count",review:"Community draft",
 summary:"An illustrative 12-cell location chart and blank, UTF-8 observation table for repeatable seed trials.",
 scope:"Recordkeeping example; not a universal tray size, planting depth, germination guarantee or yield forecast.",
 provenance:"CodeBound original / MIT. Cell locations are example labels only.",
 files:["drawings/seed-tray-layout-v1.svg","templates/seed-log-v1.csv"],
 inputs:[{id:"seeds",label:"Identified seeds and crop-specific packet instructions"},{id:"tray",label:"Clean draining tray and suitable growing medium"},{id:"log",label:"Paper or CSV log accessible without internet"},{id:"conditions",label:"Known appropriate water and lighting"}],
 dimensions:[{name:"Seeds sown",value:null,unit:"count"},{name:"Seedlings emerged",value:null,unit:"count"}],
 tolerance:"NOT APPLICABLE. No physical tray dimensions specified.",
 checks:["Match every observed cell to a sowing date and variety.","Count seeds sown and seedlings emerged separately, even in unsuccessful trials.","Include lighting and watering context before comparing trial results."],
 related:{repairs:["seed-tray-inserts"],blueprints:["seed-observation"]},sources:["extension","loc"]
},
{
 id:"water-status",title:"Safe/unknown water status sign",category:"Water",revision:"1.0.0",units:"none",review:"Community draft",
 summary:"Source-checked versus unverified separation sign and a dated provenance form.",
 scope:"Communication only; labels do not treat water or establish potability.",
 provenance:"CodeBound original / MIT. Review current water authority instructions before use.",
 files:["drawings/water-zones-v1.svg","templates/verification-record-v1.txt"],
 inputs:[{id:"zones",label:"Two separate, stable container areas"},{id:"advisory",label:"Current official water-source or advisory verification"},{id:"sign",label:"Legible sign and material for posting"},{id:"review",label:"Named update role and next check time"}],
 dimensions:[],
 tolerance:"NOT APPLICABLE. A status label is not a laboratory test.",
 checks:["Every vessel is marked with source, status and date or NOT VERIFIED.","A second reader correctly identifies the unverified area.","Update signs when authoritative instructions change."],
 related:{repairs:[],blueprints:["water-label-bench"]},sources:["cdc","fema"]
},
{
 id:"notice-template",title:"Offline community notice template",category:"Communication",revision:"1.0.0",units:"none",review:"Community draft",
 summary:"Plain-text notice form for source, date, uncertainty, visible corrections and accessible alternatives.",
 scope:"Community coordination; never replace emergency alert channels or fabricate official orders.",
 provenance:"CodeBound original / MIT. Source and timestamp fields mandatory during use.",
 files:["templates/notice-v1.txt","templates/verification-record-v1.txt"],
 inputs:[{id:"source",label:"Known public information source"},{id:"clock",label:"Date/time and time zone"},{id:"board",label:"Accessible board and paper distribution"},{id:"correction",label:"Person/process for visible corrections"}],
 dimensions:[],
 tolerance:"NOT APPLICABLE. Verify dates and provenance.",
 checks:["A person without a phone can find source and next update time.","A correction retains the prior message reference.","Do not publish private household, address or medical information."],
 related:{repairs:[],blueprints:["supply-accountability"]},sources:["fema","loc"]
},
{
 id:"repair-evidence",title:"Replacement-part measurement and evidence sheet",category:"Repair",revision:"1.0.0",units:"mm or stated original units",review:"Community draft",
 summary:"Two portable worksheets record part source, actual dimensions, unknown tolerances and safe handoffs.",
 scope:"Document low-risk compatibility; never certify structural, electrical, pressure or safety-rated components.",
 provenance:"CodeBound original / MIT. Evidence and uncertainty remain visible.",
 files:["docs/REPAIR-WORKSHEET.txt","templates/verification-record-v1.txt"],
 inputs:[{id:"asset",label:"Nonpersonal asset ID and original part identification"},{id:"tool",label:"Appropriate measurement tool and declared units"},{id:"maker",label:"Manufacturer description or known exact reference"},{id:"quarantine",label:"Quarantine and qualified review route if necessary"}],
 dimensions:[],
 tolerance:"UNSPECIFIED unless an authoritative product or design document specifies it.",
 checks:["Record nominal and measured numbers with units and the measuring method.","Record unknown material grades or fit criteria as UNKNOWN.","Keep safety-rated components out of service pending qualified approval."],
 related:{repairs:["fastener-identification","tool-quarantine"],blueprints:[]},sources:["nist","loc"]
}
];
