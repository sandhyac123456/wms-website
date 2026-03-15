import Blog from "../models/blog.model.js";
import slugify from "slugify";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import mongoose from "mongoose";

// CREATE BLOG

export const createBlog = async (req, res) => {
  try {
    const { title, description, content, category, status , keywords} = req.body;

    if (!title || !description || !content || !category) {
      return res.status(400).json({
        success: false,
        message: "All required fields are mandatory",
      });
    }

    let imageUrl = "";

    // ✅ If image file exists
    if (req.file) {

const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

const result = await cloudinary.uploader.upload(base64,{
folder:"blogs"
});

imageUrl = result.secure_url;

}

    let slug = slugify(title, { lower: true });

    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      slug = slug + "-" + Date.now();
    }

    const blog = await Blog.create({
      title,
      slug,
      description,
      content,
      category,
      status,
      image: imageUrl ,
      keywords: keywords ? keywords.split(",").map(k => k.trim()) : []
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL BLOGS (PUBLIC WITH CATEGORY FILTER)
export const getBlogs = async (req, res) => {
  try {
const category = req.query.category;
const pageNumber = Number(req.query.page) || 1;
const limitNumber = Number(req.query.limit) || 6;

    let filter = { status: "published" };

    // If category exists in query
  if (req.query.category) {
  filter.category = new mongoose.Types.ObjectId(req.query.category);
}

console.log("Query category:", req.query.category);
console.log("Final filter:", filter);

    const skip = (pageNumber-1)*limitNumber;

    const blogs = await Blog.find(filter).populate("category")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limitNumber));

      const total = await Blog.countDocuments(filter);

    res.status(200).json({
      success: true,
      blogs,
      total,
      currentPage: Number(pageNumber),
      totalPages: Math.ceil(total/limitNumber),      
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all blogs (Admin)

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("category").sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE BLOG
export const getSingleBlog = async (req, res) => {
  try {
    // console.log("single bolg api called",)
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { views: 1 } },
      { new: true }   
    ).populate("category");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      blog,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE BLOG (ADMIN)
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // 🔥 Delete image from cloudinary
    if (blog.image) {
      const publicId = blog.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`blogs/${publicId}`);
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Blog (Admin)
export const updateBlog = async (req, res) => {
  try {
    // console.log("BODY:", req.body);
    // console.log("FILE:", req.file);  
    const { title, description, content, category, status ,keywords} = req.body;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    let imageUrl = blog.image;

    // ✅ If new image uploaded
    if (req.file) {

      // 🔥 Delete old image from cloudinary (if exists)
      if (blog.image) {
        const publicId = blog.image
  .split("/")
  .slice(-2)
  .join("/")
  .split(".")[0];

await cloudinary.uploader.destroy(publicId);
      }

      // Upload new image
      if(req.file){
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "blogs",
      });

      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        content,
        category,
        status,
        image: imageUrl,
        keywords: keywords ? keywords.split(",").map(k => k.trim()) : blog.keywords

      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      blog: updatedBlog,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE BLOG (Admin)

export const getSingleBlogAdmin = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      blog,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL CATEGORIES WITH COUNT
export const getCategories = async (req, res) => {
  try {
    const categories = await Blog.aggregate([
      {
        $match: { status: "published" }
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      categories
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};