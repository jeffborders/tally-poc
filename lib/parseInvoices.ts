import fs from "fs";
import path from "path";
import dotenv from 'dotenv';
import normalizeCsv from "./utils/normalizeCsv";

dotenv.config();

async function parseInvoices() {
  // read csv files with disparate line item descriptions
  const csvPath1 = path.join(__dirname, "../mocks/invoices_set1.csv");
  const csvPath2 = path.join(__dirname, "../mocks/invoices_set2.csv");
  const csvFile1 = fs.readFileSync(csvPath1, "utf8");
  const csvFile2 = fs.readFileSync(csvPath2, "utf8");

  // normalize invoices via openai api
  const {invoices: invoices1} = await normalizeCsv(csvFile1);
  const {invoices: invoices2} = await normalizeCsv(csvFile2);
  const invoices = [...invoices1, ...invoices2];

  // save the normalized data to the dist directory (mock for a DB)
  const jsonPath = path.join(__dirname, "../dist/invoices.json");
  fs.writeFileSync(jsonPath, JSON.stringify(invoices));

  console.log("✅ Invoices + Rules saved.");
}

parseInvoices();
