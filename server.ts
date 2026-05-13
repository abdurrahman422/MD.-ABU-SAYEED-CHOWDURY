import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const receiver = process.env.RECEIVER_EMAIL || "ar422487@gmail.com";

    // If no credentials are set, we'll log the message and return a success but with a warning.
    // This allows the UI to work in a "demo" state without crashing.
    if (!user || !pass) {
      console.log("--- Contact Form Submission (Demo Mode) ---");
      console.log(`From: ${name} <${email}>`);
      console.log(`Subject: ${subject}`);
      console.log(`Message: ${message}`);
      console.log("-------------------------------------------");
      return res.status(200).json({ 
        success: true, 
        message: "Message received in demo mode (SMTP not configured)." 
      });
    }

    try {
      const transporter = nodemailer.createTransport({
        host: host || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: user,
          pass: pass,
        },
      });

      await transporter.sendMail({
        from: `"${name}" <${user}>`, // Use authenticated user as sender to avoid spoofing filters
        replyTo: email,
        to: receiver,
        subject: `Contact Form: ${subject || "New Message"}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });

      res.status(200).json({ success: true, message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
