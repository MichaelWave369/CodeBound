// CodeBound Community Workshop v0.4.
// These are practice exercises, NOT certified procedures or emergency guarantees.
// Diagrams illustrate a sequence of components, NOT an electrical wiring schematic.
export const WORKSHOP_SOURCES = {
  ready_power: {
    title: "Ready.gov: Power outages and emergency planning",
    url: "https://www.ready.gov/power-outages"
  },
  osha_tools: {
    title: "OSHA: Hand and portable powered tools, general safety",
    url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.242"
  },
  osha_handbook: {
    title: "OSHA: Hand and Power Tools guidance",
    url: "https://www.osha.gov/hand-power-tools"
  },
  seed_start: {
    title: "University of Minnesota Extension: Starting seeds indoors",
    url: "https://extension.umn.edu/garden-and-home/yard-and-garden/gardening-in-minnesota/starting-seeds-indoors"
  },
  seed_light: {
    title: "University of Minnesota Extension: Lighting for indoor plants",
    url: "https://extension.umn.edu/garden-and-home/yard-and-garden/gardening-in-minnesota/lighting-for-indoor-plants"
  },
  node_http: {
    title: "Node.js: HTTP server documentation",
    url: "https://nodejs.org/api/http.html"
  },
  fema_plan: {
    title: "FEMA Ready: Make a plan",
    url: "https://www.ready.gov/plan"
  },
  cdc_power: {
    title: "CDC: Safety during a power outage",
    url: "https://www.cdc.gov/natural-disasters/response/what-to-do-protect-yourself-during-a-power-outage.html"
  }
};

