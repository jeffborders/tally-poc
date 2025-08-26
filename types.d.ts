type Discrepency = {
  type: string;
  detail: string;
}

type LineItem = { 
  description: string;
  quantity: number; 
  rate: number; 
}

type Invoice = {
  id: string;
  vendor: string;
  date: string;
  line_items: LineItem[]
}

type Contract = { 
  [charge: string] : { rate: number; }
}

type Contracts = {
  [vendor: string]: Contract;
}

type OpenAIResponse = {
  invoices: Invoice[];
};