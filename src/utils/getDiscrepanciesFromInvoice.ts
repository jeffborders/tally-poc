function getDiscrepanciesFromInvoice(invoice: Invoice, contract: Contract) {
  const { vendor, line_items } = invoice;

  const discrepancies: Discrepency[] = [];
  if (!contract) {
    discrepancies.push({
      type: "No Contract",
      detail: `No contract found for vendor ${vendor}`
    });

    return discrepancies;
  }

  line_items.forEach(item => {
    const expected = contract[item.description];
    if (!expected) {
      discrepancies.push({
        type: "Unknown Charge",
        detail: `Charge '${item.description}' not in contract`
      });
    } else {
      if (item.rate !== expected.rate) {
        discrepancies.push({
          type: "Rate Mismatch",
          detail: `'${item.description}' invoiced at $${item.rate}, expected $${expected.rate}`
        });
      }
    }
  });
  
  return discrepancies;
}

export default getDiscrepanciesFromInvoice;