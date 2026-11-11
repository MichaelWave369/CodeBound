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
  fema_kit: { title: "FEMA · Build an Emergency Kit", url: "https://www.fema.gov/print/pdf/node/503732" }
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
  }
];

export const CATEGORIES = ["all", "water", "sanitation", "food", "shelter", "energy", "communications", "health", "repair", "education", "community", "code"];
export const PHASES = ["all", "Stabilize", "Sustain", "Rebuild"];