// CodeBound v0.5: low-risk community station build sheets.
// Quantities are starter kits PER STATION, not guaranteed capacity per person.
// All plans are community drafts; follow product labels, local rules and professional guidance.
export const BUILD_SOURCES={
  cdc_water:{title:"CDC: Creating and storing an emergency water supply",url:"https://www.cdc.gov/water-emergency/about/how-to-create-and-store-an-emergency-water-supply.html"},
  cdc_storage:{title:"CDC: Safe water storage principles",url:"https://www.cdc.gov/global-water-sanitation-hygiene/about/about-safe-water-storage.html"},
  cdc_food:{title:"CDC: Keeping food safe after an emergency",url:"https://www.cdc.gov/food-safety/foods/keep-food-safe-after-emergency.html"},
  epa_compost:{title:"EPA: Composting at home",url:"https://www.epa.gov/recycle/composting-home"},
  umn_seeds:{title:"University of Minnesota Extension: Starting seeds indoors",url:"https://extension.umn.edu/garden-and-home/yard-and-garden/gardening-in-minnesota/starting-seeds-indoors"},
  ready_kit:{title:"FEMA Ready: Emergency supply kit checklist",url:"https://www.ready.gov/sites/default/files/2024-05/ready_supply-kit-checklist.pdf"},
  ready_plan:{title:"FEMA Ready: Make a plan",url:"https://www.ready.gov/plan"}
};

export const MATERIALS={
  labels:{name:"Waterproof labels",unit:"sheets"},
  marker:{name:"Permanent marker",unit:"items"},
  logbook:{name:"Paper logbook",unit:"items"},
  sign:{name:"Large-print safety/information sign",unit:"items"},
  clean_container:{name:"Food-grade, tight-lidded water container (new or known-safe)",unit:"items"},
  clean_tap:{name:"Manufacturer-compatible dispensing spout",unit:"items"},
  basin:{name:"Clean catch basin",unit:"items"},
  soap:{name:"Handwashing soap",unit:"bars"},
  rack:{name:"Stable, clean worktable or shelf",unit:"items"},
  disposable_towels:{name:"Clean single-use drying towels (starter pack)",unit:"packs"},
  fridge_thermo:{name:"Refrigerator/freezer appliance thermometer",unit:"items"},
  cooler:{name:"Insulated cooler with intact lid",unit:"items"},
  gelpack:{name:"Reusable frozen gel pack",unit:"items"},
  bin:{name:"Pest-resistant outdoor compost bin or managed collection vessel",unit:"items"},
  brown_bucket:{name:"Lidded dry-browns collection bucket",unit:"items"},
  green_bucket:{name:"Lidded greens collection bucket",unit:"items"},
  hand_spade:{name:"Hand garden spade or mixing tool",unit:"items"},
  gloves:{name:"Reusable garden/work gloves (pair)",unit:"pairs"},
  seed_tray:{name:"Clean nursery tray with drainage",unit:"items"},
  seed_mix:{name:"Fresh seed-starting mix (bag)",unit:"bags"},
  plant_tags:{name:"Plant markers (pack)",unit:"packs"},
  notebook:{name:"Notebook for observations",unit:"items"},
  clipboard:{name:"Clipboard or writing board",unit:"items"},
  notice_board:{name:"Weatherproof public notice board",unit:"items"},
  sheet_protectors:{name:"Weatherproof notice sleeves",unit:"items"},
  emergency_radio:{name:"Manufacturer-rated battery/hand-crank emergency radio",unit:"items"},
  spare_battery:{name:"Compatible replacement battery set (per manufacturer)",unit:"sets"},
  pens:{name:"Pen set",unit:"sets"}
};

