// CodeBound 72-hour community response cards.
// Timelines are organizational prompts, not clinical triage or official response schedules.
// Safety facts are grounded in the listed primary public health / emergency sources.
// Each card remains a reviewable draft, NOT an emergency authority directive.
export const RESPONSE_SOURCES = {
  cdc_supply: { title: "CDC: Store a safe emergency water supply", url: "https://www.cdc.gov/water-emergency/about/how-to-create-and-store-an-emergency-water-supply.html" },
  cdc_treatment: { title: "CDC: Make water safe in an emergency", url: "https://www.cdc.gov/water-emergency/about/index.html" },
  cdc_hygiene: { title: "CDC: Hygiene during emergencies", url: "https://www.cdc.gov/water-emergency/safety/guidelines-for-personal-hygiene-during-an-emergency.html" },
  cdc_food: { title: "CDC: Keep food safe after an emergency", url: "https://www.cdc.gov/food-safety/foods/keep-food-safe-after-emergency.html" },
  cdc_power: { title: "CDC: Protect yourself during a power outage", url: "https://www.cdc.gov/natural-disasters/response/what-to-do-protect-yourself-during-a-power-outage.html" },
  cdc_co: { title: "CDC: Carbon monoxide risks during outages", url: "https://www.cdc.gov/natural-disasters/psa-toolkit/avoiding-carbon-monoxide-poisoning.html" },
  cdc_damage: { title: "CDC: Safe cleanup and damaged buildings", url: "https://www.cdc.gov/natural-disasters/safety/" },
  fema_plan: { title: "FEMA Ready: Make a plan", url: "https://www.ready.gov/plan" },
  fema_comms: { title: "FEMA Ready: Get tech ready", url: "https://www.ready.gov/get-tech-ready" },
  fema_alerts: { title: "FEMA Ready: Emergency alerts", url: "https://www.ready.gov/alerts" },
  fema_volunteer: { title: "FEMA Ready: Get involved and trained", url: "https://www.ready.gov/get-involved" }
};

export const RESPONSE_WINDOWS = [
  { id: "immediate", name: "First 2 hours", caption: "Check danger, listen to official alerts, protect people." },
  { id: "first-day", name: "2–24 hours", caption: "Stabilize safe essentials and communicate clearly." },
  { id: "following-days", name: "24–72 hours", caption: "Review supplies, adapt, and document next needs." }
];

