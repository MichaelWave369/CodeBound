// Node 20+: node examples/supply-ledger.mjs
import { validateLedgerItem, ledgerExport } from "../src/core.js";
const items = [
  { id: "item-001", ...validateLedgerItem({ name: "Soap", quantity: 24, unit: "bars", note: "Handwashing area" }) },
  { id: "item-002", ...validateLedgerItem({ name: "Bottled water", quantity: 36, unit: "gallons", note: "Verify seals and dates" }) }
];
console.log(ledgerExport(items));