export const WORKSHOP_LESSONS = [
  {
    id: "usb-task-light",
    title: "Build a safe USB task-light station",
    category: "Energy",
    effort: "45–90 minutes",
    skill: "Low-voltage equipment setup and testing",
    review: "Reference-informed draft",
    summary: "Turn a commercially made USB lamp and compatible power bank into a portable reading or handwashing light.",
    materials: [
      "Manufacturer-rated USB LED lamp (no exposed wiring)",
      "Intact, commercially built USB power bank rated for the lamp",
      "Matching undamaged USB charging cable",
      "Stable dry work surface and clamp or stand",
      "Tape or reusable cable ties for cable routing",
      "Paper log and pencil"
    ],
    steps: [
      "Identify the use area and clear a dry, stable surface. Keep the light out of water-splash paths and emergency exits.",
      "Read the lamp and power bank labels. Use a lamp and power supply that the manufacturers specify as compatible; do not cut, splice, or rewire USB leads.",
      "Place the stand securely, route the cable without trip hazards, and connect the intact lamp to the power bank.",
      "Turn on the light and check for a stable beam with no flicker, hot connectors, damaged insulation or swelling.",
      "Test operation for at least 15 minutes under supervision. Record the start time and observed behavior; measure longer run time before claiming a reliable reserve.",
      "Label the station, mark a charging/check schedule and store it dry when not in use."
    ],
    checks: [
      "Lamp remains stable and illuminated during a supervised 15-minute test.",
      "No connector or power pack becomes unusually hot, swollen, noisy or damaged.",
      "Cord is out of walkways, sharp edges and water-splash zones.",
      "A written test time and responsible person are recorded."
    ],
    stop: [
      "Stop and disconnect if the power pack swells, emits an odor or smoke, or equipment becomes unusually hot.",
      "Never open or modify lithium cells, bypass USB protection, or connect the project to building mains.",
      "Do not treat a tabletop task light as a code-compliant building emergency lighting system."
    ],
    maintenance: [
      "Inspect cables and connectors before every use; retire damaged parts.",
      "Recharge using the manufacturer's approved method in a dry, monitored place.",
      "Repeat a run-time test periodically as the battery ages."
    ],
    teachBack: "Demonstrate the station, explain its rated components and show where you would stop if a hazard appeared.",
    guideIds: ["basic-light", "shelter-safety"],
    sourceIds: ["ready_power", "cdc_power"],
    diagram: {
      caption: "Conceptual component flow only. Not an electrical wiring diagram.",
      nodes: [
        { title: "POWER BANK", detail: "Approved, intact" },
        { title: "USB CABLE", detail: "Rated + undamaged" },
        { title: "USB LED LAMP", detail: "Stable + dry" }
      ]
    }
  },
  {
    id: "tool-checkout",
    title: "Build a safe tool-checkout station",
    category: "Repair",
    effort: "60–120 minutes",
    skill: "Visual inspection, traceable borrowing and repair triage",
    review: "Reference-informed draft",
    summary: "Organize low-risk hand tools so neighbors can find serviceable equipment, report damage and return it.",
    materials: [
      "Small table or shelf with stable load rating",
      "Bins, numbered labels, paper tags and pencils",
      "Basic low-risk hand tools with owner permission",
      "Quarantine box marked DO NOT USE",
      "Paper sign-out ledger and suitable task protection"
    ],
    steps: [
      "Get permission to share each tool and record a simple unique identifier. Do not add unknown or unsuitable powered tools.",
      "Visually inspect handles, fasteners, corrosion, splinters and sharp edges before placing tools in service.",
      "Put damaged or questionable tools in the DO NOT USE quarantine bin rather than attempting a potentially unsafe repair.",
      "Arrange serviceable tools by purpose with a visible location label and a short safe-use reminder.",
      "Use a voluntary sign-out sheet listing tool ID, date and return expectation without collecting unnecessary identity or health data.",
      "Perform a supervised checkout and return. Verify the returned tool's condition and update the count."
    ],
    checks: [
      "Every serviceable tool has an ID and assigned storage location.",
      "Damaged equipment cannot be accidentally checked out.",
      "A tester can check out and return a tool using only the written instructions.",
      "Physical tool count matches the ledger after the practice."
    ],
    stop: [
      "Do not lend damaged tools or remove safety guards.",
      "High-voltage, gas, pressurized, structural and other hazardous repairs require qualified personnel.",
      "Do not use compressed air for improvised personal cleaning or testing."
    ],
    maintenance: [
      "Inspect tools on return and at regular intervals; update labels when conditions change.",
      "Keep the work area clean, dry, accessible and free of trip hazards.",
      "Document damage and either arrange qualified repair or retire the tool."
    ],
    teachBack: "Hand a new volunteer a tool ID; have them locate it, inspect it, explain the quarantine rule and correctly close the loan.",
    guideIds: ["repair-library", "community-ledger"],
    sourceIds: ["osha_tools", "osha_handbook"],
    diagram: {
      caption: "Controlled tool flow prevents damaged equipment returning to circulation.",
      nodes: [
        { title: "INSPECT", detail: "Before checkout" },
        { title: "LEND / RETURN", detail: "Track tool ID" },
        { title: "RECHECK", detail: "Use or quarantine" }
      ]
    }
  },
  {
    id: "seed-nursery",
    title: "Build a small seed-starting nursery",
    category: "Food",
    effort: "60 minutes setup; daily observation",
    skill: "Container drainage, germination recording and seedling care",
    review: "Reference-informed draft",
    summary: "Practice growing a small tray of seedlings and recording whether the method actually works in your conditions.",
    materials: [
      "Clean food-safe or purpose-made seed-starting cell tray with drainage holes",
      "Clean catch tray and fresh seed-starting mix",
      "Seeds suitable for the local season, labeled by variety",
      "Small watering can or sprayer and verified suitable irrigation water",
      "Plant tags, pencil and notebook",
      "Appropriate growing light if natural light is insufficient"
    ],
    steps: [
      "Choose a safe spot away from pets, foot traffic and temperature extremes. Keep watering areas separate from electrical connectors.",
      "Check every cell for drainage. Fill with fresh seed-starting mix and pre-moisten according to the product directions.",
      "Plant seeds at the depth and spacing on their packet; record crop, sowing date and cell positions.",
      "Keep the mix evenly moist, never waterlogged. Empty stagnant catch-tray water and observe daily.",
      "Provide adequate light after germination, following crop and lighting guidance; do not assume a windowsill provides enough light.",
      "Record seedlings emerged, losses and observed light/watering conditions; compare results before enlarging the nursery."
    ],
    checks: [
      "All planted cells are labeled and water drains into a catch tray rather than onto wiring or floors.",
      "A daily observation log lists date, germination and moisture conditions.",
      "The first germination count matches the number of visible seedlings, not a guessed yield.",
      "Anyone repeating the lesson can name the local seed packet and light requirements."
    ],
    stop: [
      "Avoid unknown contaminated soil or water on edible crops.",
      "Do not use pesticides or disinfectants without reading and following labels; never mix cleaning chemicals.",
      "Do not rely on new seedlings as a replacement for emergency food reserves."
    ],
    maintenance: [
      "Observe moisture and drainage daily; remove visibly diseased seedlings.",
      "Use clean tools and containers between crops, and follow safe cleaning product directions.",
      "Track germination percentages and transplant readiness before saving or distributing seedlings."
    ],
    teachBack: "Have a learner sow a labeled cell, show where drainage goes and calculate the number germinated out of the number planted.",
    guideIds: ["growing-food", "food-hub"],
    sourceIds: ["seed_start", "seed_light"],
    diagram: {
      caption: "A clean seed tray is a small experiment; observations are part of the build.",
      nodes: [
        { title: "SEED + LABEL", detail: "Crop / sow date" },
        { title: "DRAINED CELLS", detail: "Fresh starter mix" },
        { title: "OBSERVE", detail: "Light / moisture log" }
      ]
    }
  },
  {
    id: "offline-fieldbook",
    title: "Build an offline knowledge workstation",
    category: "Communications",
    effort: "30–60 minutes",
    skill: "Archive extraction, local HTTP serving and network-disconnect testing",
    review: "Code example / practice draft",
    summary: "Turn a modest laptop and a downloaded CodeBound ZIP into a searchable, local-only field library.",
    materials: [
      "Laptop with a modern browser",
      "A trusted CodeBound field-kit ZIP and verified checksum",
      "USB drive or other independent local copy",
      "Node.js 20 or newer already installed for the interactive site",
      "Power supply or charged laptop battery",
      "Pen and paper for the local access instructions"
    ],
    steps: [
      "Obtain the field-kit ZIP through a trusted channel while connectivity exists; check its SHA-256 checksum and know that a hash alone does not prove publisher authenticity.",
      "Extract the archive to a local folder. Double-click fieldbook.html with all networking disconnected; confirm the full book opens without a server.",
      "For the interactive version, open a terminal inside the extracted site/ folder. Start the included server with: node scripts/serve.mjs.",
      "Open http://localhost:4173 on the same computer. Search for an existing guide and test the water planner.",
      "Disconnect the network and repeat the local search and fieldbook test. Confirm the content remains accessible; record any failure.",
      "Label the USB copy with its date, save a second copy in a different safe place, and write simple startup instructions."
    ],
    checks: [
      "fieldbook.html opens from the extracted archive while fully offline.",
      "The interactive atlas loads via localhost:4173 with the laptop's network disconnected.",
      "A printed or written recovery instruction identifies the ZIP date and server startup command.",
      "All tests are performed on the same computer; no remote LAN access or synchronization is assumed."
    ],
    stop: [
      "The bundled development server intentionally binds to 127.0.0.1; do not assume it serves other devices on a LAN.",
      "Do not place sensitive personal information on an unsecured shared computer.",
      "Do not download unknown scripts or disable firewalls to make a demo function."
    ],
    maintenance: [
      "Keep two separately stored copies, and test opening the offline HTML after each update.",
      "Re-check hashes and source provenance when receiving a new archive.",
      "Train another person to start and stop the server without internet access."
    ],
    teachBack: "Ask a learner to start with an unplugged laptop, open fieldbook.html, run the localhost server and find a water guide.",
    guideIds: ["offline-node", "communications"],
    sourceIds: ["node_http", "fema_plan"],
    diagram: {
      caption: "A disconnected laptop can host the library for itself; LAN sharing is a separate, reviewed project.",
      nodes: [
        { title: "USB ARCHIVE", detail: "Verified copy" },
        { title: "LOCAL LAPTOP", detail: "Offline + Node" },
        { title: "BROWSER", detail: "localhost:4173" }
      ]
    }
  },
  {
    id: "notice-board",
    title: "Build an accessible public notice board",
    category: "Community",
    effort: "45–90 minutes",
    skill: "Offline communications, verification and correction workflows",
    review: "Community practice draft",
    summary: "Create a low-tech public information point without sharing medical details, addresses or rumors.",
    materials: [
      "Weather-protected bulletin surface at a safe, accessible location",
      "Large-print paper, marker, tape and spare writing supplies",
      "Clock or consistent timestamp convention",
      "Source and correction fields on blank notice templates",
      "Volunteer update rotation and a second review person"
    ],
    steps: [
      "Choose a safe, accessible public location that people can visit without a smartphone or private login.",
      "Post the current date, time zone, last update time and the next scheduled check. Identify a backup board if necessary.",
      "Create a notice template with fields for title, trusted source, date/time, what is known, what is unverified, and correction contact.",
      "Practice adding a verified non-sensitive notice, then have another volunteer read it aloud and check its source.",
      "Practice correcting a deliberately outdated example: keep a dated correction instead of silently removing the mistake.",
      "Assign a rotating update team, weatherproof the board and explain how accessibility and translation needs can be reported."
    ],
    checks: [
      "A person without a phone can find the current dated notice and the next check-in.",
      "Every notice states the source and distinguishes confirmed facts from uncertainty.",
      "A second person can identify and correct a planted outdated example.",
      "No published notice exposes private health information, home addresses or lists of vulnerable households."
    ],
    stop: [
      "Do not publish unconfirmed evacuation, water safety or medical orders as official instructions.",
      "Never treat the board as a substitute for active emergency alerts.",
      "Do not create a coercive volunteer or resource-access system."
    ],
    maintenance: [
      "Check the board for water damage and outdated notices on the posted schedule.",
      "Retain only the public information needed for accountability, not personal profiles.",
      "Practice transferring updates to the backup board when the first location becomes inaccessible."
    ],
    teachBack: "Ask a participant to verify a sample notice, explain how to report a correction and read it without a phone.",
    guideIds: ["communications", "community-assessment"],
    sourceIds: ["fema_plan"],
    diagram: {
      caption: "Information stays useful only when source, time and correction process are visible.",
      nodes: [
        { title: "VERIFY SOURCE", detail: "Known / unknown" },
        { title: "DATE + POST", detail: "Public, readable" },
        { title: "RECHECK", detail: "Correct visibly" }
      ]
    }
  }
];
