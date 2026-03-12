// ==========================================
// backend/models/job.model.js - ES6 Updated
// ==========================================

import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Job title is required"],
    trim: true,
    maxlength: [100, "Title cannot exceed 100 characters"]
  },
  department: {
    type: String,
    required: [true, "Department is required"],
    trim: true
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    trim: true
  },
  jobType: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Freelance"],
    required: [true, "Job type is required"]
  },
  experience: {
    type: String,
    trim: true,
    default: ""
  },
  salary: {
    type: String,
    trim: true,
    default: ""
  },
  description: {
    type: String,
    required: [true, "Job description is required"],
    minlength: [50, "Description must be at least 50 characters"],
    trim: true
  },
  requirements: {
    type: String,
    required: [true, "Requirements are required"],
    trim: true
  },
  benefits: {
    type: String,
    default: "",
    trim: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    default: null
  },
  status: {
    type: String,
    enum: ["active", "inactive", "closed"],
    default: "active"
  },
  postedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: {
    type: Date,
    default: null
  },
  applicationCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

// Index for better query performance
jobSchema.index({ status: 1, postedAt: -1 });
jobSchema.index({ postedBy: 1 });
jobSchema.index({ department: 1 });
jobSchema.index({ location: 1 });

const Job = mongoose.model("Job", jobSchema);

export default Job;
