import untypedInvoices from "../dist/invoices.json";
import getDiscrepancies from "./utils/getDiscrepancies";

const invoices: Invoice[] = untypedInvoices;

invoices.forEach(invoice => {
  const discrepancies = getDiscrepancies(invoice);

  console.info(`\nInvoice: ${invoice.id} (${invoice.vendor})`);

  if (!discrepancies.length) {
    console.info("✅ No discrepancies found");
  } else {
    discrepancies.forEach(d => console.log(`❌ ${d.type}: ${d.detail}`));
  }
});
