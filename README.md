# Tally POC

- This is a proof-of-concept application for **detecting invoice discrepancies** in the 3PL / logistics space.  
- It uses the **OpenAI API** to parse and normalize disparate invoice data, stores normalized records, and runs a **discrepancy engine** against agreed contract rules.  
- The UI is built with **Next.js, React, and TypeScript**.

---

## Getting Started

### Installation
```bash
git clone git@github.com:jeffborders/tally-poc.git
cd tally-poc
npm install
```

### Adding necessary environment variables
- Replace contents of file `template.env` with the `env.txt` file emailed to you, then rename the `template.env` file to `.env`

### Running the Development Server
```bash
npm run dev
```

### View the discrepancy UI

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## How It Works

1. **Mocked invoices are ingested, parsed, and normalized** – Different vendors may use different headers/fields, the app calls OpenAI API to map raw invoice fields into a consistent schema:
   - `id`
   - `vendor`
   - `date`
   - `line_items[]`
      - `quantity`
      - `rate`
      - `description`
3. **Discrepancy Detection** – Normalized data is compared against the contracts API response to highlight mismatched rates, missing charges, or unexpected fees.
4. **UI Dashboard** – Displays invoices and highlights discrepancies for review.

---

## Example Data

The repo includes mock data for testing:

- `/mocks/invoices_set1.csv`  
- `/mocks/invoices_set2.csv`  

These can be modified to simulate different vendor invoice formats and contract terms.

---

## Roadmap / Next Steps

- ✅ Parse and normalize invoices with OpenAI  
- ✅ Basic discrepancy detection against static rules  
- 🔲 Add support for PDF and Excel ingestion (via AWS Textract)  
- 🔲 Multi-vendor contract rules with versioning 
- 🔲 Authentication and multi-user support  
- 🔲 Production-ready Postgres deployment  
- 🔲 Reporting & analytics (e.g. recurring discrepancy categories, vendor scorecards)
- 

---

## Project Structure

- **`/src`** – Next.js routes and UI components (React + TypeScript).
- **`/src/utils/parseInvoices.ts`** – Invoice parsing.
- **`/src/utils/normalizeCsv.ts`** – Normalization via OpenAI API.
- **`/src/utils/getDiscrepanciesFromInvoice.ts`** – Compares normalized invoices against contract rules and flags mismatches.
- **`/mocks/`** – Mock CSV files for invoices.