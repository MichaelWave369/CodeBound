// Node 20+: node examples/water-plan.mjs 4 7
import { waterPlan } from "../src/core.js";
const people = Number(process.argv[2] || 4);
const days = Number(process.argv[3] || 3);
try {
  const plan = waterPlan(people, days);
  console.log("Minimum emergency drinking/cooking/hygiene water:", plan.gallons, "US gallons (" + plan.liters + " L)");
  console.log("This does not include increased heat, medical, animal, or longer-term needs.");
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
