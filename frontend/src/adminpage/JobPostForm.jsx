// ==========================================
// src/pages/JobPostingPage.jsx - Stable Input Typing
// ==========================================

import { useState, useEffect } from "react";
import {
  createJob,
  getAdminJobs,
  updateJob,
  deleteJob,
  updateJobStatus,
} from "../Service/Operation/jobApi";

// ✅ Move InputField OUTSIDE component so it is not redefined on every render
const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  rows = null,
  error = null,
  value,
  onChange,
}) => (
  <div className="flex flex-col">
    <label
      htmlFor={name}
      className="text-xs xs:text-sm sm:text-base font-semibold text-gray-900 mb-1 xs:mb-1.5 sm:mb-2"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {rows ? (
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={onChange}
        className={`w-full border rounded-lg p-2 xs:p-2.5 sm:p-3 text-xs xs:text-sm sm:text-base resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all ${
          error ? "border-red-500 bg-red-50" : "border-blue-200 bg-white"
        }`}
      />
    ) : (
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full border rounded-lg p-2 xs:p-2.5 sm:p-3 text-xs xs:text-sm sm:text-base focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all ${
          error ? "border-red-500 bg-red-50" : "border-blue-200 bg-white"
        }`}
      />
    )}
    {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
  </div>
);

const JobPostingPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    jobType: "",
    experience: "",
    salary: "",
    description: "",
    requirements: "",
    benefits: "",
  });

  const token = localStorage.getItem("adminToken");
  console.log("Token", token)

  useEffect(() => {
    if (token) {
      fetchJobs();
    }
  }, [token]);

  const fetchJobs = async () => {
    try {
      const response = await getAdminJobs(token, 1, 10);
      if (response.success) {
        setJobs(response.data || []);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "Job title is required";
    if (!formData.department.trim()) errors.department = "Department is required";
    if (!formData.location.trim()) errors.location = "Location is required";
    if (!formData.jobType) errors.jobType = "Job type is required";
    if (!formData.experience.trim()) errors.experience = "Experience is required";
    if (!formData.description.trim() || formData.description.length < 50) {
      errors.description = "Description must be at least 50 characters";
    }
    if (!formData.requirements.trim())
      errors.requirements = "Requirements are required";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear error for this field
    if (fieldErrors[name]) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setFieldErrors({});

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError("Please fix all errors");
      return;
    }

    setLoading(true);
    try {
      if (editingId) {
        await updateJob(editingId, formData, token);
        setEditingId(null);
      } else {
        await createJob(formData, token);
      }

      resetForm();
      await fetchJobs();
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    // setFormData({
    //   title: "",
    //   department: "",
    //   location: "",
    //   jobType: "",
    //   experience: "",
    //   salary: "",
    //   description: "",
    //   requirements: "",
    //   benefits: "",
    // });
    setShowForm(false);
    setEditingId(null);
    setFieldErrors({});
  };

  const handleEdit = (job) => {
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      jobType: job.jobType,
      experience: job.experience || "",
      salary: job.salary || "",
      description: job.description,
      requirements: job.requirements,
      benefits: job.benefits || "",
    });
    setEditingId(job._id);
    setShowForm(true);
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteJob(jobId, token);
      setJobs((jobs) => jobs.filter((j) => j._id !== jobId));
    } catch (err) {
      setError("Delete failed");
    }
  };

  const handleClose = async (jobId) => {
    try {
      await updateJobStatus(jobId, "closed", token);
      setJobs((jobs) =>
        jobs.map((j) =>
          j._id === jobId ? { ...j, status: "closed" } : j
        )
      );
    } catch (err) {
      setError("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-100 to-cyan-50 py-6 sm:py-10 md:py-16 lg:py-20 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="text-center mb-6 sm:mb-10 md:mb-12">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-4 bg-gradient-to-r from-blue-800 via-sky-600 to-cyan-500 bg-clip-text text-transparent">
            Job Management Portal
          </h1>
          <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-700 max-w-xs xs:max-w-sm sm:max-w-2xl mx-auto">
            Post, manage, and track job openings from one centralized platform.
          </p>
        </header>

        {/* Messages */}
        {success && (
          <div
            role="status"
            className="bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded-lg mb-4 xs:mb-5 sm:mb-6 text-xs xs:text-sm"
          >
            ✓ {success}
          </div>
        )}
        {error && (
          <div
            role="alert"
            className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-4 xs:mb-5 sm:mb-6 text-xs xs:text-sm"
          >
            ✕ {error}
          </div>
        )}

        {/* Main */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur border border-blue-100 rounded-lg sm:rounded-xl p-4 xs:p-5 sm:p-6 shadow-lg space-y-4 xs:space-y-5 sm:space-y-6">
              <div>
                <div className="text-2xl xs:text-3xl sm:text-4xl font-bold text-blue-600">
                  {jobs.filter((j) => j.status === "active").length}
                </div>
                <p className="text-xs xs:text-sm text-gray-600">
                  Active Jobs
                </p>
              </div>
              <div>
                <div className="text-2xl xs:text-3xl sm:text-4xl font-bold text-green-600">
                  {jobs.length}
                </div>
                <p className="text-xs xs:text-sm text-gray-600">
                  Total Jobs
                </p>
              </div>
              <button
                onClick={() => {
                  if (showForm && !editingId) resetForm();
                  else if (!showForm) setShowForm(true);
                  else setShowForm(!showForm);
                }}
                className="w-full px-4 xs:px-5 py-2 xs:py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95 text-xs xs:text-sm sm:text-base"
              >
                {showForm ? "Cancel" : "+ Post New Job"}
              </button>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-2">
            {/* Form */}
            {showForm && (
              <div className="bg-white/80 backdrop-blur border border-blue-100 rounded-lg sm:rounded-xl p-4 xs:p-5 sm:p-6 md:p-8 shadow-lg mb-4 xs:mb-6 sm:mb-8">
                <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-blue-800 mb-4 xs:mb-5 sm:mb-6">
                  {editingId ? "Edit Job" : "Post New Job"}
                </h2>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-5">
                    <InputField
                      label="Job Title"
                      name="title"
                      placeholder="e.g., Senior React Developer"
                      required
                      error={fieldErrors.title}
                      value={formData.title}
                      onChange={handleChange}
                    />
                    <InputField
                      label="Department"
                      name="department"
                      placeholder="e.g., Engineering"
                      required
                      error={fieldErrors.department}
                      value={formData.department}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-5">
                    <InputField
                      label="Location"
                      name="location"
                      placeholder="e.g., Indore, India"
                      required
                      error={fieldErrors.location}
                      value={formData.location}
                      onChange={handleChange}
                    />
                    <div className="flex flex-col">
                      <label
                        htmlFor="jobType"
                        className="text-xs xs:text-sm sm:text-base font-semibold text-gray-900 mb-1 xs:mb-1.5 sm:mb-2"
                      >
                        Job Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="jobType"
                        name="jobType"
                        value={formData.jobType}
                        onChange={handleChange}
                        className={`w-full border rounded-lg p-2 xs:p-2.5 sm:p-3 text-xs xs:text-sm sm:text-base focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all ${
                          fieldErrors.jobType
                            ? "border-red-500 bg-red-50"
                            : "border-blue-200 bg-white"
                        }`}
                      >
                        <option value="">Select Job Type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Freelance">Freelance</option>
                      </select>
                      {fieldErrors.jobType && (
                        <p className="text-red-600 text-xs mt-1">
                          {fieldErrors.jobType}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-5">
                    <InputField
                      label="Experience"
                      name="experience"
                      placeholder="e.g., 3-5 years"
                      required
                      error={fieldErrors.experience}
                      value={formData.experience}
                      onChange={handleChange}
                    />
                    <InputField
                      label="Salary"
                      name="salary"
                      placeholder="e.g., ₹60,000 - ₹100,000"
                      value={formData.salary}
                      onChange={handleChange}
                    />
                  </div>

                  <InputField
                    label="Description"
                    name="description"
                    placeholder="Describe the role..."
                    rows={5}
                    required
                    error={fieldErrors.description}
                    value={formData.description}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Requirements"
                    name="requirements"
                    placeholder="List requirements..."
                    rows={4}
                    required
                    error={fieldErrors.requirements}
                    value={formData.requirements}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Benefits"
                    name="benefits"
                    placeholder="List benefits..."
                    rows={3}
                    value={formData.benefits}
                    onChange={handleChange}
                  />

                  <div className="flex gap-2 xs:gap-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-4 xs:px-5 sm:px-6 py-2.5 xs:py-3 sm:py-3.5 bg-gradient-to-r from-blue-700 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg active:scale-95 transition-all text-xs xs:text-sm sm:text-base disabled:opacity-60"
                    >
                      {loading
                        ? "Processing..."
                        : editingId
                        ? "Update Job"
                        : "Post Job"}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex-1 px-4 xs:px-5 sm:px-6 py-2.5 xs:py-3 sm:py-3.5 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all text-xs xs:text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Jobs List */}
            <div className="space-y-3 xs:space-y-4 sm:space-y-5">
              <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">
                Your Jobs
              </h3>
              {jobs.length === 0 ? (
                <div className="bg-white/80 border border-blue-100 rounded-lg p-6 text-center">
                  <p className="text-gray-600 text-sm">
                    No jobs yet. Post one to get started.
                  </p>
                </div>
              ) : (
                jobs.map((job) => (
                  <article
                    key={job._id}
                    className="bg-white/80 backdrop-blur border border-blue-100 rounded-lg sm:rounded-xl p-4 xs:p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="flex flex-col xs:flex-row xs:items-start xs:justify-between gap-2 xs:gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-base xs:text-lg sm:text-xl font-bold text-blue-700 truncate">
                            {job.title}
                          </h4>
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded ${
                              job.status === "active"
                                ? "bg-green-100 text-green-700"
                                : job.status === "closed"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {job.status}
                          </span>
                        </div>
                        <p className="text-xs xs:text-sm text-gray-600">
                          {job.department} • {job.location} • {job.jobType}
                        </p>
                        <p className="text-xs xs:text-sm text-gray-700 mt-1 line-clamp-2">
                          {job.description}
                        </p>
                      </div>
                      <div className="flex gap-2 xs:flex-col w-full xs:w-auto">
                        <button
                          onClick={() => handleEdit(job)}
                          className="flex-1 xs:flex-none px-3 xs:px-4 py-1.5 xs:py-2 text-xs xs:text-sm bg-blue-100 text-blue-700 font-semibold rounded hover:bg-blue-200 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            job.status === "active"
                              ? handleClose(job._id)
                              : handleDelete(job._id)
                          }
                          className={`flex-1 xs:flex-none px-3 xs:px-4 py-1.5 xs:py-2 text-xs xs:text-sm font-semibold rounded transition ${
                            job.status === "active"
                              ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                              : "bg-red-100 text-red-700 hover:bg-red-200"
                          }`}
                        >
                          {job.status === "active" ? "Close" : "Delete"}
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingPage;
