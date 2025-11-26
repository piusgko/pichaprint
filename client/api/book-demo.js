import nodemailer from "nodemailer";
import { z } from "zod";

const bookingSchema = z.object({
  email: z.string().email(),
  message: z
    .string()
    .max(1000)
    .optional()
    .transform((val) => val?.trim() || ""),
});

const escapeHtml = (value = "") =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const renderBookingHtml = ({ email, message, requestedAt }) => {
  const safeMessage = escapeHtml(message || "Not provided").replace(/\n/g, "<br />");

  const dataRows = [
    { label: "Email", value: email },
    { label: "Message", value: safeMessage, rich: true },
  ];

  const rows = dataRows
    .map(
      ({ label, value, rich }) => `
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid #eef2f7;color:#6b7280;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;">
            ${label}
          </td>
          <td style="padding:12px 16px;border-bottom:1px solid #eef2f7;color:#0f172a;font-size:15px;font-weight:600;">
            ${
              rich
                ? value
                : escapeHtml(typeof value === "string" ? value : "Not provided")
            }
          </td>
        </tr>
      `
    )
    .join("");

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>New contact message</title>
    </head>
    <body style="margin:0;padding:24px;background-color:#f4f6fb;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:28px;border:1px solid #e2e8f0;box-shadow:0 35px 80px rgba(15,23,42,0.08);overflow:hidden;">
              <tr>
                <td style="padding:32px;background:linear-gradient(120deg,#0f172a,#0d9488);color:#f8fafc;">
                  <p style="margin:0;font-size:12px;letter-spacing:0.4em;text-transform:uppercase;color:#ccfbf1;">PichaPrintAI</p>
                  <h1 style="margin:12px 0 0;font-size:26px;font-weight:700;">New contact message</h1>
                  <p style="margin:8px 0 0;font-size:14px;color:#bae6fd;">Received ${requestedAt} (UTC)</p>
                </td>
              </tr>
              <tr>
                <td>
                  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                    ${rows}
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
};

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const parseResult = bookingSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      error: "Invalid payload.",
      details: parseResult.error.flatten(),
    });
  }

  const { email, message } = parseResult.data;
  const requestedAt = new Date().toLocaleString("en-US", { timeZone: "UTC" });

  const plainText = [
    `Email: ${email}`,
    `Message: ${message || "Not provided"}`,
    `Received (UTC): ${requestedAt}`,
  ].join("\n");

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.BOOKING_SMTP_USER,
        pass: process.env.BOOKING_SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"PichaPrintAI" <${process.env.BOOKING_SMTP_USER}>`,
      to: process.env.BOOKING_SMTP_TO || process.env.BOOKING_SMTP_USER,
      replyTo: email,
      subject: `New message from ${email}`,
      text: plainText,
      html: renderBookingHtml({
        email,
        message,
        requestedAt,
      }),
    });

    res.json({ status: "ok" });
  } catch (error) {
    console.error("Failed to send email:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
}

