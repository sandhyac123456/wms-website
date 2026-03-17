import express from "express";
import {
  createProject,
  getProjects,
  getAllProjectsAdmin,
  deleteProject
} from "../controllers/project.controller.js";

import { isAuth } from "../middlewares/isAuth.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Admin Routes
router.post("/create", isAuth, verifyAdmin, upload.array("images", 4), createProject);
router.delete("/delete/:id", isAuth, verifyAdmin, deleteProject);
router.get("/admin", isAuth, verifyAdmin, getAllProjectsAdmin);

// Public Routes
router.get("/", getProjects);

export default router;