// ==========================================
// controllers/Application.Controller.js - Simple & Clean
// ==========================================

import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import JobApplication from "../models/application.model.js";
import uploadOncloudinary from "../config/cloudinary.js";

// =====================
// APPLY FOR JOB
// =====================

export const applyForJob = async (req, res) => {
  let resumePath = "";

  try {
    const {
      selectedJobTitle,
      fullName,
      email,
      phone,
      gender,
      dateOfBirth,
      qualification,
      coverLetter,
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !selectedJobTitle) {
      return res.status(400).json({ 
        message: "Missing required fields: fullName, email, selectedJobTitle" 
      });
    }

    // Check resume file
    resumePath = req.file?.path;

    
    if (!resumePath) {
      return res.status(400).json({ 
        message: "Resume file is required" 
      });
    }

    const cloudinaryUrl = await uploadOncloudinary(resumePath);

if (!cloudinaryUrl) {
  return res.status(500).json({
    message: "Failed to upload resume to Cloudinary",
  });
}


    // Check duplicate application
    const existing = await JobApplication.findOne({
      email,
      appliedJobTitle: selectedJobTitle,
    });

    if (existing) {
      fs.unlink(resumePath, (err) => {
        if (err) console.error("❌ Resume deletion error:", err);
      });
      return res.status(409).json({
        message: "You have already applied for this job",
      });
    }

    // Create application
    const newApplication = new JobApplication({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone || "",
      gender: gender || "",
      dateOfBirth: dateOfBirth || "",
      qualification: qualification || "",
      coverLetter: coverLetter || "",
      appliedJobTitle: selectedJobTitle.trim(),
      resume: cloudinaryUrl,
      appliedAt: new Date(),
    });

    await newApplication.save();
    console.log(`✅ Application saved: ${email} for ${selectedJobTitle}`);

    // Send email
    try {
      await sendApplicationEmail(fullName, email, selectedJobTitle, resumePath,cloudinaryUrl);
    } catch (emailError) {
      console.error("❌ Email send error:", emailError);
      // Don't fail the application if email fails
    }

    return res.status(201).json({
      message: "Application submitted successfully!",
      success: true,
      data: newApplication,
    });
  } catch (error) {
    console.error("❌ Application error:", error);

    // Cleanup on error
    if (resumePath) {
      fs.unlink(resumePath, () => {});
    }

    return res.status(500).json({
      message: error.message || "Failed to submit application",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// =====================
// GET ALL APPLICATIONS
// =====================

export const getAllApplications = async (req, res) => {
  try {
    const { page = 1, limit = 10, jobTitle = "", email = "" } = req.query;

    const filter = {};
    if (jobTitle) filter.appliedJobTitle = { $regex: jobTitle, $options: "i" };
    if (email) filter.email = { $regex: email, $options: "i" };

    const skip = (page - 1) * limit;

    const applications = await JobApplication.find(filter)
      .sort({ appliedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalApplications = await JobApplication.countDocuments(filter);
    const totalPages = Math.ceil(totalApplications / limit);

    console.log(`✅ Fetched ${applications.length} applications`);

    return res.status(200).json({
      message: "Applications fetched successfully",
      success: true,
      data: applications,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalApplications,
        applicationsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("❌ Get applications error:", error);
    return res.status(500).json({
      message: "Failed to fetch applications",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// =====================
// GET APPLICATION BY ID
// =====================

export const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await JobApplication.findById(id);

    if (!application) {
      return res.status(404).json({ 
        message: "Application not found" 
      });
    }

    console.log(`✅ Fetched application: ${id}`);

    return res.status(200).json({
      message: "Application fetched successfully",
      success: true,
      data: application,
    });
  } catch (error) {
    console.error("❌ Get application error:", error);
    return res.status(500).json({
      message: "Failed to fetch application",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// =====================
// UPDATE APPLICATION STATUS
// =====================

export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["pending", "reviewed", "shortlisted", "rejected", "selected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const application = await JobApplication.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ 
        message: "Application not found" 
      });
    }

    console.log(`✅ Application status updated: ${id} -> ${status}`);

    return res.status(200).json({
      message: `Application status updated to ${status}`,
      success: true,
      data: application,
    });
  } catch (error) {
    console.error("❌ Update status error:", error);
    return res.status(500).json({
      message: "Failed to update application status",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// =====================
// DELETE APPLICATION
// =====================

export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await JobApplication.findByIdAndDelete(id);

    if (!application) {
      return res.status(404).json({ 
        message: "Application not found" 
      });
    }

    console.log(`✅ Application deleted: ${id}`);

    return res.status(200).json({
      message: "Application deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("❌ Delete error:", error);
    return res.status(500).json({
      message: "Failed to delete application",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// =====================
// HELPER FUNCTION - SEND EMAIL
// =====================

const sendApplicationEmail = async (fullName, email, jobTitle, resumePath,cloudinaryUrl) => {
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
    subject: `📧 New Application for ${jobTitle}`,
    html: `
      <h2>New Job Application Received</h2>
      <p><strong>Job Title:</strong> ${jobTitle}</p>
      <p><strong>Applicant Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Application Date:</strong> ${new Date().toLocaleDateString()}</p>
      <p><a href="${cloudinaryUrl}" target="_blank">View Resume</a></p>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(`📧 Email sent for ${jobTitle} application`);
};

export default {
  applyForJob,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
};
