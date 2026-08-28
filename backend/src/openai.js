import OpenAI from "openai";
import { config, hasOpenAiConfig } from "./config.js";

const client = hasOpenAiConfig()
  ? new OpenAI({ apiKey: config.openai.apiKey })
  : null;

const intakeInstructions = `
You are the intake assistant for Awaaz Desk, an AI receptionist pilot for Indian service businesses.
Create concise, practical output for a founder who will personally review early pilots.
Do not provide medical, legal, financial, or emergency advice.
Prefer clear human handoff when a request is sensitive, urgent, unclear, or outside a simple appointment or lead-capture flow.
`;

export async function createLeadSummary(lead) {
  if (!client) {
    return fallbackLeadSummary(lead);
  }

  const response = await client.responses.create({
    model: config.openai.model,
    instructions: intakeInstructions,
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: `Summarize this inbound pilot lead in 5 bullets and recommend the first call-flow script.\n\n${JSON.stringify(lead, null, 2)}`
          }
        ]
      }
    ]
  });

  return response.output_text;
}

export async function createCallScript({ businessType, scenario, language = "English" }) {
  if (!client) {
    return [
      `Greeting: Namaste, this is the ${businessType || "business"} assistant.`,
      `Intent: Ask what the caller needs and collect name, phone, preferred time, and service details.`,
      `Handoff: Tell the caller the team will confirm shortly. Escalate anything urgent or unclear.`
    ].join("\n");
  }

  const response = await client.responses.create({
    model: config.openai.model,
    instructions: intakeInstructions,
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: `Write a short AI receptionist script in ${language}.\nBusiness type: ${businessType}\nScenario: ${scenario}\nInclude greeting, three discovery questions, confirmation, and human handoff rule.`
          }
        ]
      }
    ]
  });

  return response.output_text;
}

function fallbackLeadSummary(lead) {
  return [
    `Business type: ${lead.businessType}`,
    `City: ${lead.city || "Not provided"}`,
    `Likely pilot: inbound missed-call capture and callback summary`,
    `Suggested first script: collect caller name, service need, preferred time, and phone number`,
    `Human handoff: use for urgent, sensitive, or unclear calls`
  ].join("\n");
}
