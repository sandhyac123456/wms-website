import Project from "../models/project.model.js";
import { v2 as cloudinary } from "cloudinary";

// CREATE PROJECT
export const createProject = async (req, res) => {
  try {
    const { title, description, projectLink, status } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and Description required",
      });
    }

    //  At least one image required
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    let imageUrls = [];

    // Upload multiple images to Cloudinary
    for (let file of req.files) {
      const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

      const result = await cloudinary.uploader.upload(base64, {
        folder: "projects",
      });

      imageUrls.push(result.secure_url);
    }

    const project = await Project.create({
      title,
      description,
      projectLink,
      status: status || "draft", //default
      images: imageUrls,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });

  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL PROJECTS (User)
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: "published" })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      projects,
    });

  } catch (error) {
    console.error("GET PROJECTS ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL PROJECTS (Admin)
export const getAllProjectsAdmin = async (req, res) => {
  try {
    const projects = await Project.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      projects,
    });

  } catch (error) {
    console.error("GET ADMIN PROJECTS ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE PROJECT
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Delete images from Cloudinary
    for (let image of project.images) {
      const publicId = image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`projects/${publicId}`);
    }

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });

  } catch (error) {
    console.error("DELETE PROJECT ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};