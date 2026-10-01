import nodemailer from "nodemailer";
import { connectDB, setCorsHeaders } from "../_utils.js";
import Contact from "../backend/src/models/contact.model.js";
import { sanitizeContactData } from "../backend/src/utils/sanitize.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  await connectDB();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  const sanitizedData = sanitizeContactData({ name, email, message });

  let emptyFields = [];
  let errMessage = [];
  if (!sanitizedData.name) {
    emptyFields.push("name");
    errMessage.push("Full name is required");
  }

  if (!sanitizedData.email) {
    emptyFields.push("email");
    errMessage.push("Email is required");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(sanitizedData.email)) {
      emptyFields.push("valid-email");
      errMessage.push("Email is invalid");
    }
  }

  if (!sanitizedData.message) {
    emptyFields.push("message");
    errMessage.push("Message is required");
  }

  if (emptyFields.length > 0 || errMessage.length > 0) {
    return res.status(400).json({
      status: "error",
      message: "Please fill in the required fields",
      emptyFields,
      errMessage,
    });
  }

  try {
    const newContact = await Contact.create({
      name: sanitizedData.name,
      email: sanitizedData.email,
      message: sanitizedData.message,
    });

    const info = await transporter.sendMail({
      from: {
        name: "GCODES Contact",
        address: process.env.EMAIL_USER,
      },
      to: process.env.EMAIL_USER,
      replyTo: sanitizedData.email,
      subject: "New Contact Form Submission from GCODES",
      text: `Name: ${sanitizedData.name}\nEmail: ${sanitizedData.email}\nMessage: ${sanitizedData.message}`,
      html: `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Contact Form Submission</h2>
        <p>You have received a new contact form submission from your website.</p>
        <p><strong>Name:</strong> ${sanitizedData.name}</p>
        <p><strong>Email:</strong> ${sanitizedData.email}</p>
        <p><strong>Message:</strong></p>
        <div style="padding: 15px; background: #f5f5f5; border-left: 4px solid #333;">
          ${sanitizedData.message}
        </div>
        <p>Best regards,<br>GCODES</p>
      </body>
    </html>
  `,
    });

    console.log("Email sent:", info.messageId);

    res.status(201).json({
      status: "success",
      message: "Contact successfully created!",
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
}
