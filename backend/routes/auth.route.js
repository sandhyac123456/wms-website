// ==========================================
// backend/routes/adminAuthRoutes.js
// ==========================================

import express from "express";
import {
  adminLogin,
  adminSignup,
  verifyAdminToken,
  adminLogout,
  getAdminProfile,
} from "../controllers/auth.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

// Public routes
router.post("/signup", adminSignup);
router.post("/login", adminLogin);
router.post("/verify", verifyAdminToken);

// Protected routes
router.get("/profile", isAuth, getAdminProfile);
router.post("/logout", isAuth, adminLogout);

export default router;
