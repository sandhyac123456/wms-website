// ==========================================
// services/contactOperations.js
// ==========================================

import toast from "react-hot-toast";
import { apiConnector } from "../utils/apiConnector";
import { contactEndPoints } from "../config/contactEndPoints";

const {
  CREATE_CONTACT_API,
  GET_ALL_CONTACTS_API,
  GET_CONTACT_BY_ID_API,
  UPDATE_CONTACT_STATUS_API,
  DELETE_CONTACT_API,
} = contactEndPoints;

// Create contact
export const createContact = async (contactData) => {
  const toastId = toast.loading("Sending message...");
  try {
    const response = await apiConnector(
      "POST",
      CREATE_CONTACT_API,
      contactData,
      null,
      null
    );

    toast.dismiss(toastId);

    if (response.data.success) {
      toast.success("Message sent successfully!");
    }

    return response.data;
  } catch (error) {
    toast.dismiss(toastId);
    console.error("❌ CREATE_CONTACT Error:", error);
    toast.error(error.response?.data?.message || "Failed to send message");
    throw error;
  }
};

// Get all contacts (admin)
export const getAllContacts = async (page = 1, limit = 10, filters = {}, token) => {
  const toastId = toast.loading("Loading contacts...");
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("page", page);
    queryParams.append("limit", limit);
    if (filters.status) queryParams.append("status", filters.status);
    if (filters.search) queryParams.append("search", filters.search);

    const response = await apiConnector(
      "GET",
      `${GET_ALL_CONTACTS_API}?${queryParams.toString()}`,
      null,
      { Authorization: `Bearer ${token}` },
      null
    );

    toast.dismiss(toastId);
    return response.data;
  } catch (error) {
    toast.dismiss(toastId);
    console.error("❌ GET_ALL_CONTACTS Error:", error);
    toast.error(error.response?.data?.message || "Failed to fetch contacts");
    return { success: false, data: [], pagination: {} };
  }
};

// Update contact status
export const updateContactStatus = async (contactId, status, reply = "", token) => {
  const toastId = toast.loading("Updating status...");
  try {
    const response = await apiConnector(
      "PATCH",
      `${UPDATE_CONTACT_STATUS_API}/${contactId}/status`,
      { status, reply },
      { Authorization: `Bearer ${token}` },
      null
    );

    toast.dismiss(toastId);

    if (response.data.success) {
      toast.success("Status updated successfully!");
    }

    return response.data;
  } catch (error) {
    toast.dismiss(toastId);
    console.error("❌ UPDATE_CONTACT_STATUS Error:", error);
    toast.error(error.response?.data?.message || "Failed to update status");
    throw error;
  }
};

// Delete contact
export const deleteContact = async (contactId, token) => {
  const toastId = toast.loading("Deleting contact...");
  try {
    const response = await apiConnector(
      "DELETE",
      `${DELETE_CONTACT_API}/${contactId}`,
      null,
      { Authorization: `Bearer ${token}` },
      null
    );

    toast.dismiss(toastId);

    if (response.data.success) {
      toast.success("Contact deleted successfully!");
    }

    return response.data;
  } catch (error) {
    toast.dismiss(toastId);
    console.error("❌ DELETE_CONTACT Error:", error);
    toast.error(error.response?.data?.message || "Failed to delete contact");
    throw error;
  }
};

export default {
  createContact,
  getAllContacts,
  updateContactStatus,
  deleteContact,
};
