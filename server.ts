import "dotenv/config";
import express, { type Request, type Response } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const HOST = "0.0.0.0";
const SUPPORT_EMAIL = "support@mypeptok.com";

const USE_CASE_LABELS: Record<string, string> = {
  digital_health_app: "Consumer Digital Health / Wellbeing App",
  eap_corporate: "Corporate EAP / Employee Mental Fitness",
  clinic_triage: "Clinical System / Remote Patient Monitoring",
  wearables: "Smart Wearable & Biometric Integration",
  research: "Academic or Clinical Research Study",
};

interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  useCase?: string;
  message?: string;
}

async function createApp() {
  const app = express();
  app.use(express.json());

  app.post("/api/contact", async (req: Request, res: Response) => {
    const body = (req.body ?? {}) as ContactPayload;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const company = typeof body.company === "string" ? body.company.trim() : "";
    const useCase = typeof body.useCase === "string" ? body.useCase.trim() : "digital_health_app";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !company || !message) {
      res.status(400).json({ error: "Please complete all required form fields." });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({ error: "Please provide a valid work email address." });
      return;
    }

    const useCaseLabel = USE_CASE_LABELS[useCase] ?? useCase;
    const subject = `[Peptok / PAMHA Inquiry] ${company} — ${name}`;
    const text = [
      `New inquiry submitted from the Peptok / PAMHA Contact Form`,
      ``,
      `Name: ${name}`,
      `Work Email: ${email}`,
      `Company / Organization: ${company}`,
      `Primary Use Case: ${useCaseLabel}`,
      ``,
      `Project Details:`,
      message,
    ].join("\n");

    const mailtoUrl = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;

    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.CONTACT_FROM_EMAIL || "Peptok Inquiry <onboarding@resend.dev>",
            to: [SUPPORT_EMAIL],
            reply_to: email,
            subject,
            text,
          }),
        });

        if (emailResponse.ok) {
          res.status(200).json({
            ok: true,
            delivered: true,
            provider: "resend",
            recipient: SUPPORT_EMAIL,
            subject,
            text,
            mailtoUrl,
          });
          return;
        }

        const errText = await emailResponse.text();
        console.error("[contact] Email provider error:", errText);
      } catch (err) {
        console.error("[contact] Email delivery failed:", err);
      }
    }

    console.info(`[contact] Inquiry prepared for ${SUPPORT_EMAIL} from ${name} <${email}> (${company})`);
    res.status(200).json({
      ok: true,
      delivered: false,
      mode: "mailto_fallback",
      recipient: SUPPORT_EMAIL,
      subject,
      text,
      mailtoUrl,
    });
  });

  if (process.env.NODE_ENV === "production") {
    const distDir = path.resolve(__dirname, "dist");
    app.use(express.static(distDir));
    app.get("*all", (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, "index.html"));
    });
  } else {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, HOST, () => {
    console.log(`Server listening on http://${HOST}:${PORT}`);
  });
}

createApp();
