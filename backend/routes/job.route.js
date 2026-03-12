// ==========================================
// backend/routes/jobRoutes.js - Fixed
// ==========================================

import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  postJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  getAdminJobs,
  updateJobStatus,
  searchJobs
} from "../controllers/job.controller.js";
import { validateJobInput } from "../middlewares/validationJobData.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const jobRouter = express.Router();

// ==========================================
// PUBLIC ROUTES
// ==========================================

// Get all jobs
jobRouter.get("/", getJobs);

// Search jobs
jobRouter.get("/search", searchJobs);

// Get single job by ID - MUST BE LAST
jobRouter.get("/:id", getJobById);

// ==========================================
// ADMIN ROUTES
// ==========================================

// Create job
jobRouter.post("/create", isAuth, verifyAdmin, validateJobInput, postJob);

// Get admin jobs
jobRouter.get("/admin/my-jobs", isAuth, verifyAdmin, getAdminJobs);

// Update job
jobRouter.put("/:id", isAuth, verifyAdmin, updateJob);

// Update job status
jobRouter.patch("/:id/status", isAuth, verifyAdmin, updateJobStatus);

// Delete job
jobRouter.delete("/:id", isAuth, verifyAdmin, deleteJob);

export default jobRouter;
