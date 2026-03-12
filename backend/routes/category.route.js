import express from "express";
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  getAllCategoriesAdmin,
} from "../controllers/category.controller.js";

import { isAuth } from "../middlewares/isAuth.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
const router = express.Router();

/* Public */
router.get("/", getAllCategories);

/* Admin */
router.post("/create", isAuth, verifyAdmin, createCategory);
router.put("/update/:id", isAuth, verifyAdmin, updateCategory);
router.delete("/delete/:id", isAuth, verifyAdmin, deleteCategory);
router.get("/admin", isAuth, verifyAdmin, getAllCategoriesAdmin);

export default router;