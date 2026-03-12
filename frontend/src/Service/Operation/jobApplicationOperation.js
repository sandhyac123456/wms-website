// ==========================================
// services/jobApplicationOperations.js
// ==========================================

import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { jobApplicationEndPoints } from "../apis";

const {
  APPLY_FOR_JOB_API,
  GET_ALL_APPLICATIONS_API,
  GET_APPLICATION_BY_ID_API,
  UPDATE_APPLICATION_STATUS_API,
  DELETE_APPLICATION_API,
} = jobApplicationEndPoints;

// =====================
// APPLY FOR JOB
// =====================

export const applyForJob = async (formData, token) => {
  const toastId = toast.loading("Submitting application...");
  try {
    console.log("📤 Applying for job with data:", formData);

    const response = await apiConnector(
      "POST",
      APPLY_FOR_JOB_API,
      formData,
      { Authorization: `Bearer ${token}` },
      null
    );

    toast.dismiss(toastId);
    console.log("✅ Application response:", response.data);

    if (response.data.success) {
      toast.success("Application submitted successfully!");
    }

    return response.data;
  } catch (error) {
    toast.dismiss(toastId);
    console.error("❌ APPLY_FOR_JOB Error:", error);
    toast.error(error.response?.data?.message || "Failed to submit application");
    throw error;
  }
};

// =====================
// GET ALL APPLICATIONS
// =====================

export const getAllApplications = async (page = 1, limit = 10, filters = {}, token) => {
  const toastId = toast.loading("Loading applications...");
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("page", page);
    queryParams.append("limit", limit);
    
    if (filters.jobTitle) queryParams.append("jobTitle", filters.jobTitle);
    if (filters.email) queryParams.append("email", filters.email);

    const response = await apiConnector(
      "GET",
      `${GET_ALL_APPLICATIONS_API}?${queryParams.toString()}`,
      null,
      { Authorization: `Bearer ${token}` },
      null
    );
    toast.dismiss(toastId);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    toast.dismiss(toastId);
    console.error("❌ GET_ALL_APPLICATIONS Error:", error);
    toast.error(error.response?.data?.message || "Failed to fetch applications");
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Failed to fetch applications",
    };
  }
};

// =====================
// GET APPLICATION BY ID
// =====================

export const getApplicationById = async (applicationId, token) => {
  try {
    const response = await apiConnector(
      "GET",
      `${GET_APPLICATION_BY_ID_API}/${applicationId}`,
      null,
      { Authorization: `Bearer ${token}` },
      null
    );

    return response.data;
  } catch (error) {
    console.error("❌ GET_APPLICATION_BY_ID Error:", error);
    toast.error(error.response?.data?.message || "Failed to fetch application");
    throw error;
  }
};

// =====================
// UPDATE APPLICATION STATUS
// =====================

export const updateApplicationStatus = async (applicationId, status, token) => {
  const toastId = toast.loading("Updating status...");
  try {
    console.log("📤 Updating application status:", applicationId, status);

    const response = await apiConnector(
      "PATCH",
      `${UPDATE_APPLICATION_STATUS_API}/${applicationId}`,
      { status },
      { Authorization: `Bearer ${token}` },
      null
    );

    toast.dismiss(toastId);
    console.log("✅ Status update response:", response.data);

    if (response.data.success) {
      toast.success(`Application status updated to ${status}!`);
    }

    return response.data;
  } catch (error) {
    toast.dismiss(toastId);
    console.error("❌ UPDATE_APPLICATION_STATUS Error:", error);
    toast.error(error.response?.data?.message || "Failed to update status");
    throw error;
  }
};

// =====================
// DELETE APPLICATION
// =====================

export const deleteApplication = async (applicationId, token) => {
  const toastId = toast.loading("Deleting application...");
  try {
    console.log("📤 Deleting application:", applicationId);

    const response = await apiConnector(
      "DELETE",
      `${DELETE_APPLICATION_API}/${applicationId}`,
      null,
      { Authorization: `Bearer ${token}` },
      null
    );

    toast.dismiss(toastId);
    console.log("✅ Delete response:", response.data);

    if (response.data.success) {
      toast.success("Application deleted successfully!");
    }

    return response.data;
  } catch (error) {
    toast.dismiss(toastId);
    console.error("❌ DELETE_APPLICATION Error:", error);
    toast.error(error.response?.data?.message || "Failed to delete application");
    throw error;
  }
};