export const RESPONSE_PLANS = [
  {
    id: "water-disruption", title: "Water stops or becomes unsafe", category: "Water", severity: "Critical", review: "reference-backed starter",
    summary: "Separate water service failure from a contamination advisory. Keep safe drinking water safe while confirming local instructions.",
    trigger: "No running water, a boil-water or do-not-drink advisory, or suspected contamination.",
    first: [
      "Check official water-utility and local health notices. Different advisories require different actions. Record the specific advisory and timestamp.",
      "Set aside unopened bottled water or another verified safe supply for drinking, cooking and toothbrushing. Label any uncertain water 'NOT VERIFIED'.",
      "Estimate a minimum emergency supply of 1 US gallon per person per day for at least 3 days; plan extra for heat, illness and pets.",
      "Use water only as directed by the local health department. If water may contain fuel, toxic chemicals or radioactive material, boiling or disinfecting will NOT make it safe."
    ],
    day: [
      "Inventory known-safe water in sealed food-grade containers. Separate it from untreated water in labeled locations.",
      "Establish a clean handwashing option and avoid cross-contaminating safe storage. Assign a sanitation check owner.",
      "If biological contamination is the issue and local guidance allows boiling, bring clear water to a rolling boil for 1 minute, or 3 minutes above 6,500 feet; cool and store covered."
    ],
    next: [
      "Compare remaining safe water with the next 72 hours' needs and arrange verified replenishment early.",
      "Keep a dated public notice of the current advisory, authoritative source, available dispensing point and next update.",
      "Do not declare a water source safe just because it looks, tastes or smells normal. Follow local clearance instructions."
    ],
    tools: ["Known-safe water", "Food-grade storage", "Marker and labels", "Water inventory sheet", "Clean soap and dispensing equipment"],
    verify: ["Every water container is clearly classified as safe or unverified.", "People know the current advisory and where to find confirmed safe water.", "Daily inventory has a recorded owner and update time."],
    escalate: ["Suspected chemical or fuel contamination", "No safe water available for essential drinking needs", "People showing serious dehydration or other medical emergencies"],
    guides: ["safe-water", "water-point", "handwashing"],
    sourceIds: ["cdc_supply", "cdc_treatment", "cdc_hygiene"]
  },
  {
    id: "power-outage", title: "The electrical grid goes down", category: "Energy", severity: "Critical", review: "reference-backed starter",
    summary: "Prevent carbon monoxide, fire and food-safety hazards while keeping essential communication and medical needs supported.",
    trigger: "Loss of utility power to a home, shared building or neighborhood.",
    first: [
      "Check for immediate hazards and follow utility and emergency alerts. Use flashlights rather than flames when practical.",
      "If safe, note the outage start time. Keep refrigerator and freezer doors closed.",
      "Never run generators, grills, camping stoves or fuel-burning equipment indoors, in a garage, camper, tent or near openings. Place portable generators outside at least 20 feet from doors, windows and vents, exhausting away from buildings.",
      "Identify essential medical equipment or temperature-dependent medications and contact the relevant care provider or emergency service for a safe alternative."
    ],
    day: [
      "Keep communication devices charged from manufacturer-approved battery banks and reduce unnecessary power use.",
      "Track food temperatures and outage time. An unopened refrigerator keeps food cold for about 4 hours; a full freezer about 48 hours or a half-full freezer about 24 hours.",
      "Plan safe heating or cooling, accessible lighting, and a shelter alternative if indoor conditions become dangerous."
    ],
    next: [
      "Reassess safe food and medicine conditions as power remains unavailable; follow health guidance rather than taste or smell.",
      "Arrange charging/check-in schedules and stock checks; rotate battery lighting without modifying lithium cells.",
      "When power returns, inspect visible damage and refer unsafe wiring, flooding or gas issues to qualified professionals."
    ],
    tools: ["LED lights", "Battery radio", "Rated battery banks", "Food thermometer", "Outage log", "CO detector"],
    verify: ["Every occupied space has a safe route and light source.", "Generators and combustion devices are not operating in or near occupied openings.", "Perishable food has a documented decision based on time, temperature and current guidance."],
    escalate: ["CO alarm, severe headache, dizziness or suspected poisoning", "Electrical arcing, gas leak, or fire", "Medical equipment cannot operate safely", "Dangerous indoor heat or cold"],
    guides: ["basic-light", "shelter-safety", "food-hub", "communications"],
    sourceIds: ["cdc_power", "cdc_food", "cdc_co"]
  },
  {
    id: "food-safety", title: "Food storage or refrigeration fails", category: "Food", severity: "High", review: "reference-backed starter",
    summary: "Preserve safe food, identify what must be discarded and prevent contaminated food from reaching neighbors.",
    trigger: "Extended loss of refrigeration, suspected floodwater contact, or breakdown of shared food storage.",
    first: [
      "Record the power-off or refrigeration-failure time. Keep cold storage closed while you assess options.",
      "Separate shelf-stable goods from perishable foods, flood-exposed items and items of unknown condition.",
      "Never taste food to test safety. If food was touched by floodwater or sewage, follow official disposal guidance."
    ],
    day: [
      "Use accurate thermometers. Without another cold source, discard perishable refrigerator items after 4 hours without power, consistent with public-health advice.",
      "A full unopened freezer may keep food safe about 48 hours (24 hours if half-full); when thawed, evaluate ice crystals and temperatures using the CDC guidance.",
      "If available, place perishable foods in a cooler and keep at 40°F (4°C) or below with ice; log temperature and label contents and allergens."
    ],
    next: [
      "Inspect each food item or batch against authoritative food-safety guidance; discard uncertain perishables.",
      "Publish aggregate safe stock counts, not recipient medical or household histories.",
      "Replenish shelf-stable, nutritionally appropriate supplies and mark allergens and dates."
    ],
    tools: ["Food thermometer", "Cooler and ice if available", "Labels", "Dry storage bins", "Stock log"],
    verify: ["Unsafe and safe food are physically segregated.", "Perishables have reliable temperature/outage logs or are discarded according to guidance.", "No donated food is distributed solely on the basis of appearance or smell."],
    escalate: ["Suspected food poisoning or severe symptoms", "Floodwater or chemical contamination of food", "No safely edible food for people with urgent nutritional needs"],
    guides: ["food-hub", "community-ledger", "handwashing"],
    sourceIds: ["cdc_food", "cdc_power"]
  },
  {
    id: "communications-loss", title: "Internet and mobile service disappear", category: "Communications", severity: "High", review: "community-draft",
    summary: "Use public notices, agreed check-in points and official radio alerts without collecting unnecessary personal data.",
    trigger: "Mobile, internet or broadband service unavailable or unreliable.",
    first: [
      "If available, check NOAA weather radio, local emergency radio or other official alert channels. Do not mistake an absence of messages for an all-clear.",
      "Confirm a safe, accessible meeting point with a backup and a visible paper notice board.",
      "Write the date, local time, source and uncertainty on every notice; use paper or offline notes if necessary."
    ],
    day: [
      "Schedule periodic check-ins, including an accessible method for residents without smartphones.",
      "If texting works intermittently, use short messages rather than repeated voice calls; preserve mobile battery charge.",
      "Assign named volunteers to verify public information, update the board and correct inaccurate notices."
    ],
    next: [
      "Make redundant copies of essential public instructions. Leave private health data and addresses off public boards.",
      "Practice the paper fallback even if a local LAN is available; electronic services may also lose power.",
      "Document unresolved communication gaps and seek trained communications volunteers; comply with radio licensing rules."
    ],
    tools: ["Public notice board", "Paper, pens and dates", "Battery radio", "Charged phone and battery bank", "Accessible check-in location"],
    verify: ["A person without connectivity can find where and when verified updates appear.", "Notices are timestamped and attributed.", "A correction owner and paper backup exist."],
    escalate: ["An evacuation or shelter alert cannot reach people at immediate risk", "Emergency contact or transport needed for life-threatening situation", "Public notices contain unsafe false instructions"],
    guides: ["communications", "offline-node", "community-assessment"],
    sourceIds: ["fema_plan", "fema_comms", "fema_alerts"]
  },
  {
    id: "shelter-displacement", title: "Shelter becomes unsafe or inaccessible", category: "Shelter", severity: "Critical", review: "community-draft",
    summary: "Move toward officially designated safe shelter or verified alternatives while preserving accessibility and privacy.",
    trigger: "Building damage, dangerous temperatures, evacuation order or loss of essential access.",
    first: [
      "Follow evacuation orders and official routes. Do not enter damaged buildings until authorized inspectors say they are safe.",
      "If gas is suspected, leave promptly, avoid switches and flames, and contact authorities from a safe distance.",
      "Identify an accessible safe location and routes for children, older adults, mobility aids, pets and service animals."
    ],
    day: [
      "Maintain separation of sleeping, sanitation, food and fuel areas; identify exits and an outdoor meeting point.",
      "Check for safe temperature, weather exposure, hygiene, drinking water, lighting and a way to request help.",
      "Direct people toward verified shelters and public services rather than promising an uninspected location is safe."
    ],
    next: [
      "Reassess shelter capacity, accessibility, weather changes and sanitation needs at regular check-ins.",
      "Keep private needs confidential, document only what is necessary and offer a way to withdraw information.",
      "Coordinate trained structural, electrical and medical assessments where required."
    ],
    tools: ["Official shelter information", "Map and exit plan", "Flashlights", "Water and first-aid supplies", "Warmth/cooling supplies"],
    verify: ["Each assigned location has accessible exits and an identified emergency contact.", "No fuel-burning cooking or generator devices are used in occupied indoor areas.", "Shelter location and current availability are verified, not assumed."],
    escalate: ["Structural damage, gas leak or flooding", "Unlivable temperatures or immediate injury", "Inability to evacuate someone safely"],
    guides: ["shelter-safety", "handwashing", "health-point", "communications"],
    sourceIds: ["cdc_damage", "cdc_power", "fema_plan"]
  },
  {
    id: "neighborhood-coordination", title: "Organize a voluntary neighborhood response", category: "Community", severity: "High", review: "community-draft",
    summary: "Create a small, transparent support loop that works without a database or command hierarchy.",
    trigger: "Neighbors have unmet needs after a local emergency and normal services are disrupted.",
    first: [
      "Choose a safe public gathering point and ask for voluntary participation; don't interfere with professional responders.",
      "Create an anonymous or minimal-information needs board with categories: water, medication continuity, mobility, shelter, communication and supplies.",
      "Identify the highest immediate risks and refer emergencies to available trained services rather than self-assigning medical procedures."
    ],
    day: [
      "Assign an owner, timestamp and next review time to each public task, respecting people's consent.",
      "Record aggregate inventory and source of information. Use a second person to check supplies and address errors.",
      "Provide an accessible non-digital update process; share verified facts and distinguish them from rumors."
    ],
    next: [
      "Hold a brief daily review of resolved, blocked and newly urgent needs; offer corrections and appeals.",
      "Rotate volunteer duties, avoid coercion and prevent access to food or water from depending on participation.",
      "Share lessons with other neighborhoods while keeping private household details off public boards."
    ],
    tools: ["Public meeting place", "Paper task board", "Pens", "Water and accessibility plan", "Small supply ledger"],
    verify: ["Every urgent task has a next-action owner and check-in time.", "A person can refuse participation without losing essential access.", "No public record exposes names plus medical status or vulnerable-household locations."],
    escalate: ["Immediate danger or medical emergency", "Violence, intimidation or coercion", "Unverified resource claims creating public health risk"],
    guides: ["community-assessment", "community-ledger", "local-council", "communications"],
    sourceIds: ["fema_plan", "fema_volunteer"]
  }
];
