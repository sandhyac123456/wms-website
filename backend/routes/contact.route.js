// ==========================================
// backend/routes/contactRoutes.js
// ==========================================

import express from "express";
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} from "../controllers/contact.controller.js";
import { isAuth } from "../middlewares/isAuth.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = express.Router();

// Public route
router.post("/create", createContact);

// Admin routes
router.get("/get-all-contact", isAuth,verifyAdmin ,getAllContacts);
router.get("/:id", isAuth, verifyAdmin, getContactById);
router.patch("/:id/status", isAuth, verifyAdmin, updateContactStatus);
router.delete("/:id", isAuth, verifyAdmin, deleteContact);

export default router;
