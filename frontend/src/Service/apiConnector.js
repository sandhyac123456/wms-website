// ==========================================
// utils/apiConnector.js - Enhanced API Connector
// ==========================================

import axios from "axios";
const react_base_url= import.meta.env.VITE_BASE_URL || "http://localhost:3000/api/v1";
// console.log("API Base URL:", react_base_url);

// Create axios instance with default config
export const axiosInstance = axios.create({
  baseURL: react_base_url,
  timeout: 10000,
  withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json"
  // }
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add token from localStorage if available
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Universal API Connector
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE, PATCH)
 * @param {string} url - API endpoint URL
 * @param {object} bodyData - Request body data (for POST, PUT, PATCH)
 * @param {object} headers - Custom headers
 * @param {object} params - Query parameters
 * @returns {Promise} API response
 */
export const apiConnector = (method, url, bodyData = null, headers = null, params = null) => {
  return axiosInstance({
    method: method.toUpperCase(),
    url: url,
    data: bodyData || null,
    headers: headers || {},
    params: params || null,
  });
};

export default apiConnector;
