// ==========================================
// backend/controllers/auth.Controller.js - FIXED & SIMPLE
// ==========================================

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/admin.model.js"

// Admin credentials from .env
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "vikas@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "vikas123"; // Plain password (for now)
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRES || "5h";


// ADMIN SIGNUP 

export const adminSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin: newAdmin,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Signup failed",
    });
  }
};

// =====================
// ADMIN LOGIN
// =====================

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const payload = {
      id: admin._id,
      email: admin.email,
      role: "admin",
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    return res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      token,
      admin: {
        email: admin.email,
        role: "admin",
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



// =====================
// VERIFY TOKEN
// =====================

export const verifyAdminToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    console.log(`✅ Token verified for admin: ${decoded.email}`);

    return res.status(200).json({
      success: true,
      message: "Token is valid",
      admin: {
        email: decoded.email,
        role: decoded.role,
      },
    });
  } catch (error) {
    console.error("❌ Token verification error:", error);
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

// =====================
// ADMIN LOGOUT
// =====================

export const adminLogout = async (req, res) => {
  try {
    console.log("✅ Admin logged out");

    return res.status(200).json({
      success: true,
      message: "Admin logged out successfully",
    });
  } catch (error) {
    console.error("❌ Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to logout",
    });
  }
};

// =====================
// GET ADMIN PROFILE
// =====================

export const getAdminProfile = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Admin profile fetched",
      admin: {
        email: ADMIN_EMAIL,
        role: "admin",
        createdAt: new Date(),
      },
    });
  } catch (error) {
    console.error("❌ Get profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch admin profile",
    });
  }
};

export default {
  adminLogin,
  adminSignup,
  verifyAdminToken,
  adminLogout,
  getAdminProfile,
};
