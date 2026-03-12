// ==========================================
// backend/middlewares/validation.js - Create this file
// ==========================================

import { body, validationResult } from "express-validator";

// =====================
// JOB VALIDATION MIDDLEWARE
// =====================

export const validateJobInput = [
  body("title")
    .trim()
    .notEmpty().withMessage("Job title is required")
    .isLength({ min: 5, max: 100 }).withMessage("Title must be 5-100 characters"),
  
  body("department")
    .trim()
    .notEmpty().withMessage("Department is required"),
  
  body("location")
    .trim()
    .notEmpty().withMessage("Location is required"),
  
  body("jobType")
    .trim()
    .notEmpty().withMessage("Job type is required")
    .isIn(["Full-time", "Part-time", "Contract", "Freelance"])
    .withMessage("Invalid job type"),
  
  body("description")
    .trim()
    .notEmpty().withMessage("Description is required")
    .isLength({ min: 50 }).withMessage("Description must be at least 50 characters"),
  
  body("requirements")
    .trim()
    .notEmpty().withMessage("Requirements are required"),
  
  body("salary").trim().optional(),
  body("experience").trim().optional(),
  body("benefits").trim().optional(),

  // Error handler middleware
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array().map(e => ({
          field: e.param,
          message: e.msg
        }))
      });
    }
    next();
  }
];

// =====================
// JOB APPLICATION VALIDATION
// =====================

export const validateJobApplication = [
  body("selectedJobTitle")
    .trim()
    .notEmpty().withMessage("Job title is required"),
  
  body("fullName")
    .trim()
    .notEmpty().withMessage("Full name is required")
    .isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),
  
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),
  
  body("phone")
    .trim()
    .optional()
    .matches(/^[0-9]{10}$/).withMessage("Phone must be 10 digits"),
  
  body("gender").trim().optional(),
  body("dateOfBirth").trim().optional(),
  body("qualification").trim().optional(),
  body("coverLetter").trim().optional(),

  // Error handler
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array().map(e => ({
          field: e.param,
          message: e.msg
        }))
      });
    }
    next();
  }
];

export default {
  validateJobInput,
  validateJobApplication
};
