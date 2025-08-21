import db from "../db";

export type Invoice = {
  vendor: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
};

export function saveInvoices(invoices: Invoice[]) {
  const stmt = db.prepare(
    `INSERT INTO invoices (vendor, description, quantity, rate, amount)
     VALUES (@vendor, @description, @quantity, @rate, @amount)`
  );
  const insertMany = db.transaction((rows: Invoice[]) => {
    for (const row of rows) stmt.run(row);
  });
  insertMany(invoices);
}

export function saveContractRules(rules: { vendor: string; description: string; contract_rate: number }[]) {
  const stmt = db.prepare(
    `INSERT INTO contract_rules (vendor, description, contract_rate)
     VALUES (@vendor, @description, @contract_rate)`
  );
  const insertMany = db.transaction((rows) => {
    for (const row of rows) stmt.run(row);
  });
  insertMany(rules);
}
