import express from "express";
import {
  createBlog,
  getBlogs,
  getSingleBlog,
  deleteBlog,
  getAllBlogsAdmin,
  updateBlog
  ,getSingleBlogAdmin,
  getCategories
} from "../controllers/blog.controller.js";
import { isAuth } from "../middlewares/isAuth.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import {upload} from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Admin Routes
router.post("/create", isAuth, verifyAdmin,upload.single("image"), createBlog);
router.delete("/delete/:id", isAuth, verifyAdmin, deleteBlog);
router.put("/update/:id",isAuth, verifyAdmin,upload.single("image"), updateBlog)
router.get("/admin", isAuth, verifyAdmin, getAllBlogsAdmin);
router.get("/admin/:id", isAuth, verifyAdmin, getSingleBlogAdmin);

// Public Routes
router.get("/", getBlogs);
router.get("/categories",getCategories);
router.get("/:slug", getSingleBlog);

export default router;