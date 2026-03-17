import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { projectEndpoints } from "../apis";

const {
  CREATE_PROJECT_API,
  GET_ALL_PROJECTS_API,
  GET_ALL_PROJECTS_ADMIN_API,
  DELETE_PROJECT_API
} = projectEndpoints;

/* ================= PUBLIC ================= */

// GET ALL PROJECTS (User)
export const getAllProjects = async () => {
  try {
    const response = await apiConnector("GET", GET_ALL_PROJECTS_API);
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error("Failed to fetch projects");
  }
};

/* ================= ADMIN ================= */

// GET ALL PROJECTS (Admin)
export const getAllProjectsAdmin = async (token) => {
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_PROJECTS_ADMIN_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch admin projects");
  }
};

// CREATE PROJECT
export const createProject = async (formData, token) => {
  const toastId = toast.loading("Creating project...");
  try {
    const response = await apiConnector(
      "POST",
      CREATE_PROJECT_API,
      formData,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    toast.success("Project created successfully");
    return response.data;

  } catch (error) {
    toast.error("Failed to create project");
  }
  toast.dismiss(toastId);
};

// DELETE PROJECT
export const deleteProject = async (id, token) => {
  try {
    const response = await apiConnector(
      "DELETE",
      `${DELETE_PROJECT_API}/${id}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    toast.success("Project deleted");
    return response.data;

  } catch (error) {
    toast.error("Failed to delete project");
  }
};