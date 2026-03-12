// ==========================================
// routes/Application.Routes.js
// ==========================================

import express from "express";
import {
  applyForJob,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
} from "../controllers/application.controller.js";
import { isAuth } from "../middlewares/isAuth.js";
import {upload} from "../middlewares/uploadMiddleware.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = express.Router();

// Public
router.post("/apply", upload.single("resume"), applyForJob);

// Admin
router.get("/", isAuth,verifyAdmin ,getAllApplications);
router.get("/:id", isAuth, verifyAdmin, getApplicationById);
router.patch("/:id/status", isAuth, verifyAdmin, updateApplicationStatus);
router.delete("/:id", isAuth, verifyAdmin, deleteApplication);

export default router;