export const BUILD_SHEETS=[
  {
    id:"water-label-bench",title:"Verified-water storage and labeling bench",domain:"Water",
    duration:"60–90 minutes",review:"Reference-informed draft",
    summary:"Create a clearly separated area for verified-safe drinking water and uncertain water without pretending a label proves potability.",
    makes:"One identification and inventory station; no stated treatment or population capacity.",
    materials:[{id:"rack",quantity:1},{id:"clean_container",quantity:2},{id:"labels",quantity:2},{id:"marker",quantity:1},{id:"logbook",quantity:1},{id:"sign",quantity:2}],
    tools:["Clean cloth for surface cleaning","Source/advisory information","Copy of CDC water-storage guidance"],
    steps:[
      "Choose a dry, accessible area away from fuel, pesticides, runoff and waste. Clean the work surface before moving containers onto it.",
      "Inspect each water container; reject any container previously used for toxic chemicals or with an uncertain prior use. Use appropriate food-grade vessels and manufacturer-approved caps.",
      "Create visibly separate VERIFIED-SAFE and NOT VERIFIED zones. Labeling is an inventory control and does not independently establish safety.",
      "Record the date, known source, any official drinking-water advisory and the status of each container; leave unknown water marked NOT VERIFIED.",
      "For containers being filled, follow current CDC cleaning/sanitizing and safe filling directions exactly instead of improvising disinfectant concentrations.",
      "Have a second volunteer identify the status of all containers without explanation and correct any confusing labels."
    ],
    checks:[
      "Every container has an unmistakable status, source and date or is clearly marked NOT VERIFIED.",
      "None of the containers has a known toxic-chemical history or an unsafe seal.",
      "Volunteers can find the current local water advisory and refuse unverified water for drinking."
    ],
    stop:[
      "Do not serve untested/uncertain water as potable; boiling does not remove most chemical contaminants.",
      "Do not use containers previously exposed to bleach, pesticides, petroleum or other toxic chemicals.",
      "Water-quality claims require appropriate authority, testing or documented source verification."
    ],
    maintenance:["Check labels, seals and source advisories at each service period.","Follow CDC storage dates, replacement/rotation guidance and safe dispensing practice."],
    handoff:"Explain source verification, where the unverified zone is, and how to correct a dated log.",
    dependencies:["safe-water","water-point"],
    sources:["cdc_water","cdc_storage"],
    diagram:["SOURCE VERIFIED","SEGREGATE + LABEL","RECHECK STATUS"]
  },
  {
    id:"handwashing-point",title:"Small handwashing and wastewater station",domain:"Sanitation",
    duration:"60–120 minutes",review:"Community draft",
    summary:"Build an accessible low-water handwashing point using commercial spouted parts, soap and controlled collection.",
    makes:"One handwashing practice station; no claim about required flow rate or daily users.",
    materials:[{id:"rack",quantity:1},{id:"clean_container",quantity:1},{id:"clean_tap",quantity:1},{id:"basin",quantity:1},{id:"soap",quantity:2},{id:"disposable_towels",quantity:1},{id:"sign",quantity:1},{id:"logbook",quantity:1}],
    tools:["Stable fasteners/stand appropriate to the commercial vessel","Safe fill water","Local wastewater disposal guidance"],
    steps:[
      "Select a level and accessible location with a stable support and room for the wastewater basin; keep it away from food handling and safe drinking-water storage.",
      "Use an intact compatible spout with a container intended for water; do not cut, drill or alter pressure vessels.",
      "Place and test the catch basin so runoff does not reach paths, wells or nearby water collection points.",
      "Provide soap, safe water where required for hand hygiene, and a way to dry hands cleanly; label the station clearly.",
      "Practice wetting, lathering, rinsing and drying hands while recording whether the basin overflows or the stand tips.",
      "Post a refill, cleaning and lawful wastewater disposal schedule, then assign a person to check supplies."
    ],
    checks:[
      "The station is stable and reachable without a trip hazard.",
      "Soap, a functioning spout and clean drying materials are available.",
      "Wastewater is captured and disposed of according to local guidance rather than allowed to reach safe water."
    ],
    stop:[
      "Never direct greywater toward drinking-water storage, wells or food preparation areas.",
      "Do not use improvised plumbing connected to mains or drainage systems without competent approval.",
      "If supplied water is under a health advisory, follow the precise local hygiene guidance."
    ],
    maintenance:["Inspect stability, soap, refill and wastewater levels before use.","Empty/dispose of wastewater safely and clean touch surfaces on an assigned schedule."],
    handoff:"Have another person refill, use, empty and log the station without guessing where water should go.",
    dependencies:["handwashing","sanitation-plan"],
    sources:["cdc_water","ready_plan"],
    diagram:["SAFE WATER + SOAP","SPIGOT + WASH","COLLECT WASTEWATER"]
  },
  {
    id:"cold-food-check",title:"Cold-food temperature monitoring kit",domain:"Food",
    duration:"45–75 minutes",review:"Reference-informed draft",
    summary:"Set up refrigerator/cooler temperature observation and a dated decision log for perishable foods.",
    makes:"One monitoring kit; not refrigeration equipment and not proof of food safety.",
    materials:[{id:"fridge_thermo",quantity:2},{id:"cooler",quantity:1},{id:"gelpack",quantity:4},{id:"logbook",quantity:1},{id:"marker",quantity:1},{id:"labels",quantity:1},{id:"sign",quantity:1}],
    tools:["CDC food-disaster guidance","A reliable clock","Freezer or frozen cold packs if available"],
    steps:[
      "Place manufacturer-appropriate thermometers in the refrigerator and freezer or cooler, and confirm that each thermometer can be read.",
      "Label the log with appliance ID, time/date, temperatures and the responsible checker; note that a temperature reading cannot undo an unknown period of unsafe storage.",
      "During outages keep doors shut as much as possible and record the outage start time; use current CDC guidance for 4-hour refrigeration and 24/48-hour freezer windows.",
      "If using a cooler, use ice or frozen gel packs to help maintain 40°F (4°C) or below; check and record temperatures rather than assuming the cooler is safe.",
      "Mark questionable foods for disposal/review and keep them away from foods confirmed suitable for use.",
      "Have a second person practice reading the temperatures and explaining when to discard food rather than tasting it."
    ],
    checks:[
      "A thermometer reading and outage timeline are recorded with dates.",
      "A volunteer can locate CDC decision guidance and does not use smell or taste as a safety test.",
      "Perishable food that cannot be confirmed safe is not distributed."
    ],
    stop:[
      "Do not treat a cooler, ice pack or thermometer as a guarantee of food safety.",
      "Do not taste suspect food; discard food according to official guidance if safe time/temperature is unknown.",
      "The kit does not substitute for a food-service temperature monitoring or HACCP program."
    ],
    maintenance:["Replace damaged thermometers and verify function per manufacturer.","Review logs and replenish frozen packs before an expected outage."],
    handoff:"Read the log, explain time/temperature limitations and identify where official food disposal guidance is kept.",
    dependencies:["food-hub","community-ledger"],
    sources:["cdc_food"],
    diagram:["TIME + TEMPERATURE","RECORD CONDITION","USE / DISCARD BY GUIDANCE"]
  },
  {
    id:"compost-learning",title:"Small backyard compost learning station",domain:"Growing",
    duration:"90 minutes setup; months to mature",review:"Reference-informed draft",
    summary:"Create a managed demonstration that separates appropriate organic inputs and observes moisture, air and pests.",
    makes:"One noncommercial teaching compost setup; not pathogen-validated compost or a waste-treatment service.",
    materials:[{id:"bin",quantity:1},{id:"brown_bucket",quantity:1},{id:"green_bucket",quantity:1},{id:"hand_spade",quantity:1},{id:"gloves",quantity:1},{id:"sign",quantity:1},{id:"notebook",quantity:1}],
    tools:["Suitable outdoor, well-drained site","Dry leaves or untreated woody browns","Plant scraps/coffee grounds suitable under EPA guidance"],
    steps:[
      "Check local rules and choose an outdoor, accessible and well-drained site away from floodwater and unsafe runoff, with adequate pest control.",
      "Place a pest-resistant compost bin or suitable pile boundary and set up separate lidded containers for carbon-rich browns and acceptable plant-based greens.",
      "Post a clear exclusion list for meat, fish, dairy, fats, pet waste and cat litter, treated or diseased plants and other EPA-prohibited backyard inputs.",
      "Start with coarse browns for airflow, mix roughly two to three volumes of browns per volume of greens per EPA guidance and cover new food scraps with additional browns.",
      "Observe moisture, odor, pest access and aeration. Maintain moisture comparable to a wrung-out sponge and turn occasionally as appropriate.",
      "Record dates, input types and observations; do not apply unfinished, contaminated or unassessed compost to food crops."
    ],
    checks:[
      "Participants can sort example browns, greens and prohibited materials correctly.",
      "The station has a cover/management plan against rodents and runoff.",
      "The dated notebook records inputs, moisture observations and a maintenance owner."
    ],
    stop:[
      "Do not add pet waste, cat litter, meat, dairy, oils, herbicide-treated material or suspected contaminated scraps.",
      "Do not promise pathogen destruction or claim that an ordinary backyard pile sterilizes waste.",
      "Follow local organics and pest regulations before operating a shared community collection."
    ],
    maintenance:["Check pests, odor, waterlogging and coverings on a regular schedule.","Wait for mature, appropriately managed material before garden use; seek local extension help if unsure."],
    handoff:"Sort six sample materials and explain the smell, moisture and pest warning signs.",
    dependencies:["growing-food","sanitation-plan"],
    sources:["epa_compost"],
    diagram:["SORT INPUTS","BROWNS + GREENS","OBSERVE + CURE"]
  },
  {
    id:"seed-observation",title:"Seed inventory and germination record desk",domain:"Growing",
    duration:"60 minutes setup; ongoing observations",review:"Reference-informed draft",
    summary:"Make seed identity and viability experiments repeatable instead of relying on someone remembering what was planted.",
    makes:"One recordkeeping desk; not a crop-yield guarantee or a germination certification lab.",
    materials:[{id:"seed_tray",quantity:1},{id:"seed_mix",quantity:1},{id:"plant_tags",quantity:1},{id:"marker",quantity:1},{id:"notebook",quantity:1},{id:"clipboard",quantity:1},{id:"labels",quantity:1}],
    tools:["Known crop seed packets","Access to suitable water and light","Local planting calendar"],
    steps:[
      "Record crop, variety, packet source and labeled expiration/harvest information where available.",
      "Prepare clean draining trays and identify each cell or row with crop and sowing date.",
      "Plant a recorded count of seeds using the packet's depth and light requirements rather than one universal seed depth.",
      "Keep trays appropriately moist and separated from electronics, and record temperature or light observations when possible.",
      "At an appropriate crop-dependent interval, count seedlings emerged and record the numerator and number sown; keep failed tests in the log.",
      "Use the evidence to choose the next small planting trial; do not guarantee yields from a single germination test."
    ],
    checks:[
      "Another person can connect a tray to its dated seed source and sown count.",
      "Germination observations distinguish seeds sown from seedlings emerged.",
      "A saved copy of the records exists on paper or a device that can operate offline."
    ],
    stop:[
      "Do not use contaminated soil or unverified irrigation water for edible crops.",
      "Do not treat one short test as a forecast of community food production.",
      "Keep seeds and growing media away from children and animals where they could be swallowed."
    ],
    maintenance:["Check moisture, light and labeling daily according to crop needs.","Retain both successful and failed runs as useful local evidence."],
    handoff:"Ask a learner to locate a variety, plant and label one cell, and explain how to calculate a basic germination fraction.",
    dependencies:["growing-food","learning-circle"],
    sources:["umn_seeds"],
    diagram:["IDENTIFY SEEDS","PLANT + LABEL","COUNT + RECORD"]
  },
  {
    id:"supply-accountability",title:"Paper-first shared-supply accountability desk",domain:"Community",
    duration:"60 minutes setup; recurring reviews",review:"Community draft",
    summary:"Use simple identifiers, aggregate counts and dated checks so shared supplies can be found and replenished fairly.",
    makes:"One supply record point; the template is not a rationing mandate or public authority.",
    materials:[{id:"rack",quantity:1},{id:"clipboard",quantity:2},{id:"logbook",quantity:1},{id:"marker",quantity:2},{id:"labels",quantity:2},{id:"sign",quantity:1},{id:"pens",quantity:1}],
    tools:["Safe public storage area","A second count reviewer","Clear voluntary access and privacy rules"],
    steps:[
      "Agree on which items are part of the shared stock and who may correct a count; record volunteer permission instead of assuming ownership.",
      "Create a record with item ID, item name, unit, quantity, source, condition, last check date and next review owner.",
      "Label shelves and packages with their ID; do not attach names, medical histories or private addresses to publicly visible stock.",
      "Practice receiving one item, withdrawing one item and correcting a mistaken count, always recording the dated change.",
      "Have a second person reconcile the ledger with the physical count and investigate any difference.",
      "Keep an offline copy and publish only non-sensitive aggregate totals and a correction process."
    ],
    checks:[
      "Physical sample count matches the dated paper ledger after a practice transaction.",
      "A second reviewer can make and date a transparent correction.",
      "No private recipient information or coercive participation requirement appears on the board."
    ],
    stop:[
      "Never make essential access contingent on forced labor, political belief or joining a group.",
      "Do not claim official disaster authority or publish individual vulnerabilities.",
      "Do not treat estimated quantities as measured stock."
    ],
    maintenance:["Reconcile priority items at a schedule chosen by the community.","Keep separate backups and correct errors without silently changing history."],
    handoff:"Have a learner find a labeled item, record a practice withdrawal and explain the review process.",
    dependencies:["community-ledger","local-council"],
    sources:["ready_kit","ready_plan"],
    diagram:["LABEL ITEMS","COUNT + RECORD","VERIFY + CORRECT"]
  }
];
