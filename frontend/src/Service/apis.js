// ==========================================
// config/jobEndPoints.js - Simple API Endpoints
// ==========================================

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const jobEndPoints = {
  // ==========================================
  // PUBLIC ENDPOINTS
  // ==========================================
  
  // GET /api/career/jobs?page=1&limit=10
  GET_ALL_JOBS_API: `/jobs`,
  
  // GET /api/career/jobs/search?keyword=react
  SEARCH_JOBS_API: `/jobs/search`,
  
  // GET /api/career/jobs/:id
  GET_JOB_BY_ID_API: `/jobs`,

  // ==========================================
  // ADMIN ENDPOINTS
  // ==========================================
  
  // POST /api/career/jobs/create
  CREATE_JOB_API: `/jobs/create`,
  
  // GET /api/career/jobs/admin/my-jobs?page=1&limit=10
  GET_ADMIN_JOBS_API: `/jobs/admin/my-jobs`,
  
  // PUT /api/career/jobs/:id
  UPDATE_JOB_API: `/jobs`,
  
  // PATCH /api/career/jobs/:id/status
  UPDATE_JOB_STATUS_API: `/jobs`,
  
  // DELETE /api/career/jobs/:id
  DELETE_JOB_API: `/jobs`,
};

export default jobEndPoints;

export const jobApplicationEndPoints = {
  APPLY_FOR_JOB_API: `/applications/apply`,
  GET_ALL_APPLICATIONS_API: `/applications`,
  GET_APPLICATION_BY_ID_API: `/applications`,
  UPDATE_APPLICATION_STATUS_API: `/applications`,
  DELETE_APPLICATION_API: `/applications`,
};


export const contactEndPoints = {
  CREATE_CONTACT_API: `/contact/create`,
  GET_ALL_CONTACTS_API: `/contact/get-all-contact`,
  GET_CONTACT_BY_ID_API: `/contact`,
  UPDATE_CONTACT_STATUS_API: `/contact/status`,
  DELETE_CONTACT_API: `/contact/delete`,
};

export const adminAuthEndPoints = {
  ADMIN_LOGIN_API: `/admin/auth/login`,
  ADMIN_VERIFY_API: `/admin/auth/verify`,
  ADMIN_LOGOUT_API: `/admin/auth/logout`,
  ADMIN_PROFILE_API: `/admin/auth/profile`,
};

export const blogEndpoints = {
  // Admin
  CREATE_BLOG_API: "/blog/create",
  GET_ALL_BLOGS_ADMIN_API: "/blog/admin",
  DELETE_BLOG_API: "/blog/delete",
  UPDATE_BLOG_API: "/blog/update",       
  GET_SINGLE_BLOG_ADMIN_API: "/blog/admin",

  // Public
GET_ALL_BLOGS_API: "/blog",
GET_SINGLE_BLOG_API: "/blog",
GET_ALL_CATEGORIES_API: "/blog/categories",
};

export const categoryEndpoints = {

  // 🔴 Admin
  CREATE_CATEGORY_API: "/category/create",
  UPDATE_CATEGORY_API: "/category/update",
  DELETE_CATEGORY_API: "/category/delete",
  GET_ALL_CATEGORIES_ADMIN_API: "/category/admin",

  // 🟢 Public
  GET_ALL_CATEGORIES_API: "/category",
};

export const aiEndPoints = {
  AI_CHAT_API: "/ai/chat"
};

export const projectEndpoints = {
  // Admin
  CREATE_PROJECT_API: "/projects/create",
  GET_ALL_PROJECTS_ADMIN_API: "/projects/admin",
  DELETE_PROJECT_API: "/projects/delete",
  // UPDATE_PROJECT_API: "/projects/update",

  // Public
  GET_ALL_PROJECTS_API: "/projects",
};