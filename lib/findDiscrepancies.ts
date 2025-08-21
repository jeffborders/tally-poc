import untypedInvoices from "../dist/invoices.json";
import getDiscrepanciesFromInvoice from "./utils/getDiscrepanciesFromInvoice";

const invoices: Invoice[] = untypedInvoices;

invoices.forEach(invoice => {
  const discrepancies = getDiscrepanciesFromInvoice(invoice);

  console.info(`\nInvoice: ${invoice.id} (${invoice.vendor})`);

  if (!discrepancies.length) {
    console.info("✅ No discrepancies found");
  } else {
    discrepancies.forEach(d => console.log(`❌ ${d.type}: ${d.detail}`));
  }
});
