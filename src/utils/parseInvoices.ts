import fs from "fs";
import path from "path";
import normalizeCsv from "./normalizeCsv";

async function parseInvoices(contracts: Contracts): Promise<Invoice[]> {
  // read csv files with disparate line item descriptions
  const csvPath1 = path.join(process.cwd(), "./mocks/invoices_set1.csv");
  const csvPath2 = path.join(process.cwd(), "./mocks/invoices_set2.csv");
  const csvFile1 = fs.readFileSync(csvPath1, "utf8");
  const csvFile2 = fs.readFileSync(csvPath2, "utf8");

  // normalize invoices via openai api
  const {invoices: invoices1} = await normalizeCsv(csvFile1, contracts);
  const {invoices: invoices2} = await normalizeCsv(csvFile2, contracts);
  const invoices = [...invoices1, ...invoices2];

  return invoices;
}

export default parseInvoices;