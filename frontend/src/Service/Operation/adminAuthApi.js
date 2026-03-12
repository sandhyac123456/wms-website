// ==========================================
// frontend/services/adminAuthOperations.js
// ==========================================

import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { adminAuthEndPoints } from "../apis";

const {
  ADMIN_LOGIN_API,
  ADMIN_VERIFY_API,
  ADMIN_LOGOUT_API,
  ADMIN_PROFILE_API,
} = adminAuthEndPoints;

// Admin login
export const adminLogin = async (email, password, navigate) => {
  const toastId = toast.loading("Logging in...");
  try {
    const response = await apiConnector(
      "POST",
      ADMIN_LOGIN_API,
      { email, password },
      null,
      null
    );

    toast.dismiss(toastId);

    console.log("Admin Login Response Data:", response);

    if (response.data.success) {
      // Save token to localStorage
    //   localStorage.setItem("adminToken", response.data.token);
      localStorage.setItem("adminToken", response.data.token);
      localStorage.setItem("adminExpireToken", response.data.expiresIn);
      
      toast.success("Login successful!");
   // Redirect to admin dashboard (edit path as needed)
        navigate("/admin/dashboard");
    }

    return response.data;
  } catch (error) {
    toast.dismiss(toastId);
    console.error("❌ ADMIN_LOGIN Error:", error);
    toast.error(error.response?.data?.message || "Login failed");
    throw error;
  }
};

// Verify admin token
export const verifyAdminToken = async () => {
  try {
    const token = localStorage.getItem("adminToken");
    
    if (!token) {
      return { success: false, message: "No token found" };
    }

    const response = await apiConnector(
      "POST",
      ADMIN_VERIFY_API,
      null,
      { Authorization: `Bearer ${token}` },
      null
    );

    return response.data;
  } catch (error) {
    console.error("❌ ADMIN_VERIFY Error:", error);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    return { success: false, message: "Token invalid" };
  }
};

// Get admin profile
export const getAdminProfile = async () => {
  try {
    const token = localStorage.getItem("adminToken");

    const response = await apiConnector(
      "GET",
      ADMIN_PROFILE_API,
      null,
      { Authorization: `Bearer ${token}` },
      null
    );

    return response.data;
  } catch (error) {
    console.error("❌ GET_ADMIN_PROFILE Error:", error);
    toast.error("Failed to fetch profile");
    throw error;
  }
};

// Admin logout
export const adminLogout = async () => {
  const toastId = toast.loading("Logging out...");
  try {
    const token = localStorage.getItem("adminToken");

    const response = await apiConnector(
      "POST",
      ADMIN_LOGOUT_API,
      null,
      { Authorization: `Bearer ${token}` },
      null
    );

    toast.dismiss(toastId);

    if (response.data.success) {
      // Remove token from localStorage
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminEmail");
      
      toast.success("Logged out successfully!");
    }

    return response.data;
  } catch (error) {
    toast.dismiss(toastId);
    console.error("❌ ADMIN_LOGOUT Error:", error);
    
    // Force logout even if API fails
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    
    toast.error("Logout error");
    throw error;
  }
};

export default {
  adminLogin,
  verifyAdminToken,
  getAdminProfile,
  adminLogout,
};
