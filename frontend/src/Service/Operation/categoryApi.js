import { apiConnector } from "../apiConnector";
import { categoryEndpoints } from "../apis";

// ================================
// CREATE CATEGORY (Admin)
// ================================
export const createCategory = async (data, token) => {
  try {
    const response = await apiConnector(
      "POST",
      categoryEndpoints.CREATE_CATEGORY_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return response.data;
  } catch (error) {
    console.log("CREATE CATEGORY ERROR:", error);
    return error.response?.data
  }
};

// ================================
// GET ALL CATEGORIES (Public)
// ================================
export const getAllCategories = async () => {
  try {
    const response = await apiConnector(
      "GET",
      categoryEndpoints.GET_ALL_CATEGORIES_API
    );

    return response.data;
  } catch (error) {
    console.log("GET ALL CATEGORIES ERROR:", error);
    return error.response?.data
  }
};

// ================================
// GET ALL CATEGORIES (Admin)
// ================================
export const getAllCategoriesAdmin = async (token) => {
  try {
    const response = await apiConnector(
      "GET",
      categoryEndpoints.GET_ALL_CATEGORIES_ADMIN_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return response.data;
  } catch (error) {
    console.log("GET ALL CATEGORIES ADMIN ERROR:", error);
    return error.response?.data
  }
};

// ================================
// UPDATE CATEGORY (Admin)
// ================================
export const updateCategory = async (id, data, token) => {
  try {
    const response = await apiConnector(
      "PUT",
      `${categoryEndpoints.UPDATE_CATEGORY_API}/${id}`,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return response.data;
  } catch (error) {
    console.log("UPDATE CATEGORY ERROR:", error);
    return error.response?.data
  }
};

// ================================
// DELETE CATEGORY (Admin)
// ================================
export const deleteCategory = async (id, token) => {
  try {
    const response = await apiConnector(
      "DELETE",
      `${categoryEndpoints.DELETE_CATEGORY_API}/${id}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return response.data;
  } catch (error) {
    console.log("DELETE CATEGORY ERROR:", error);
    return error.response?.data

  }
};