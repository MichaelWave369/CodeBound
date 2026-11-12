// CodeBound 0.6: repair patterns, replaceable components and maintenance decisions.
// These are source-informed community DRAFTS, not engineering approvals or proof of compatibility.
export const REPAIR_SOURCES={
  osha_tools:{title:"OSHA: Hand and power tools safety",url:"https://www.osha.gov/hand-power-tools"},
  osha_rule:{title:"OSHA: Hand-tool condition requirements",url:"https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.242"},
  osha_guide:{title:"OSHA: Hand and power tools guidance (OSHA 3080)",url:"https://www.osha.gov/sites/default/files/publications/OSHA3080.pdf"},
  niosh_print:{title:"NIOSH: Approaches to safe 3D printing",url:"https://www.cdc.gov/niosh/docs/2024-103/"},
  niosh_guide:{title:"NIOSH: Safe 3D printing for everyone",url:"https://www.cdc.gov/niosh/bulletin/2024/safe-3d-printing.html"},
  umn_seeds:{title:"University of Minnesota Extension: Starting seeds indoors",url:"https://extension.umn.edu/garden-and-home/yard-and-garden/gardening-in-minnesota/starting-seeds-indoors"},
  node_http:{title:"Node.js: HTTP server reference",url:"https://nodejs.org/api/http.html"}
};
export const REPAIR_PATTERNS=[
  {
    id:"fastener-identification",title:"Identify a nonstructural replacement fastener",category:"Hardware",effort:"30–60 min",review:"Community draft",
    summary:"Measure and document a loose, low-risk sample fastener before selecting an exact matching replacement. No force-fit guessing.",
    scope:"Practice on a label frame, desktop organizer or other non-load-bearing fixture removed from service.",
    parts:["Known loose sample fastener","Caliper/ruler appropriate to required precision","Metric and imperial thread pitch gauge or documented manufacturer specification","Paper card and labeled storage bins"],
    steps:[
      "Remove the noncritical sample from service and inspect it for wear, damage, material markings and obvious corrosion.",
      "Record diameter, overall length, head style, thread pitch, thread type and markings. Identify whether measurements are metric or imperial without mixing them.",
      "Compare the dimensions with the equipment maker's part information or a verified part standard; do not assume a similar-looking screw is interchangeable.",
      "Find an identical specified replacement from trusted stock. Test only on the disconnected, noncritical fixture, by hand and without forcing the threads.",
      "If the replacement binds, rocks, strips, changes alignment or lacks a known grade, stop and quarantine the match.",
      "Label the spare bin with measured dimensions, maker part number when known, and limits of use."
    ],
    checks:["Measurement record specifies units, pitch and length, rather than only a visual description.","The example replacement installs by hand without force or damage on a noncritical sample.","Any unknown grade, thread form or safety-rated application is marked NOT VERIFIED."],
    stop:["Never substitute unverified hardware in structural, load-bearing, pressure, braking, lifting, vehicle safety or electrical bonding systems.","Do not mix near-matching metric/imperial threads or substitute lower-strength grades.","If the original part is deformed or damaged, request qualified review before reuse."],
    care:["Keep pitch gauges and measuring tools clean, dry and calibrated to the required tolerance.","Separate confirmed components from unknown ones; recheck records before each future substitution."],
    compatibility:{measure:"Diameter, pitch, length, head, material/grade, unit system and manufacturer part number.",
      allowed:"Verified exact match for the documented noncritical function, including maker specifications where available.",
      forbidden:"Visual resemblance alone, unverified grade, unknown load, pressure, safety-critical or electrical system."},
    teachBack:"Given two similar-looking screws, explain why matching the diameter alone cannot prove interchangeability.",
    guides:["repair-library","community-ledger"],blueprints:["supply-accountability"],sources:["osha_tools","osha_rule"]
  },
  {
    id:"printable-sign-holder",title:"Make a non-load-bearing printed label stand",category:"Fabrication",effort:"60–120 min + print time",review:"Community fabrication draft",
    summary:"Use a small parametric OpenSCAD file to fabricate a desktop label-holder base and record the exact size used.",
    scope:"Indoor dry desktop identification only, never food contact, safety signage mounting or a load-bearing fixture.",
    parts:["Available 3D printer used per manufacturer guidance","Suitable filament with documented printer compatibility","Ventilated/controlled printing area according to NIOSH risk guidance","Label/card stock and ruler","OpenSCAD source file from examples/label-holder.scad"],
    steps:[
      "Choose a stable, supervised printing area and review manufacturer and NIOSH controls for ultrafine particles, VOCs, burns and moving parts.",
      "Open examples/label-holder.scad using OpenSCAD. Check the five editable dimensions and their unit labels in millimeters.",
      "Adjust card width and thickness in the source; ensure the slot dimensions are larger than the actual measured card by a small appropriate clearance.",
      "Preview and render the model using standard OpenSCAD controls. Do not trust rendered geometry to establish printability or strength.",
      "Print with printer- and filament-specific safe settings, then allow the build plate and part to cool before handling.",
      "Place the holder on a tabletop, insert a paper/card label, check for tipping and sharp edges, and document dimensions and printer/material notes."
    ],
    checks:["Source file records dimensions in mm and produces a single unpowered tabletop part.","A test card fits without sharp edges and the stand remains stable on a level surface.","The printer location meets its safety plan and the printing task is supervised."],
    stop:["Never use this design for electrical enclosures, pressure vessels, drinking-water contact, structural brackets, emergency exit signage or life-safety functions.","3D printers can generate particles and chemical vapors and include hot/moving parts; follow NIOSH and manufacturer controls.","Do not use unknown resins, solvents or incompatible filament setups."],
    care:["Inspect the stand for cracks and deformation; recycle or retire damaged parts.","Keep the parametric source, print date, material and dimensions with the station's records."],
    compatibility:{measure:"Card width, card thickness, slot dimensions, material, printer and environment.",
      allowed:"Identical or tested adjusted holder for desktop signage under the same benign conditions.",
      forbidden:"Any safety-critical load, outdoor heat/UV assurance, electrical use or food/water contact."},
    teachBack:"Change one dimension in the source, print or preview, and explain why the new part still needs a physical fit check.",
    guides:["repair-library","learning-circle"],blueprints:["supply-accountability"],sources:["niosh_print","niosh_guide"]
  },
  {
    id:"usb-cable-spares",title:"Document and replace a damaged USB cable",category:"Energy",effort:"20–45 min",review:"Reference-informed draft",
    summary:"Identify a compatible manufacturer-rated cable and retire damaged cables instead of splicing or improvising wiring.",
    scope:"Replace intact detachable USB cables on low-voltage consumer equipment using the equipment's published requirements.",
    parts:["Device label/manual indicating port and power needs","Known-good manufacturer-rated replacement cable","Dry, clean surface with adequate lighting","Storage tags for damaged and compatible cables"],
    steps:[
      "Power down and disconnect the equipment using its manufacturer instructions. Examine the existing cable for cracks, loose connectors, exposed conductors and deformation.",
      "Read the device's connector type and power/data requirements. Similar connector shapes do not prove correct current rating, data capability or USB-PD behavior.",
      "Place damaged or unknown-rating cables in a DO NOT USE bin without testing a dangerous fault.",
      "Select a replacement whose manufacturer rating and features match the documented device requirements.",
      "Connect the intact cable without adapters or forced fit, then operate the equipment under supervision as directed by the manufacturer.",
      "Log the device ID, cable specification and any heat, intermittent operation or unusual behavior; disconnect if abnormal."
    ],
    checks:["Cable and device port are undamaged and mate without force.","Documented ratings and required data/power features are compatible.","Damaged cables are tagged and permanently removed from service."],
    stop:["Do not splice live USB, open battery packs, bypass overcurrent protection or connect USB devices to mains directly.","Stop for unusual warmth, smell, arcing, loose ports or swelling batteries.","USB connector matching alone is not proof of electrical or protocol compatibility."],
    care:["Inspect cable jackets and connectors before each use.","Keep spares dry and labeled by confirmed specifications, not color or shape."],
    compatibility:{measure:"Connector form, documented power rating, protocol/data function, cable length and device manual requirements.",
      allowed:"Commercial intact cable meeting all documented requirements.",
      forbidden:"Looks similar, unknown rating, improvised adapter, damaged port, mains or battery-pack modification."},
    teachBack:"Compare two USB-C cables and explain why identical connectors do not guarantee identical capabilities.",
    guides:["basic-light","repair-library"],blueprints:["supply-accountability"],sources:["osha_guide","osha_tools"]
  },
  {
    id:"tool-quarantine",title:"Inspect, tag and route a questionable hand tool",category:"Repair",effort:"30–60 min",review:"Reference-informed draft",
    summary:"Practice identifying damage and keeping tools out of circulation while a qualified repair or retirement decision is made.",
    scope:"Visual check and safe inventory control, not a guide to restoring tool strength or certifying repaired tools.",
    parts:["Known serviceable demonstration tool","Separate damaged/retired demonstration sample handled safely","DO NOT USE tags","Inspection log","Secured quarantine container"],
    steps:[
      "Select a safe visual inspection area and confirm the tool is unloaded or unpowered. Keep any sharp or damaged demonstration parts secured.",
      "Review handle, attachment, cracks, deformation, sharp burrs, rust and missing guards or fittings relevant to that tool's intended use.",
      "Mark any uncertain or defective sample DO NOT USE and move it to a separate controlled quarantine area.",
      "Record its identifier, observed issue and date without inventing a diagnosis of hidden structural integrity.",
      "Determine whether the manufacturer permits a specific part replacement and whether a competent technician is needed. If unknown, retire or keep quarantined.",
      "Have another volunteer demonstrate that the damaged item cannot be accidentally checked out."
    ],
    checks:["A damaged demonstration tool is clearly isolated from usable inventory.","The record describes observable symptoms, not unsupported safety certification.","An untrained volunteer cannot return a quarantined tool to service alone."],
    stop:["Do not strike, load-test, energize or attempt high-risk repair on damaged equipment.","Do not remove guards or use repaired tools without applicable inspection/approval by a competent person.","Compressed-air cleaning and improvised electrical or power-tool service are outside this exercise."],
    care:["Check condition before each tool is issued and after each return.","Keep records of maker instructions, service decisions, quarantine and final disposition."],
    compatibility:{measure:"Tool make/model, rated application, manufacturer part ID and wear/condition.",
      allowed:"Manufacturer-approved service component installed and checked by appropriately qualified personnel.",
      forbidden:"Unverified homemade safety part, missing guard, cracked handle or unknown service history."},
    teachBack:"Identify three visible defects and show exactly how to tag, log and isolate the example.",
    guides:["repair-library","learning-circle"],blueprints:["supply-accountability"],sources:["osha_tools","osha_rule"]
  },
  {
    id:"seed-tray-inserts",title:"Replace a low-risk nursery tray insert",category:"Growing",effort:"30–60 min",review:"Community draft",
    summary:"Match a replacement grow-tray insert by actual dimensions and drainage without changing the food or water safety assumptions.",
    scope:"Nonpressurized plant-starting trays on a stable, clean surface only.",
    parts:["Broken empty nursery tray for comparison","Caliper or ruler","Manufacturer-compatible replacement insert","Catch basin","Plant markers"],
    steps:[
      "Remove plants and media carefully; keep any contaminated or sharp-edged broken tray out of service.",
      "Measure overall length, width, depth, lip profile and drain-hole placement, recording units.",
      "Choose a clean, purpose-made insert with matching dimensions and intended use rather than cutting or melting unknown plastics.",
      "Seat the insert without force on its stable rack or catch tray; confirm it does not rock, overhang or obstruct pathways.",
      "Add a small amount of clean irrigation water and observe drainage into the catch tray, without creating a floor or electrical hazard.",
      "Mark replacement date and part type; dispose of cracked or unsuitable old plastic appropriately."
    ],
    checks:["The insert sits stably and doesn't leak onto walkways or electronics.","Drainage holes remain unobstructed and the catch tray contains the test water.","Replacement dimensions and its intended plant-growing use are documented."],
    stop:["Do not use unknown plastic waste with potential chemical contamination for edible plants.","Never add trays that leak toward electrical equipment or create slip hazards.","No claim is made about pressure rating, food-contact certification or bacterial sterilization."],
    care:["Inspect drainage, cracks and tray condition before planting.","Use clean approved inputs and track plant health, moisture and replacement history."],
    compatibility:{measure:"Length, width, depth, lip, support, drain layout and intended growing use.",
      allowed:"Matching purpose-made tray insert tested empty with controlled water.",
      forbidden:"Unknown contaminated plastic, pressure or heat use, unstable stand or obstructed drainage."},
    teachBack:"Record five dimensions/features and demonstrate the water catch test.",
    guides:["growing-food","repair-library"],blueprints:["seed-observation"],sources:["osha_tools","umn_seeds"]
  },
  {
    id:"dry-bin-seal-check",title:"Inspect a non-food dry storage bin lid and seal",category:"Storage",effort:"20–45 min",review:"Community draft",
    summary:"Identify wear and source an exact manufacturer-compatible closure for nonhazardous dry equipment storage.",
    scope:"Dry supplies only: labels, nonhazardous small parts and paper. Never potable water, food, hazardous chemicals or pressure.",
    parts:["Clean non-food dry-storage bin","Original lid or manufacturer documentation","Manufacturer-approved gasket/latch replacement if needed","Dry cloth, identification tags and paper log"],
    steps:[
      "Empty and inspect the bin in a dry, safe work area. Identify manufacturer/model and the exact nonhazardous storage use.",
      "Check lid, latch, hinge and gasket for cracks, tears, incomplete fit and missing components; do not assume the enclosure is waterproof.",
      "Record material, dimensions and maker part number when available. Reject substitutes of unknown chemical or dimensional compatibility.",
      "Fit only a manufacturer-confirmed closure or gasket using the maker's instructions without adhesives or unknown sealants.",
      "Close and reopen the lid by hand repeatedly without force, confirm no pinch points and check that the bin remains stable.",
      "Label the bin DRY STORAGE ONLY and document replacement date, part identifier and known limitations."
    ],
    checks:["The lid opens/closes without force and has no visible tears, gaps or damaged latch.","The part number or measured compatibility is recorded rather than assumed.","The bin is never labeled as waterproof, potable, pressure-rated or food-safe without separate certification."],
    stop:["Do not use this procedure for drinking-water vessels, sterile storage, hazardous material containment or pressured systems.","Do not replace unknown gasket materials on chemical containers or food-contact systems.","If a damaged latch could spill heavy/unsafe contents, take it out of service."],
    care:["Check closure and labeling when stored items are accessed.","Replace questionable parts only under the product's compatibility instructions."],
    compatibility:{measure:"Manufacturer/model, lid perimeter, fastening geometry, gasket cross-section and material.",
      allowed:"Exact approved closure for the same nonhazardous dry storage conditions.",
      forbidden:"Waterproof guarantee, food-contact, pressure or hazardous chemical sealing without qualified specification."},
    teachBack:"Identify the manufacturer part, verify a replacement fit and explain why a dry-storage gasket is not a potable seal.",
    guides:["repair-library","community-ledger"],blueprints:["supply-accountability"],sources:["osha_tools"]
  }
];

export const REPAIR_EVENT_KINDS=["inspection-recorded","quarantined","approved-part-installed","retired"];
