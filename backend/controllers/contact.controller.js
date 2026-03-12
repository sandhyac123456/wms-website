// ==========================================
// backend/controllers/contactController.js - Enhanced
// ==========================================

import Contact from "../models/contact.model.js";
import moment from "moment";
import nodemailer from "nodemailer";

// =====================
// CREATE CONTACT MESSAGE
// =====================

export const createContact = async (req, res) => {
  try {
    const { fullName, email, number, subject, message } = req.body;

    // Validate required fields
    if (!fullName || !email || !number || !subject || !message) {
      return res.status(400).json({
        message: "All fields are required",
        success: false
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
        success: false
      });
    }

    // Phone validation
    const numberRegex = /^[0-9]{10}$/;
    if (!numberRegex.test(number)) {
      return res.status(400).json({
        message: "Phone number must be 10 digits",
        success: false
      });
    }

    // Check duplicate message today
    const startOfDay = moment().startOf("day").toDate();
    const endOfDay = moment().endOf("day").toDate();

    const existing = await Contact.findOne({
      email: email,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    if (existing) {
      return res.status(409).json({
        message: "You have already sent a message today. Please try again tomorrow.",
        success: false
      });
    }

    // Create contact message
    const newMessage = await Contact.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      number: number.trim(),
      subject: subject.trim(),
      message: message.trim(),
      status: "new",
      receivedAt: new Date(),
    });

    console.log(`✅ Contact message created: ${email} - ${subject}`);

    // Send confirmation email to user
    try {
      await sendConfirmationEmail(fullName, email);
    } catch (emailError) {
      console.error("❌ Confirmation email error:", emailError);
    }

    // Send notification email to admin
    try {
      await sendAdminNotification(fullName, email, number, subject, message);
    } catch (emailError) {
      console.error("❌ Admin notification error:", emailError);
    }

    return res.status(201).json({
      message: "Message sent successfully! We will get back to you soon.",
      success: true,
      data: newMessage,
    });
  } catch (error) {
    console.error("❌ Create contact error:", error);
    return res.status(500).json({
      message: "Failed to send message",
      success: false,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// =====================
// GET ALL CONTACTS (ADMIN)
// =====================

export const getAllContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10, status = "", search = "" } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const messages = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalMessages = await Contact.countDocuments(filter);
    const totalPages = Math.ceil(totalMessages / limit);

    console.log(`✅ Fetched ${messages.length} contact messages`);

    return res.status(200).json({
      message: "Contact messages fetched successfully",
      success: true,
      data: messages,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalMessages,
        messagesPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("❌ Get all contacts error:", error);
    return res.status(500).json({
      message: "Failed to fetch contact messages",
      success: false,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// =====================
// GET CONTACT BY ID
// =====================

export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Contact.findById(id);

    if (!message) {
      return res.status(404).json({
        message: "Contact message not found",
        success: false
      });
    }

    console.log(`✅ Fetched contact: ${id}`);

    return res.status(200).json({
      message: "Contact message fetched successfully",
      success: true,
      data: message,
    });
  } catch (error) {
    console.error("❌ Get contact error:", error);
    return res.status(500).json({
      message: "Failed to fetch contact message",
      success: false,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// =====================
// UPDATE CONTACT STATUS
// =====================

export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reply } = req.body;

    const validStatuses = ["new", "read", "replied", "spam"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
        success: false
      });
    }

    const updateData = {
      status,
      updatedAt: new Date(),
    };

    if (reply) {
      updateData.reply = reply;
      updateData.repliedAt = new Date();
    }

    const message = await Contact.findByIdAndUpdate(id, updateData, { new: true });

    if (!message) {
      return res.status(404).json({
        message: "Contact message not found",
        success: false
      });
    }

    console.log(`✅ Contact status updated: ${id} -> ${status}`);

    // Send reply email if provided
    if (reply) {
      try {
        await sendReplyEmail(message.fullName, message.email, reply);
      } catch (emailError) {
        console.error("❌ Reply email error:", emailError);
      }
    }

    return res.status(200).json({
      message: `Contact status updated to ${status}`,
      success: true,
      data: message,
    });
  } catch (error) {
    console.error("❌ Update contact status error:", error);
    return res.status(500).json({
      message: "Failed to update contact status",
      success: false,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// =====================
// DELETE CONTACT
// =====================

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Contact.findByIdAndDelete(id);

    if (!message) {
      return res.status(404).json({
        message: "Contact message not found",
        success: false
      });
    }

    console.log(`✅ Contact deleted: ${id}`);

    return res.status(200).json({
      message: "Contact message deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("❌ Delete contact error:", error);
    return res.status(500).json({
      message: "Failed to delete contact message",
      success: false,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// =====================
// HELPER FUNCTIONS - EMAIL
// =====================

const sendConfirmationEmail = async (fullName, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "✅ We received your message",
    html: `
      <h2>Hello ${fullName},</h2>
      <p>Thank you for contacting White Mirror Solutions!</p>
      <p>We have received your message and will get back to you as soon as possible.</p>
      <p>Our team typically responds within 24-48 hours.</p>
      <br/>
      <p>Best regards,<br/>White Mirror Solutions Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(`📧 Confirmation email sent to ${email}`);
};

const sendAdminNotification = async (fullName, email, number, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO || "admin@yourdomain.com",
    subject: `📬 New Contact Message: ${subject}`,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>From:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${number}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr/>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <hr/>
      <p>Received on: ${new Date().toLocaleString()}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(`📧 Admin notification sent for ${subject}`);
};

const sendReplyEmail = async (fullName, email, reply) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "📧 Reply from White Mirror Solutions",
    html: `
      <h2>Hello ${fullName},</h2>
      <p>Thank you for your message. Here's our reply:</p>
      <hr/>
      <p>${reply}</p>
      <hr/>
      <p>Best regards,<br/>White Mirror Solutions Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(`📧 Reply email sent to ${email}`);
};

export default {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
};
