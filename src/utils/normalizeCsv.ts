import OpenAI from "openai";

async function normalizeCsv(rawCsv: string, contracts: Contracts): Promise<OpenAIResponse> {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = `
    You are a data parser for logistics invoices.
    Normalize this CSV into a JSON array of invoices, each line item with shape:
    {
      "id": string;
      "vendor": string;
      "date": string;
      "line_items": { 
        "description": string; 
        "quantity": number;
        "rate": number;
      }[]
    }

    Normalize descriptions (e.g. "Fuel sur." -> "Fuel surcharge") based on the following contracts JSON:
    ${contracts}

    Return ONLY valid JSON.
      
    Input CSV:
    ${rawCsv}
  `;

  const response = await client.chat.completions.create({
    model: "gpt-4.1-nano",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" }
  });

  return JSON.parse(response.choices[0].message.content || "[]");
}

export default normalizeCsv;