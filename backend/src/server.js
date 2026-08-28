import cors from "cors";
import express from "express";
import { z } from "zod";
import { config, hasEmailConfig, hasOpenAiConfig } from "./config.js";
import { sendLeadNotification } from "./email.js";
import { createCallScript, createLeadSummary } from "./openai.js";

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || config.allowedOrigins.length === 0 || config.allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin is not allowed by CORS."));
    }
  })
);

const leadSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(6).max(40).optional().or(z.literal("")),
  city: z.string().max(120).optional().or(z.literal("")),
  businessType: z.string().min(2).max(120),
  callVolume: z.string().max(120).optional().or(z.literal("")),
  message: z.string().min(10).max(2000)
});

const scriptSchema = z.object({
  businessType: z.string().min(2).max(120),
  scenario: z.string().min(5).max(1000),
  language: z.string().max(80).optional()
});

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "awaaz-desk-backend",
    openaiConfigured: hasOpenAiConfig(),
    emailConfigured: hasEmailConfig()
  });
});

app.post("/api/leads", async (req, res, next) => {
  try {
    const lead = leadSchema.parse(req.body);
    const aiSummary = await createLeadSummary(lead);
    const email = await sendLeadNotification(lead, aiSummary);

    res.status(201).json({
      ok: true,
      lead: {
        name: lead.name,
        businessType: lead.businessType,
        city: lead.city || null
      },
      aiSummary,
      email
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/scripts", async (req, res, next) => {
  try {
    const request = scriptSchema.parse(req.body);
    const script = await createCallScript(request);

    res.json({ ok: true, script });
  } catch (error) {
    next(error);
  }
});

app.use((error, _req, res, _next) => {
  if (error instanceof z.ZodError) {
    res.status(400).json({ ok: false, error: "Invalid request.", details: error.flatten() });
    return;
  }

  console.error(error);
  res.status(500).json({ ok: false, error: "Server error." });
});

app.listen(config.port, () => {
  console.log(`Awaaz Desk backend listening on port ${config.port}`);
});
