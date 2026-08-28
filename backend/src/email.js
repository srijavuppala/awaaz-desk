import nodemailer from "nodemailer";
import { config, hasEmailConfig } from "./config.js";

const createTransport = () => {
  if (!hasEmailConfig()) {
    return null;
  }

  return nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass
    }
  });
};

export async function sendLeadNotification(lead, aiSummary) {
  const transport = createTransport();
  const subject = `New ${config.business.name} pilot lead: ${lead.businessType}`;
  const replyTo = lead.email || undefined;

  const text = [
    `New ${config.business.name} lead`,
    "",
    `Name: ${lead.name}`,
    `Email: ${lead.email || "Not provided"}`,
    `Phone: ${lead.phone || "Not provided"}`,
    `City: ${lead.city || "Not provided"}`,
    `Business type: ${lead.businessType}`,
    `Call volume: ${lead.callVolume || "Not provided"}`,
    "",
    "Message:",
    lead.message,
    "",
    "AI intake summary:",
    aiSummary || "AI summary was not generated."
  ].join("\n");

  if (!transport) {
    return {
      sent: false,
      reason: "SMTP is not configured.",
      preview: { to: config.business.ownerEmail, subject, text }
    };
  }

  await transport.sendMail({
    from: `"${config.business.name}" <${config.business.email}>`,
    to: config.business.ownerEmail,
    replyTo,
    subject,
    text
  });

  return { sent: true };
}
