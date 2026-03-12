// ==========================================
// services/jobOperations.js - Simple Operations
// ==========================================

import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { jobEndPoints } from "../apis";

const {
  GET_ALL_JOBS_API,
  GET_JOB_BY_ID_API,
  SEARCH_JOBS_API,
  CREATE_JOB_API,
  UPDATE_JOB_API,
  DELETE_JOB_API,
  GET_ADMIN_JOBS_API,
  UPDATE_JOB_STATUS_API,
} = jobEndPoints;

// =====================
// PUBLIC OPERATIONS
// =====================

// Get all jobs
export const getAllJobs = async (page = 1, limit = 10, filters = {}) => {
  const toastId = toast.loading("Loading jobs...");
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("page", page);
    queryParams.append("limit", limit);
    
    if (filters.department) queryParams.append("department", filters.department);
    if (filters.location) queryParams.append("location", filters.location);
    if (filters.jobType) queryParams.append("jobType", filters.jobType);

    const response = await apiConnector(
      "GET",
      `${GET_ALL_JOBS_API}?${queryParams.toString()}`,
      null,
      null,
      null
    );

    toast.dismiss(toastId);
    return response.data;
  } catch (error) {
    toast.dismiss(toastId);
    console.error("❌ GET_ALL_JOBS Error:", error);
    toast.error(error.response?.data?.message || "Failed to fetch jobs");
    throw error;
  }
};

// Get job by ID
export const getJobById = async (jobId) => {
  try {
    const response = await apiConnector(
      "GET",
      `${GET_JOB_BY_ID_API}/${jobId}`,
      null,
      null,
      null
    );
    return response.data;
  } catch (error) {
    console.error("❌ GET_JOB_BY_ID Error:", error);
    toast.error(error.response?.data?.message || "Failed to fetch job");
    throw error;
  }
};

// Search jobs
export const searchJobs = async (keyword = "", filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (keyword) queryParams.append("keyword", keyword);
    if (filters.department) queryParams.append("department", filters.department);
    if (filters.location) queryParams.append("location", filters.location);
    if (filters.jobType) queryParams.append("jobType", filters.jobType);

    const response = await apiConnector(
      "GET",
      `${SEARCH_JOBS_API}?${queryParams.toString()}`,
      null,
      null,
      null
    );

    return response.data;
  } catch (error) {
    console.error("❌ SEARCH_JOBS Error:", error);
    toast.error(error.response?.data?.message || "Search failed");
    throw error;
  }
};

// =====================
// ADMIN OPERATIONS
// =====================

// Create job
export const createJob = async (jobData, token) => {
  const toastId = toast.loading("Creating job...");
  console.log("admin token ", token)
  try {
    console.log("📤 Creating job with data:", jobData);

    const response = await apiConnector(
      "POST",
      CREATE_JOB_API,
      jobData,
      { Authorization: `Bearer ${token}` },
      null
    );

    toast.dismiss(toastId);
    console.log("✅ Create job response:", response.data);

    if (response.data.success) {
      toast.success("Job created successfully!");
    }

    return response.data;
  } catch (error) {
    toast.dismiss(toastId);
    console.error("❌ CREATE_JOB Error:", error);
    toast.error(error.response?.data?.message || "Failed to create job");
    throw error;
  }
};

// Get admin jobs
export const getAdminJobs = async (token, page = 1, limit = 10) => {
  const toastId = toast.loading("Loading your jobs...");
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("page", page);
    queryParams.append("limit", limit);

    const response = await apiConnector(
      "GET",
      `${GET_ADMIN_JOBS_API}?${queryParams.toString()}`,
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
    console.error("❌ GET_ADMIN_JOBS Error:", error);
    toast.error(error.response?.data?.message || "Failed to fetch your jobs");
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Failed to fetch jobs",
    };
  }
};

// Update job
export const updateJob = async (jobId, jobData, token) => {
  const toastId = toast.loading("Updating job...");
  try {
    console.log("📤 Updating job:", jobId, jobData);

    const response = await apiConnector(
      "PUT",
      `${UPDATE_JOB_API}/${jobId}`,
      jobData,
      { Authorization: `Bearer ${token}` },
      null
    );

    toast.dismiss(toastId);
    console.log("✅ Update job response:", response.data);

    if (response.data.success) {
      toast.success("Job updated successfully!");
    }

    return response.data;
  } catch (error) {
    toast.dismiss(toastId);
    console.error("❌ UPDATE_JOB Error:", error);
    toast.error(error.response?.data?.message || "Failed to update job");
    throw error;
  }
};

// Delete job
export const deleteJob = async (jobId, token) => {
  const toastId = toast.loading("Deleting job...");
  try {
    console.log("📤 Deleting job:", jobId);

    const response = await apiConnector(
      "DELETE",
      `${DELETE_JOB_API}/${jobId}`,
      null,
      { Authorization: `Bearer ${token}` },
      null
    );

    toast.dismiss(toastId);
    console.log("✅ Delete job response:", response.data);

    if (response.data.success) {
      toast.success("Job deleted successfully!");
    }

    return response.data;
  } catch (error) {
    toast.dismiss(toastId);
    console.error("❌ DELETE_JOB Error:", error);
    toast.error(error.response?.data?.message || "Failed to delete job");
    throw error;
  }
};

// Update job status
export const updateJobStatus = async (jobId, status, token) => {
  const toastId = toast.loading("Updating status...");
  try {
    console.log("📤 Updating job status:", jobId, status);

    const response = await apiConnector(
      "PATCH",
      `${UPDATE_JOB_STATUS_API}/${jobId}/status`,
      { status },
      { Authorization: `Bearer ${token}` },
      null
    );

    toast.dismiss(toastId);
    console.log("✅ Update status response:", response.data);

    if (response.data.success) {
      toast.success(`Job status updated to ${status}!`);
    }

    return response.data;
  } catch (error) {
    toast.dismiss(toastId);
    console.error("❌ UPDATE_JOB_STATUS Error:", error);
    toast.error(error.response?.data?.message || "Failed to update status");
    throw error;
  }
};
