// ==========================================
// controllers/jobController.js - Enhanced Version
// ==========================================

import Job from "../models/job.model.js";
import { validationResult } from "express-validator";

// ✅ POST - Create new job with validation
export const postJob = async (req, res) => {
  try {
    // Check for validation errors from middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: "Validation failed",
        errors: errors.array() 
      });
    }

    const { 
      title, 
      department, 
      location, 
      jobType, 
      experience, 
      salary, 
      description, 
      requirements, 
      benefits 
    } = req.body;

const adminId= req.user?.id;
// console.log("adminid", adminId)

    // Validate required fields
    if (!title?.trim() || !department?.trim() || !location?.trim() || !jobType?.trim() || !description?.trim() || !requirements?.trim()) {
      return res.status(400).json({ 
        message: "All required fields must be filled" 
      });
    }

    // Check if job already exists (prevent duplicates)
    const existingJob = await Job.findOne({
      title: title.trim(),
      department: department.trim(),
      location: location.trim()
    });

    if (existingJob) {
      return res.status(409).json({ 
        message: "Similar job posting already exists" 
      });
    }

    // Create job object with all fields
    const jobData = {
      title: title.trim(),
      department: department.trim(),
      location: location.trim(),
      jobType: jobType.trim(),
      experience: experience?.trim() || "",
      salary: salary?.trim() || "",
      description: description.trim(),
      requirements: requirements.trim(),
      benefits: benefits?.trim() || "",
      postedBy: adminId || null,
      status: "active",
      postedAt: new Date(),
      updatedAt: new Date()
    };

    // Create and save job
    const job = await Job.create(jobData);

    // Populate postedBy before sending response
    const populatedJob = await Job.findById(job._id).populate('postedBy', 'name email');

    console.log(`✓ Job posted successfully: ${job._id}`);

    return res.status(201).json({
      message: "Job posted successfully!",
      success: true,
      data: populatedJob
    });
  } catch (err) {
    console.error("❌ Job posting error:", err);
    return res.status(500).json({ 
      message: "Job posting failed",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// ✅ GET - Fetch all jobs with pagination & filtering
export const getJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10, department, location, jobType, status = "active" } = req.query;

    // Build filter object
    const filter = { status };
    
    if (department) filter.department = { $regex: department, $options: "i" };
    if (location) filter.location = { $regex: location, $options: "i" };
    if (jobType) filter.jobType = jobType;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Fetch jobs with pagination
    const jobs = await Job.find(filter)
      .sort({ postedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('postedBy', 'name email')
      .lean();

    // Get total count for pagination
    const totalJobs = await Job.countDocuments(filter);
    const totalPages = Math.ceil(totalJobs / limit);

    console.log(`✓ Fetched ${jobs.length} jobs from page ${page}`);

    return res.status(200).json({
      message: "Jobs fetched successfully",
      success: true,
      data: jobs,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalJobs,
        jobsPerPage: parseInt(limit)
      }
    });
  } catch (err) {
    console.error("❌ Fetch jobs error:", err);
    return res.status(500).json({ 
      message: "Error fetching jobs",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// ✅ GET - Fetch single job by ID
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    const job = await Job.findById(id)
      .populate('postedBy', 'name email company')
      .lean();

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    console.log(`✓ Fetched job: ${id}`);

    return res.status(200).json({
      message: "Job fetched successfully",
      success: true,
      data: job
    });
  } catch (err) {
    console.error("❌ Fetch single job error:", err);
    return res.status(500).json({ 
      message: "Error fetching job",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// ✅ PUT - Update job posting
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      department, 
      location, 
      jobType, 
      experience, 
      salary, 
      description, 
      requirements, 
      benefits,
      status 
    } = req.body;

    // Validate MongoDB ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    // Check if job exists
    const existingJob = await Job.findById(id);
    if (!existingJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check authorization
    if (req.user && existingJob.postedBy.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Unauthorized to update this job" });
    }

    // Build update object with only provided fields
    const updateData = {};
    if (title?.trim()) updateData.title = title.trim();
    if (department?.trim()) updateData.department = department.trim();
    if (location?.trim()) updateData.location = location.trim();
    if (jobType?.trim()) updateData.jobType = jobType.trim();
    if (experience?.trim()) updateData.experience = experience.trim();
    if (salary?.trim()) updateData.salary = salary.trim();
    if (description?.trim()) updateData.description = description.trim();
    if (requirements?.trim()) updateData.requirements = requirements.trim();
    if (benefits?.trim()) updateData.benefits = benefits.trim();
    if (status) updateData.status = status;
    
    updateData.updatedAt = new Date();

    // Update job
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('postedBy', 'name email');

    console.log(`✓ Job updated: ${id}`);

    return res.status(200).json({
      message: "Job updated successfully!",
      success: true,
      data: updatedJob
    });
  } catch (err) {
    console.error("❌ Update job error:", err);
    return res.status(500).json({ 
      message: "Error updating job",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// ✅ DELETE - Soft delete job (mark as inactive)
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    // Check if job exists
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check authorization
    if (req.user && job.postedBy.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this job" });
    }

    // Soft delete
    job.status = "inactive";
    job.deletedAt = new Date();
    await job.save();

    console.log(`✓ Job deleted (soft): ${id}`);

    return res.status(200).json({
      message: "Job deleted successfully!",
      success: true
    });
  } catch (err) {
    console.error("❌ Delete job error:", err);
    return res.status(500).json({ 
      message: "Error deleting job",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// ✅ GET - Fetch admin's jobs
export const getAdminJobs = async (req, res) => {
  try {
    const {id}= req.user
    console.log("user id", id)

    if (!id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const jobs = await Job.find({ postedBy: id })
      .sort({ postedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const totalJobs = await Job.countDocuments({ postedBy: id });
    const totalPages = Math.ceil(totalJobs / limit);

    console.log(`✓ Fetched admin jobs: ${jobs.length} jobs`);

    return res.status(200).json({
      message: "Admin jobs fetched successfully",
      success: true,
      data: jobs,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalJobs,
        jobsPerPage: parseInt(limit)
      }
    });
  } catch (err) {
    console.error("❌ Fetch admin jobs error:", err);
    return res.status(500).json({ 
      message: "Error fetching admin jobs",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// ✅ PATCH - Update job status
export const updateJobStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ["active", "inactive", "closed", "filled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}` 
      });
    }

    // Check if job exists
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check authorization
    if (req.user && job.postedBy.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Unauthorized to update this job" });
    }

    // Update status
    job.status = status;
    job.updatedAt = new Date();
    await job.save();

    console.log(`✓ Job status updated: ${id} -> ${status}`);

    return res.status(200).json({
      message: `Job status updated to ${status}`,
      success: true,
      data: job
    });
  } catch (err) {
    console.error("❌ Update status error:", err);
    return res.status(500).json({ 
      message: "Error updating job status",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// ✅ GET - Search jobs
export const searchJobs = async (req, res) => {
  try {
    const { keyword, department, location, jobType } = req.query;

    if (!keyword && !department && !location && !jobType) {
      return res.status(400).json({ message: "Please provide at least one search parameter" });
    }

    const searchFilter = { status: "active" };

    if (keyword) {
      searchFilter.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { requirements: { $regex: keyword, $options: "i" } }
      ];
    }

    if (department) searchFilter.department = { $regex: department, $options: "i" };
    if (location) searchFilter.location = { $regex: location, $options: "i" };
    if (jobType) searchFilter.jobType = jobType;

    const jobs = await Job.find(searchFilter)
      .sort({ postedAt: -1 })
      .populate('postedBy', 'name email')
      .lean();

    console.log(`✓ Search completed: Found ${jobs.length} jobs`);

    return res.status(200).json({
      message: "Search completed",
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (err) {
    console.error("❌ Search error:", err);
    return res.status(500).json({ 
      message: "Error searching jobs",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};
