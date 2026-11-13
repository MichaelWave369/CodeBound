// Editable source of truth. Sources are links, not endorsements or certification.
// "reference-backed" means authoritative material supports core safety facts;
// "community-draft" means procedures still require specialist/local review.
export const SOURCES = {
  cdc_water: { title: "CDC · Make Water Safe in an Emergency", url: "https://www.cdc.gov/water-emergency/about/index.html" },
  cdc_supply: { title: "CDC · Create an Emergency Water Supply", url: "https://www.cdc.gov/water-emergency/about/how-to-create-and-store-an-emergency-water-supply.html" },
  cdc_hygiene: { title: "CDC · Prevent Diarrheal Illness After a Disaster", url: "https://www.cdc.gov/water-emergency/safety/" },
  who_sanitation: { title: "WHO · Sanitation Safety Planning, 2nd edition", url: "https://www.who.int/publications/i/item/9789240062887" },
  food_safety: { title: "FoodSafety.gov · Food Safety in a Disaster", url: "https://www.foodsafety.gov/keep-food-safe/food-safety-in-disaster-or-emergency" },
  cdc_power: { title: "CDC · Safety During a Power Outage", url: "https://www.cdc.gov/natural-disasters/response/what-to-do-protect-yourself-during-a-power-outage.html" },
  fema_kit: { title: "FEMA · Build an Emergency Kit", url: "https://www.fema.gov/print/pdf/node/503732" },
  epa_fish: {"title":"EPA · Fish and shellfish consumption safety","url":"https://www.epa.gov/choose-fish-and-shellfish-wisely/should-i-be-concerned-about-eating-fish-and-shellfish"},
  nccih_herbs: {"title":"NIH NCCIH · Dietary supplement safety and interactions","url":"https://www.nccih.nih.gov/health/tips/tips-what-consumers-need-to-know-about-dietary-supplements"},
  nps_ten: {"title":"NPS · The Ten Essentials (shelter and navigation)","url":"https://www.nps.gov/articles/10essentials.htm"},
  usgs_compass: {"title":"USGS · Finding Your Way with Map and Compass","url":"https://www.usgs.gov/educational-resources/finding-your-way-map-and-compass"},
  fema_power: {"title":"FEMA · Hazard safety sheets including power outages","url":"https://www.ready.gov/sites/default/files/2025-02/fema_full-suite-hazard-info-sheets.pdf"},
  umn_garden: {"title":"University of Minnesota Extension · Planting the vegetable garden (adapt locally)","url":"https://extension.umn.edu/planting-and-growing-guides/planting-vegetable-garden"}
};

