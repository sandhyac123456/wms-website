import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { blogEndpoints } from "../apis";

const {
  CREATE_BLOG_API,
  GET_ALL_BLOGS_API,
  GET_ALL_BLOGS_ADMIN_API,
  GET_SINGLE_BLOG_API,
  DELETE_BLOG_API,
  UPDATE_BLOG_API,   
  GET_SINGLE_BLOG_ADMIN_API,
  
} = blogEndpoints;

/* ================= PUBLIC ================= */

// GET ALL BLOGS (Public)
export const getAllBlogs = async (category = null, page = 1) => {
  try {
    let url = GET_ALL_BLOGS_API;

    const params = new URLSearchParams();

    if (category) {
      params.append("category", category);
    }

    params.append("page", page);
    params.append("limit", 6); // per page 3 blogs

    url = `${GET_ALL_BLOGS_API}?${params.toString()}`;

    const response = await apiConnector("GET", url);

    return response.data;
  } catch (error) {
    console.log(error);
    toast.error("Failed to fetch blogs");
  }
};

// GET SINGLE BLOG
export const getSingleBlog = async (slug) => {
  try {
    const response = await apiConnector(
      "GET",
      `${GET_SINGLE_BLOG_API}/${slug}`
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch blog");
  }
};

/* ================= ADMIN ================= */

// GET ALL BLOGS (Admin)
export const getAllBlogsAdmin = async (token) => {
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_BLOGS_ADMIN_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch admin blogs");
  }
};

// CREATE BLOG
export const createBlog = async (formData, token) => {
  const toastId = toast.loading("Creating blog...");
  try {
    const response = await apiConnector(
      "POST",
      CREATE_BLOG_API,
      formData,
      {
        Authorization: `Bearer ${token}`,
        // "content-Type":"multipart/form-data"
        
      }
    );

    toast.success("Blog created successfully");
    return response.data;
  } catch (error) {
    toast.error("Failed to create blog");
  }
  toast.dismiss(toastId);
};

// DELETE BLOG
export const deleteBlog = async (id, token) => {
  try {
    const response = await apiConnector(
      "DELETE",
      `${DELETE_BLOG_API}/${id}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    toast.success("Blog deleted");
    return response.data;
  } catch (error) {
    toast.error("Failed to delete blog");
  }
};


// UPDATE BLOG
export const updateBlog = async (id, formData, token) => {
  const toastId = toast.loading("Updating blog...");
  try {
    const response = await apiConnector(
      "PUT",
      `${UPDATE_BLOG_API}/${id}`,
      formData,
      {
        Authorization: `Bearer ${token}`,
    //    "content-Type":"multipart/form-data"
      }
    );

    toast.success("Blog updated successfully");
    return response.data;
  } catch (error) {
    toast.error("Failed to update blog");
  }
  toast.dismiss(toastId);
};

// GET SINGLE BLOG (Admin - for Edit)
export const getSingleBlogAdmin = async (id, token) => {
  try {
    const response = await apiConnector(
      "GET",
      `${GET_SINGLE_BLOG_ADMIN_API}/${id}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return response.data;
  } catch (error) {
    toast.error("Failed to fetch blog");
  }
};

