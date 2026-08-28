import dotenv from "dotenv";

dotenv.config();

const toList = (value) =>
  String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export const config = {
  port: Number(process.env.PORT || 8787),
  allowedOrigins: toList(process.env.ALLOWED_ORIGINS),
  openai: {
    apiKey: process.env.OPENAI_API_KEY || "",
    model: process.env.OPENAI_MODEL || "gpt-5"
  },
  business: {
    name: process.env.BUSINESS_NAME || "Awaaz Desk",
    email: process.env.BUSINESS_EMAIL || "hello@awaazdesk.in",
    ownerEmail: process.env.OWNER_EMAIL || "founder@awaazdesk.in"
  },
  smtp: {
    host: process.env.SMTP_HOST || "",
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || ""
  }
};

export const hasOpenAiConfig = () => Boolean(config.openai.apiKey);

export const hasEmailConfig = () =>
  Boolean(config.smtp.host && config.smtp.user && config.smtp.pass);