export const GUIDES = [
  {
    id: "community-assessment", title: "Map people, needs, and safe places", category: "community", phase: "Stabilize", priority: 1, effort: "1–3 hours", review: "community-draft",
    summary: "Start with an accountable, consent-based snapshot of needs and useful skills, not a giant stockpile.",
    materials: ["Paper or offline notes", "Pencils and map", "Two volunteers", "Visible public meeting point"],
    steps: ["Select a safe, accessible meeting place and identify a backup.", "Ask residents what help they actually want; collect the minimum information needed.", "Mark immediate needs: water, urgent care, accessibility, shelter, heat/cold, and medication continuity.", "Assign a named contact and next check-in for each unresolved need; keep sensitive details private."],
    checks: ["The meeting place can be reached without a phone.", "Every high-priority request has an owner and a follow-up time.", "There is a way to correct or delete personal details."],
    cautions: ["Do not publish personal medical information, addresses, or vulnerability lists.", "Do not assume authority over other people or restrict freedom of movement."],
    sources: ["fema_kit"], depends: [], code: "A private, local-only needs board using redacted categories, task owner, and next-check date."
  },
  {
    id: "safe-water", title: "Make a safe drinking-water plan", category: "water", phase: "Stabilize", priority: 1, effort: "30–60 min plan", review: "reference-backed",
    summary: "Inventory safe water and calculate a minimum reserve before trying any improvised treatment.",
    materials: ["Food-grade containers", "Labels and marker", "Pot and heat source if needed", "Clean scoop or tap"],
    steps: ["Plan for at least 1 US gallon (3.8 L) per person per day for a minimum of 3 days; account separately for pets and extra heat or medical needs.", "Prefer sealed commercial bottled water or otherwise verified safe water.", "If microbes are the concern and bottled water is unavailable, filter cloudy water through a clean cloth, then bring clear water to a rolling boil for 1 minute, or 3 minutes above 6,500 ft elevation.", "Cool and store in clean, sanitized, tightly covered food-grade containers; mark dates and separate safe from untreated water."],
    checks: ["Inventory shows people, days, and daily shortfall.", "Every drinking container is sealed, dated, and marked safe or untreated.", "Water source, suspected contaminants, and treatment method are recorded."],
    cautions: ["Boiling, household disinfection, and ordinary filters do NOT make water with fuel, toxic chemicals, or radioactive contamination safe.", "A clear-looking source is not proof of potability; follow public health alerts."],
    sources: ["cdc_water", "cdc_supply"], depends: ["community-assessment"], code: "Use the included water planner. Treat its number as a minimum, not a universal safe allocation."
  },
  {
    id: "water-point", title: "Operate a shared water station", category: "water", phase: "Stabilize", priority: 1, effort: "Half day", review: "community-draft",
    summary: "Organize a clean dispensing area and transparent daily source log without inventing water quality.",
    materials: ["Verified safe water", "Covered food-grade vessel with tap", "Handwashing supplies", "Dispensing log", "Signs"],
    steps: ["Choose a clean, raised dispensing surface away from waste and runoff.", "Assign separate clearly labeled untreated and safe-water zones.", "Use a tap or clean dedicated pourer; never dip shared hands or dirty containers into safe water.", "Post hours, amount available, upstream water source, and any health advisories; clean contact surfaces routinely."],
    checks: ["A newcomer can distinguish potable from nonpotable supplies.", "The dispensing point does not allow hands or reused dirty cups into storage.", "There is a named operator and daily inventory count."],
    cautions: ["Do not label water safe unless sourced or treated and verified according to competent guidance.", "Water distribution should be equitable and accessible."],
    sources: ["cdc_water", "cdc_supply"], depends: ["safe-water", "community-assessment"], code: "Record date, source, volume in/out, responsible operator, and verification status in a local CSV."
  },
  {
    id: "handwashing", title: "Build a low-water handwashing station", category: "sanitation", phase: "Stabilize", priority: 1, effort: "1–2 hours", review: "community-draft",
    summary: "Provide soap, running safe water, and wastewater control where there is no working tap.",
    materials: ["Clean container with controllable spout", "Stable support", "Soap", "Catch basin", "Clean towels or air-dry area"],
    steps: ["Secure a clean spouted container at a reachable height, including for children and disabled users.", "Supply safe water and soap, with a visible method to turn water on without recontaminating clean hands.", "Put a catch basin under the outlet and route used water away from food areas and drinking-water sources.", "Post a refill, cleaning, and wastewater disposal rota."],
    checks: ["A person can wet, lather, rinse, and dry hands without using a shared standing bowl.", "Spillage does not collect near the station.", "Soap and refill water are available at each opening check."],
    cautions: ["Do not reuse greywater for drinking.", "Local wastewater and drainage rules vary; avoid unsafe discharge."],
    sources: ["cdc_hygiene", "who_sanitation"], depends: ["safe-water"], code: "A simple daily checklist with soap, refill volume, waste emptied, and responsible person."
  },
  {
    id: "sanitation-plan", title: "Separate waste and protect water", category: "sanitation", phase: "Stabilize", priority: 1, effort: "1-day assessment", review: "reference-backed",
    summary: "Create a sanitation risk map first; do not mistake a dug hole for a safe treatment system.",
    materials: ["Area map", "Signs", "Gloves and cleaning supplies", "Covered waste containers", "Local sanitation guidance"],
    steps: ["Map toilets, handwashing, waste storage, drainage, runoff, and nearby water sources.", "Identify where people can access existing functional and accessible toilets.", "Segregate sharps, medical waste, chemicals, and normal refuse; arrange trained collection where needed.", "Consult public-health and local sanitation specialists on containment, treatment, and legal disposal before constructing permanent facilities."],
    checks: ["No waste-handling activity threatens drinking-water collection.", "Facilities have soap, lighting, access, and maintenance owners.", "A disposal or collection plan exists for each waste category."],
    cautions: ["Untreated human waste can spread serious disease; don't give universal pit-latrine dimensions without site, flood, groundwater, and soil assessment.", "Wear appropriate protection and do not mix chemical cleaners."],
    sources: ["who_sanitation", "cdc_hygiene"], depends: ["community-assessment", "safe-water"], code: "Use a risk register: hazard, affected people, likelihood, mitigation, owner, review date."
  },
  {
    id: "food-hub", title: "Set up a safe community food hub", category: "food", phase: "Stabilize", priority: 1, effort: "Half day", review: "reference-backed",
    summary: "Inventory food, protect against spoilage, and distribute fairly before building production capacity.",
    materials: ["Clean dry shelves", "Sealed containers", "Thermometers", "Labels and date markers", "Allergen notices"],
    steps: ["Separate shelf-stable food from foods needing refrigeration; keep food away from floodwater, chemicals, and pests.", "Label contents, dates, and known allergens; use oldest safe food first.", "During an outage, keep refrigerator and freezer doors shut; a closed refrigerator generally holds safe temperatures about 4 hours, a full freezer about 48 hours.", "Discard unsafe perishables according to food-safety guidance, and record what is distributed and what remains."],
    checks: ["Every item has a location, quantity, and condition.", "Allergen and temperature-sensitive items are clearly marked.", "No one relies on smell or tasting to judge spoiled food safe."],
    cautions: ["If refrigerated perishables cannot be maintained safely, discard them; never taste to test safety.", "Food handling and nutrition need additional safeguards for infants and people with allergies."],
    sources: ["food_safety"], depends: ["community-assessment", "handwashing"], code: "Use the commons ledger for stock counts; don't store identifiable recipient histories by default."
  },
  {
    id: "growing-food", title: "Start a neighborhood seed-and-soil plot", category: "food", phase: "Sustain", priority: 2, effort: "Several weeks", review: "community-draft",
    summary: "Prototype a small, testable garden before depending on it for food security.",
    materials: ["Seeds appropriate to season", "Known clean soil or tested site", "Compost", "Mulch", "Watering can", "Plant markers"],
    steps: ["Check climate, sunlight, frost dates, seasonal rain, and available irrigation.", "Investigate past land uses and test potentially contaminated soil before growing edible crops.", "Start one small bed with region-appropriate fast-growing crops and accessible paths.", "Label sowing dates, spacing, waterings, germination, pests, and harvest weights to learn what works locally."],
    checks: ["Water demand fits the community supply plan.", "Planting records show what survived and yielded food.", "Seeds are reserved for the next planting where appropriate."],
    cautions: ["Food gardening is not an immediate substitute for emergency food stores.", "Avoid edible crops in untested contaminated soils."],
    sources: [], depends: ["safe-water", "food-hub"], code: "A CSV seed ledger with crop, variety, sow date, observed weather, germination, yield, and saved seed."
  },
  {
    id: "shelter-safety", title: "Organize a safe shelter check", category: "shelter", phase: "Stabilize", priority: 1, effort: "2–4 hours", review: "community-draft",
    summary: "Prioritize dry, accessible space, temperature protection, exits, and structural safety.",
    materials: ["Site map", "Flashlights", "Weather layers", "Exit signs", "Blankets", "CO detectors"],
    steps: ["Identify structurally sound existing shelter and accessible routes; avoid damaged buildings pending expert inspection.", "Separate sleep, sanitation, food, and fuel storage zones.", "Post exits and a reunification point; make space for mobility aids, families, and pets.", "Check ventilation, cooling or heat needs, and carbon monoxide detector coverage."],
    checks: ["Two safe ways out are identified wherever feasible.", "A person with mobility limitations can enter and use essential areas.", "Sleeping zones are not exposed to combustion exhaust or fuel storage."],
    cautions: ["Only qualified people should certify structural integrity.", "Never run generators or outdoor cooking devices indoors, in garages, or near openings."],
    sources: ["cdc_power", "fema_kit"], depends: ["community-assessment", "sanitation-plan"], code: "A facilities checklist with location, capacity, hazards, inspector, and last check date."
  },
  {
    id: "basic-light", title: "Assemble low-voltage lighting", category: "energy", phase: "Sustain", priority: 2, effort: "1–3 hours", review: "community-draft",
    summary: "Provide reliable task lighting using ready-made USB lights and a battery bank.",
    materials: ["Certified USB battery bank", "USB LED light", "Appropriate rated cable", "Power meter if available", "Dry storage case"],
    steps: ["Identify tasks that require light: first aid, exits, food, and sanitation.", "Choose compatible manufacturer-rated USB LED lights and a commercially built battery bank.", "Test continuous operation and recharge time without opening or modifying battery packs.", "Set a charging rota and label each light with location and custodian."],
    checks: ["Every priority area has a backup light and tested run time.", "No battery is hot, swollen, damaged, or exposed to wet conditions.", "Charging and evacuation routes remain free of trip hazards."],
    cautions: ["Do not improvise lithium battery packs, bypass fuses, or connect equipment to building mains.", "Fuel-powered generators must remain outdoors and far from occupied openings."],
    sources: ["cdc_power"], depends: ["shelter-safety"], code: "Energy budget = device watts × hours per day. Record measured, not guessed, performance."
  },
  {
    id: "communications", title: "Create redundant local communications", category: "communications", phase: "Stabilize", priority: 1, effort: "Half day", review: "community-draft",
    summary: "Use low-tech redundancy before adding radios and servers.",
    materials: ["Weatherproof bulletin board", "Paper and pens", "Battery radio", "Location and schedule signs", "Optional LAN router"],
    steps: ["Post a public information board at a known accessible place with date and source for every update.", "Set regular check-in times and a runner or buddy system for disconnected neighbors.", "Use a battery or hand-crank weather radio for official alerts where supported.", "If a LAN exists, host a read-only mirror of the atlas on a local device and post its address."],
    checks: ["A resident without a phone can receive key notices.", "Every public notice includes a timestamp, authoring group, and correction path.", "An offline fallback works when the router or power fails."],
    cautions: ["Do not transmit on licensed radio frequencies without authorization.", "Do not expose sensitive personal data on shared boards or open LANs."],
    sources: ["fema_kit"], depends: ["community-assessment"], code: "A timestamped notice feed: title, body, source, expires, correction link; export as static JSON."
  },
  {
    id: "health-point", title: "Set up a first-aid coordination point", category: "health", phase: "Stabilize", priority: 1, effort: "Half day", review: "community-draft",
    summary: "Make trained help easier to find without impersonating a clinic.",
    materials: ["First-aid kit", "Clean table and lighting", "Handwashing supplies", "Emergency contact list", "Privacy screens"],
    steps: ["Identify certified first-aid volunteers and reachable licensed clinicians.", "Use a visible location sign and clear hours while preserving privacy.", "Maintain hand hygiene, clean supplies, and a route for emergency transport or referral.", "Track kit contents and restock needs without recording diagnoses in a public ledger."],
    checks: ["An emergency referral process is known by volunteers.", "Expired supplies and dirty instruments are removed.", "Private conversations cannot easily be overheard at the public desk."],
    cautions: ["The atlas does not authorize medical procedures or replace formal training.", "Call available emergency services for life-threatening conditions."],
    sources: ["fema_kit", "cdc_hygiene"], depends: ["safe-water", "handwashing", "communications"], code: "Private supply counts only: gloves, bandages, sterile dressings, expiration dates, restock owner."
  },
  {
    id: "repair-library", title: "Open a repair and tool library", category: "repair", phase: "Sustain", priority: 2, effort: "1–2 days", review: "community-draft",
    summary: "Keep water containers, bicycles, hand tools, and equipment usable for longer.",
    materials: ["Catalog labels", "Shelves", "Basic hand tools", "PPE", "Maintenance cards"],
    steps: ["Start with a small, inspected collection of low-risk tools.", "Label condition, safety checks, owner permission, and borrow/return expectations.", "Create a maintenance log for damaged or missing parts.", "Establish supervised teaching sessions for safe repairs and recycling."],
    checks: ["Damaged tools are clearly quarantined and not lent out.", "Returns and maintenance are documented.", "Borrowing rules do not exclude people arbitrarily."],
    cautions: ["High voltage, gas appliances, pressurized systems, and structural repair need qualified professionals.", "Wear task-appropriate protective equipment."],
    sources: [], depends: ["community-assessment"], code: "Track asset ID, condition, date checked, loan status, and repair ticket in a local CSV."
  },
  {
    id: "community-ledger", title: "Build a transparent commons ledger", category: "code", phase: "Sustain", priority: 2, effort: "1–2 hours", review: "community-draft",
    summary: "Inventory tools and supplies using a local-only, exportable record; no cloud account needed.",
    materials: ["Phone or computer", "Printed backup", "Designated recorder", "Second reviewer"],
    steps: ["Agree on which resources belong in a shared inventory and which are private.", "Use the included local ledger to record item, quantity, unit, and non-sensitive notes.", "Export a dated JSON snapshot to a removable device; print a summary if needed.", "Have a second person reconcile physical counts and record differences."],
    checks: ["Data remains accessible without internet after initial caching.", "An exported file can be imported into another browser.", "Counts can be audited without revealing who needs assistance."],
    cautions: ["Browser storage can be cleared; export regularly.", "Do not use a public device to store names, health records, or personal addresses."],
    sources: [], depends: ["community-assessment", "communications"], code: "Included tested browser ledger; interchange schema codebound-ledger-v1."
  },
  {
    id: "learning-circle", title: "Run a community knowledge workshop", category: "education", phase: "Rebuild", priority: 3, effort: "Weekly", review: "community-draft",
    summary: "Turn instructions into shared capability with demonstrations, safety checks, and teach-back.",
    materials: ["Printed guides", "Safe demonstration tools", "Attendance board without private data", "Feedback notes"],
    steps: ["Ask the community which needed skills are missing and what language/accessibility support helps.", "Have a skilled instructor demonstrate a low-risk task and explain its hazards.", "Pair learners and use teach-back: each demonstrates and explains the acceptance checks.", "Record what failed, revise the guide, and share lessons with attribution."],
    checks: ["Participants can repeat a task and identify its safety limits.", "Instructions work without a network connection.", "The workshop offers an accessible way to ask corrections."],
    cautions: ["Do not teach hazardous operations without competent supervision.", "Respect consent and avoid making essential access conditional on attending."],
    sources: [], depends: ["communications", "repair-library"], code: "Versioned lesson records: guide ID, date, tested outcome, reviewer, follow-up."
  },
  {
    id: "local-council", title: "Create fair community decisions", category: "community", phase: "Rebuild", priority: 3, effort: "Ongoing", review: "community-draft",
    summary: "Make critical decisions visible, reversible, nonviolent, and open to challenge.",
    materials: ["Open meeting space", "Written agenda", "Decision log", "Accessibility plan", "Public notice board"],
    steps: ["Agree on voluntary participation, equal dignity, non-discrimination, and rules against coercion.", "Publish meeting times, agenda, and who is authorized to make which decisions.", "Record resource decisions, reasons, dissent, and a clear appeal or review date.", "Rotate stewardship where appropriate and check that vulnerable voices are not systematically excluded."],
    checks: ["Community members can inspect and correct public decisions.", "There is a way to challenge an unsafe or unfair allocation.", "Personal and private data are excluded from public records."],
    cautions: ["A community group does not gain legal or policing authority by publishing rules.", "Do not use resource access to compel labor, belief, or political allegiance."],
    sources: [], depends: ["communications", "community-ledger"], code: "Append-only public meeting log, versioned corrections, no personal data by default."
  },
  {
    id: "offline-node", title: "Host a tiny offline knowledge node", category: "code", phase: "Sustain", priority: 2, effort: "30–90 minutes", review: "community-draft",
    summary: "Share the atlas on a laptop or LAN with no account, database, cloud service, or build pipeline.",
    materials: ["Laptop or small computer", "USB storage", "Local network optional", "Web browser", "Repository copy"],
    steps: ["Download the repository while connectivity is available and copy it to redundant USB drives.", "From the repository root, run npm run dev on a trusted machine.", "On the host, open localhost:4173 and verify the guides and ledger work.", "For LAN use, configure an appropriate trusted static web server and local firewall policy; avoid exposing a writable service to the public internet."],
    checks: ["Browse and search after disconnecting internet.", "Export a ledger snapshot and import it elsewhere.", "A printed water plan is legible without CSS or a network."],
    cautions: ["The included development server binds only to 127.0.0.1, not the LAN.", "Service workers need a supported browser and a secure origin except localhost; data is not automatically synchronized."],
    sources: [], depends: ["communications"], code: "npm test && npm run dev; the app has no remote runtime dependencies."
  },
  {
    "id": "field-hunt-fish-harvest",
    "title": "Field skill: hunt, fish, and responsibly harvest food",
    "category": "food",
    "phase": "Sustain",
    "priority": 2,
    "effort": "Practice over several sessions",
    "review": "community-draft",
    "summary": "Learn lawful, humane, sustainable food gathering, identification and food-safety decisions before relying on wild food.",
    "materials": [
      "Current local rules, licenses and closures",
      "Notebook or printed species guide",
      "Trusted local instructor",
      "Handwashing and food-safe storage supplies"
    ],
    "steps": [
      "Check hunting/fishing seasons, land access, harvest limits and protected species with the relevant local authority before going out.",
      "Learn local fish and plant identification from a qualified guide; record uncertain species as DO NOT HARVEST or EAT.",
      "For fish, check the latest waterbody- and species-specific consumption advisory before keeping food; do not assume clear water means safe fish.",
      "Learn hygienic handling, temperature control and safe cooking from recognized food-safety guidance; log where each harvest came from.",
      "Practice a conservation-first trip with a licensed mentor; record what was observed, released and safely harvested."
    ],
    "checks": [
      "Current permissions, seasons and closures were checked",
      "No unidentified plant, mushroom, fish or animal was consumed",
      "Local fish advisories and food-handling steps were reviewed"
    ],
    "cautions": [
      "Do not eat an unknown wild plant or mushroom; poisonous look-alikes can be deadly.",
      "Fishing and hunting legality varies widely. This guide does not authorize taking wildlife, constructing traps or using weapons.",
      "Some contaminants remain in fish even after cooking; obey consumption advisories."
    ],
    "sources": [
      "epa_fish",
      "food_safety"
    ],
    "depends": [
      "food-hub",
      "safe-water"
    ],
    "code": "Field log: date, location region, species confidence, permits/closures, advisory reviewed, outcome; no precise sensitive habitat coordinates in public exports."
  },
  {
    "id": "field-purify-water",
    "title": "Field skill: assess and treat emergency drinking water",
    "category": "water",
    "phase": "Stabilize",
    "priority": 1,
    "effort": "1 hour drill",
    "review": "reference-backed",
    "summary": "Choose safe source water first; distinguish biological contamination from chemical or radiological contamination.",
    "materials": [
      "CDC water guidance printed beforehand",
      "Verified safe storage containers",
      "Clean filter cloth",
      "Pot/heat source or manufacturer-approved treatment product"
    ],
    "steps": [
      "Check local boil-water, do-not-drink and do-not-use advisories; prioritize sealed bottled or verified safe water.",
      "Reject any source suspected of containing fuel, pesticides, industrial chemicals or radioactive materials: basic boiling/disinfection cannot make it safe.",
      "If cloudy but not chemically contaminated, allow settling and pour off or filter through clean cloth to remove particles before disinfection.",
      "When boiling for germs, bring clear water to a rolling boil for 1 minute, or 3 minutes above 6,500 feet; let cool before handling.",
      "If boiling is impossible, follow current CDC instructions and the label for a properly specified treatment product, recognizing that filters and chemicals do not remove every hazard.",
      "Keep untreated and treated containers separate, sanitize storage and mark the treatment date."
    ],
    "checks": [
      "The suspected hazard and advisory were recorded",
      "Treatment time, method and elevation were checked against current CDC guidance",
      "Clean capped containers are labeled and stored away from untreated water"
    ],
    "cautions": [
      "A homemade sand/charcoal filter is not proof that water is drinkable.",
      "Do not improvise treatment doses from memory or mix cleaning chemicals.",
      "Use an alternate source for suspected toxic chemical or radiological contamination."
    ],
    "sources": [
      "cdc_water",
      "cdc_supply"
    ],
    "depends": [
      "safe-water"
    ],
    "code": "Treatment log: source, advisory, contamination concern, method, duration, storage, reviewer; no automatic safe-to-drink certification."
  },
  {
    "id": "field-natural-medicine-literacy",
    "title": "Field skill: natural medicine literacy and evidence-first first aid",
    "category": "health",
    "phase": "Stabilize",
    "priority": 1,
    "effort": "Ongoing review",
    "review": "reference-backed",
    "summary": "Preserve traditional plant knowledge while separating documented evidence, interactions and unknowns from emergency medical treatment.",
    "materials": [
      "Standard first-aid reference and training",
      "Clean first-aid kit",
      "Medication and allergy information kept privately",
      "Plant-identification references, not as permission to ingest"
    ],
    "steps": [
      "Learn recognized first aid, hygiene, CPR and emergency calling procedures from a qualified training organization.",
      "For each proposed herb or remedy, record exact species, part used, claim, evidence quality, known toxicity, interactions and publication date.",
      "Check whether supplements can interact with prescription or over-the-counter medicines, pregnancy or underlying conditions before considering use with a clinician.",
      "Keep potentially poisonous look-alikes and unsupported cure claims in a clearly marked DO NOT USE / NEEDS REVIEW section.",
      "Practice safe bandaging and basic first-aid simulations with training materials, not experimental treatment on injured people."
    ],
    "checks": [
      "Each claimed remedy carries an explicit evidence grade, not a blanket 'natural = safe' label",
      "Danger signs and emergency referral routes are printed",
      "No unverified herbal preparation is presented as a substitute for needed care"
    ],
    "cautions": [
      "Natural does not mean safe; some herbs are toxic or alter medicine effectiveness.",
      "Serious bleeding, breathing difficulty, stroke symptoms, severe infection or poisoning requires urgent professional help.",
      "Do not use wild plants for ingestion, wound care or animal treatment without qualified identification and appropriate evidence."
    ],
    "sources": [
      "nccih_herbs"
    ],
    "depends": [
      "health-point",
      "handwashing"
    ],
    "code": "Evidence card fields: species, proposed use, evidence level, contraindications, interactions, editor/reviewer and date."
  },
  {
    "id": "field-build-shelter",
    "title": "Field skill: choose and set up emergency shelter",
    "category": "shelter",
    "phase": "Stabilize",
    "priority": 1,
    "effort": "2-hour supervised practice",
    "review": "reference-backed",
    "summary": "Prioritize protection from weather, safe ground, ventilation and exits before improvising structures.",
    "materials": [
      "Weather information",
      "Insulation layers and ground pad",
      "Commercial tarp, tent or bivvy where available",
      "Light, whistle and safe water"
    ],
    "steps": [
      "Prefer a safe existing building or recognized shelter; avoid damaged structures and unstable trees.",
      "For temporary outdoor shelter, choose permitted ground clear of flood channels, rockfall, dead branches and fast-moving water.",
      "Use a commercial tarp or tent according to instructions, keep insulation between people and cold/wet ground, and provide adequate ventilation.",
      "Keep cooking equipment, fires, fuel and generators outside occupied spaces and away from windows and openings.",
      "Mark exits and a fallback location; practice taking down and packing the shelter in daylight."
    ],
    "checks": [
      "The site is not in a flood path or below dead limbs",
      "People can remain dry, warm/cool and able to exit",
      "No combustion exhaust can enter the shelter"
    ],
    "cautions": [
      "Do not enter or modify structurally damaged buildings without qualified assessment.",
      "Generator exhaust and indoor combustion can cause fatal carbon-monoxide poisoning.",
      "Local land-use rules, wildlife hazards and weather conditions can change rapidly."
    ],
    "sources": [
      "nps_ten",
      "fema_power"
    ],
    "depends": [
      "shelter-safety",
      "safe-water"
    ],
    "code": "Shelter check: forecast, land permission, ground hazards, dry-floor test, airflow, exits, responsible observer."
  },
  {
    "id": "field-grow-garden",
    "title": "Field skill: grow a food garden and save planting records",
    "category": "food",
    "phase": "Sustain",
    "priority": 2,
    "effort": "Several weeks to a season",
    "review": "reference-backed",
    "summary": "Make a small, repeatable food-growing system using clean soil, local planting dates and measured harvests.",
    "materials": [
      "Appropriate vegetable seed",
      "Known-safe soil and containers or beds",
      "Compost, mulch, tools and watering can",
      "Plant labels and notebook"
    ],
    "steps": [
      "Choose a sunny accessible site, confirm that soil is safe for food growing and identify a reliable source of irrigation.",
      "Consult a local cooperative extension planting calendar rather than copying another climate's planting dates.",
      "Choose a modest mix of regionally suitable crops; label sow date, seed variety, expected maturity and spacing.",
      "Keep soil evenly moist as appropriate, monitor pests and use locally recommended integrated-pest-management practices.",
      "Record actual germination, harvested food, water use and seeds saved to improve the next season."
    ],
    "checks": [
      "There is a season-specific planting plan",
      "The soil history and water source are understood",
      "Records show observations and yield rather than assuming success"
    ],
    "cautions": [
      "A garden takes time and is not an immediate substitute for stored food.",
      "Avoid crops in suspected contaminated soil; do not rely on unidentified wild fertilizers or pesticides.",
      "Crop dates in the linked Minnesota example are not universal: adapt locally."
    ],
    "sources": [
      "umn_garden",
      "cdc_water"
    ],
    "depends": [
      "growing-food",
      "safe-water"
    ],
    "code": "Garden CSV: crop, variety, planting date, season, soil check, irrigation, harvest, save-seed outcome."
  },
  {
    "id": "field-create-power",
    "title": "Field skill: calculate and safely supply small-scale backup power",
    "category": "energy",
    "phase": "Sustain",
    "priority": 2,
    "effort": "1-hour audit then supervised demo",
    "review": "reference-backed",
    "summary": "Start with lower demand, battery capacity and ready-made certified systems before attempting any electrical construction.",
    "materials": [
      "Device watt ratings and usage hours",
      "Calculator and notebook",
      "Certified portable power station or appropriate battery system",
      "Recharge source and carbon monoxide alarm"
    ],
    "steps": [
      "List critical loads such as lights, communication, refrigeration and necessary medical equipment; calculate watt-hours per day as watts multiplied by hours.",
      "Compare the daily need against a power source's usable capacity, charge time and manufacturer load limits; include a reserve and realistic conversion losses.",
      "Learn the roles of solar panel, charge controller, rated battery and inverter on a disconnected demonstration setup.",
      "Use manufacturer-approved equipment with compatible connectors, correct protective devices and dry ventilation; ask a qualified electrician for permanent wiring.",
      "Test a short simulated outage, document real runtime, and make a power-down priority list."
    ],
    "checks": [
      "Every priority load has a watt-hour estimate",
      "No overloaded cord or improvised mains connection is present",
      "Runtime and recharge checks were recorded under safe conditions"
    ],
    "cautions": [
      "Never backfeed a home outlet or improvise utility-panel wiring.",
      "Operate fuel generators only outdoors at least 20 feet from building openings, following official carbon monoxide guidance.",
      "Damaged lithium batteries, bad wiring, fuel heaters and hot equipment pose fire, shock and poisoning risks."
    ],
    "sources": [
      "fema_power",
      "cdc_power"
    ],
    "depends": [
      "basic-light",
      "communications"
    ],
    "code": "Energy worksheet: load watts × hours/day, battery nominal/usable Wh, efficiency assumptions, observed hours and recharge source."
  },
  {
    "id": "field-personal-safety",
    "title": "Field skill: self-defense through awareness, escape and de-escalation",
    "category": "safety",
    "phase": "Stabilize",
    "priority": 1,
    "effort": "30-minute drills",
    "review": "community-draft",
    "summary": "Protect life with prevention, clear boundaries, safe exits and nonviolent response before any physical confrontation.",
    "materials": [
      "Printed emergency contacts",
      "Home/field exits marked on a sketch",
      "Whistle, light and phone/radio if available",
      "Trusted practice partner"
    ],
    "steps": [
      "Identify situations and locations that make escape difficult; choose well-lit routes and avoid unnecessary confrontation.",
      "Practice confident boundary-setting, staying at a safe distance and leaving early when threatened.",
      "Set a simple check-in and meet-up plan with trusted people; agree on how to summon help if communications are unreliable.",
      "Practice moving toward a safe exit and contacting emergency services; use legitimate, supervised first-aid and personal-safety training.",
      "Review household doors, lights, alarms and animal transport routines to reduce preventable risk."
    ],
    "checks": [
      "Two safe exits or retreat options are identified where available",
      "The plan prioritizes getting away and seeking help",
      "No plan depends on confronting strangers, setting traps or taking vigilante action"
    ],
    "cautions": [
      "Do not escalate, pursue or retaliate; protecting life is more important than property.",
      "This is not a fighting course or legal advice; local laws and safety conditions differ.",
      "In an immediate threat, contact emergency services when possible."
    ],
    "sources": [
      "nps_ten",
      "fema_kit"
    ],
    "depends": [
      "community-assessment",
      "communications"
    ],
    "code": "Voluntary safety drill: scenario, early warning signs, safe exit, communications backup, follow-up; do not store personal victim profiles."
  },
  {
    "id": "field-navigate",
    "title": "Field skill: navigate without a network connection",
    "category": "navigation",
    "phase": "Sustain",
    "priority": 2,
    "effort": "1-hour outdoor practice",
    "review": "reference-backed",
    "summary": "Use a paper topo map, compass and planned checkpoints; treat GPS as a helpful backup rather than the only map.",
    "materials": [
      "Current paper topographic map",
      "Baseplate compass",
      "Pencil and waterproof note sheet",
      "Downloaded offline map if available"
    ],
    "steps": [
      "Before travel, mark start, destination, water, hazards, an alternate return route and a contact who knows the expected check-in.",
      "Read map scale, contour lines and prominent terrain features; identify the legend and map north.",
      "Orient map and compass, account for the map's magnetic declination, and take a bearing to a visible safe landmark.",
      "Walk a short known route using terrain features and fixed checkpoints, then reverse it without relying on cell service.",
      "Record errors and repeat in daylight until you can explain how to locate yourself and choose a safe return path."
    ],
    "checks": [
      "You can orient the map and explain magnetic versus true north",
      "You can identify two terrain landmarks and a return route",
      "A paper route and contingency contact exist without internet access"
    ],
    "cautions": [
      "Do not attempt high-risk terrain or unfamiliar backcountry solo as a first lesson.",
      "Offline maps can be old; check closures, weather and access before travel.",
      "Never depend on sun, stars or improvised methods alone when reliable navigation or rescue help is available."
    ],
    "sources": [
      "usgs_compass",
      "nps_ten"
    ],
    "depends": [
      "communications",
      "community-assessment"
    ],
    "code": "Route card: map edition, bearing/declination source, checkpoints, hazards, check-in plan, observed deviation."
  },
];

export const CATEGORIES = ["all", "water", "sanitation", "food", "shelter", "energy", "communications", "health", "repair", "education", "community", "code", "safety", "navigation"];
export const PHASES = ["all", "Stabilize", "Sustain", "Rebuild"];