// src/components/ApplyModal.jsx - SEO-Friendly & Fully Responsive

import { useState } from "react";
import axios from "axios";

const ApplyModal = ({ job, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    qualification: "",
    coverLetter: "",
  });

  const [resume, setResume] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // Validation functions
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!formData.phone) {
      errors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }
    
    if (!formData.gender) {
      errors.gender = "Please select a gender";
    }
    
    if (!formData.dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
    }
    
    if (!formData.qualification.trim()) {
      errors.qualification = "Qualification is required";
    }
    
    if (!resume) {
      errors.resume = "Resume is required";
    }
    
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear field error on change
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: "" });
    }
  };

  const handleResume = (e) => {
    setResume(e.target.files[0]);
    if (fieldErrors.resume) {
      setFieldErrors({ ...fieldErrors, resume: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setErrorMsg("Please fill all required fields correctly.");
      return;
    }

    setIsSubmitting(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    data.append("selectedJobTitle", job?.title || "");
    data.append("resume", resume);

    try {
      const res = await axios.post("http://localhost:3000/api/v1/applications/apply", data);
      setSuccessMsg(res.data.message || "Application submitted successfully!");
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        gender: "",
        dateOfBirth: "",
        qualification: "",
        coverLetter: "",
      });
      setResume(null);
      setFieldErrors({});
      
      // Close after delay
      setTimeout(() => onClose(), 4000);
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong. Please try again.";
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 xs:p-4 sm:p-6 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="bg-white p-4 xs:p-5 sm:p-6 md:p-8 rounded-lg sm:rounded-xl md:rounded-2xl max-w-xs xs:max-w-sm sm:max-w-lg md:max-w-2xl w-full shadow-2xl border border-blue-100 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 xs:top-4 xs:right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-blue-600 text-xl xs:text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
          aria-label="Close dialog"
        >
          ×
        </button>

        {/* Modal Title */}
        <h2 
          id="modal-title"
          className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-extrabold text-blue-700 mb-2 xs:mb-3 sm:mb-4 md:mb-6 text-center pr-8"
        >
          Apply for{" "}
          <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
            {job?.title || "Position"}
          </span>
        </h2>
        <p id="modal-description" className="text-xs xs:text-sm text-gray-600 text-center mb-4 md:mb-6">
          Please fill out all required fields to submit your application.
        </p>

        {/* Error Alert */}
        {errorMsg && (
          <div 
            role="alert"
            aria-live="assertive"
            className="bg-red-50 border-l-4 border-red-500 text-red-700 px-3 xs:px-4 py-2 xs:py-3 rounded-md mb-4 text-xs xs:text-sm"
          >
            <strong>Error:</strong> {errorMsg}
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div 
            role="status"
            aria-live="polite"
            className="bg-green-50 border-l-4 border-green-500 text-green-700 px-3 xs:px-4 py-2 xs:py-3 rounded-md mb-4 text-xs xs:text-sm"
          >
            <strong>Success:</strong> {successMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 xs:space-y-4 sm:space-y-5">
          {/* Full Name & Email - Responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-5">
            <div>
              <label htmlFor="fullName" className="block text-xs xs:text-sm font-semibold text-gray-900 mb-1 xs:mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                onChange={handleChange}
                value={formData.fullName}
                required
                placeholder="Enter your full name"
                className={`w-full border rounded-lg p-2 xs:p-2.5 sm:p-3 focus:ring-2 focus:ring-blue-400 outline-none text-xs xs:text-sm ${
                  fieldErrors.fullName ? "border-red-500 bg-red-50" : "border-blue-200"
                }`}
                aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
              />
              {fieldErrors.fullName && (
                <p id="fullName-error" className="text-red-600 text-[10px] xs:text-xs mt-1">
                  {fieldErrors.fullName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-xs xs:text-sm font-semibold text-gray-900 mb-1 xs:mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                value={formData.email}
                required
                placeholder="your.email@example.com"
                className={`w-full border rounded-lg p-2 xs:p-2.5 sm:p-3 focus:ring-2 focus:ring-blue-400 outline-none text-xs xs:text-sm ${
                  fieldErrors.email ? "border-red-500 bg-red-50" : "border-blue-200"
                }`}
                aria-describedby={fieldErrors.email ? "email-error" : undefined}
              />
              {fieldErrors.email && (
                <p id="email-error" className="text-red-600 text-[10px] xs:text-xs mt-1">
                  {fieldErrors.email}
                </p>
              )}
            </div>
          </div>

          {/* Phone & Date of Birth */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-5">
            <div>
              <label htmlFor="phone" className="block text-xs xs:text-sm font-semibold text-gray-900 mb-1 xs:mb-1.5">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                onChange={handleChange}
                value={formData.phone}
                required
                placeholder="10-digit number"
                className={`w-full border rounded-lg p-2 xs:p-2.5 sm:p-3 focus:ring-2 focus:ring-blue-400 outline-none text-xs xs:text-sm ${
                  fieldErrors.phone ? "border-red-500 bg-red-50" : "border-blue-200"
                }`}
                pattern="[6-9]\d{9}"
                aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
              />
              {fieldErrors.phone && (
                <p id="phone-error" className="text-red-600 text-[10px] xs:text-xs mt-1">
                  {fieldErrors.phone}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="block text-xs xs:text-sm font-semibold text-gray-900 mb-1 xs:mb-1.5">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                onChange={handleChange}
                value={formData.dateOfBirth}
                required
                className={`w-full border rounded-lg p-2 xs:p-2.5 sm:p-3 focus:ring-2 focus:ring-blue-400 outline-none text-xs xs:text-sm ${
                  fieldErrors.dateOfBirth ? "border-red-500 bg-red-50" : "border-blue-200"
                }`}
                aria-describedby={fieldErrors.dateOfBirth ? "dateOfBirth-error" : undefined}
              />
              {fieldErrors.dateOfBirth && (
                <p id="dateOfBirth-error" className="text-red-600 text-[10px] xs:text-xs mt-1">
                  {fieldErrors.dateOfBirth}
                </p>
              )}
            </div>
          </div>

          {/* Qualification & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-5">
            <div>
              <label htmlFor="qualification" className="block text-xs xs:text-sm font-semibold text-gray-900 mb-1 xs:mb-1.5">
                Qualification <span className="text-red-500">*</span>
              </label>
              <input
                id="qualification"
                name="qualification"
                type="text"
                onChange={handleChange}
                value={formData.qualification}
                required
                placeholder="e.g., B.Tech, M.Tech, B.Sc"
                className={`w-full border rounded-lg p-2 xs:p-2.5 sm:p-3 focus:ring-2 focus:ring-blue-400 outline-none text-xs xs:text-sm ${
                  fieldErrors.qualification ? "border-red-500 bg-red-50" : "border-blue-200"
                }`}
                aria-describedby={fieldErrors.qualification ? "qualification-error" : undefined}
              />
              {fieldErrors.qualification && (
                <p id="qualification-error" className="text-red-600 text-[10px] xs:text-xs mt-1">
                  {fieldErrors.qualification}
                </p>
              )}
            </div>

            <div>
              <fieldset className="mb-1 xs:mb-1.5">
                <legend className="block text-xs xs:text-sm font-semibold text-gray-900 mb-2">
                  Gender <span className="text-red-500">*</span>
                </legend>
                <div className="space-y-1.5 xs:space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      onChange={handleChange}
                      checked={formData.gender === "Male"}
                      className="accent-blue-600 w-4 h-4"
                      required
                    />
                    <span className="text-xs xs:text-sm text-gray-700">Male</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      onChange={handleChange}
                      checked={formData.gender === "Female"}
                      className="accent-blue-600 w-4 h-4"
                      required
                    />
                    <span className="text-xs xs:text-sm text-gray-700">Female</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      onChange={handleChange}
                      checked={formData.gender === "Other"}
                      className="accent-blue-600 w-4 h-4"
                    />
                    <span className="text-xs xs:text-sm text-gray-700">Other</span>
                  </label>
                </div>
              </fieldset>
              {fieldErrors.gender && (
                <p className="text-red-600 text-[10px] xs:text-xs mt-1">
                  {fieldErrors.gender}
                </p>
              )}
            </div>
          </div>

          {/* Cover Letter */}
          <div>
            <label htmlFor="coverLetter" className="block text-xs xs:text-sm font-semibold text-gray-900 mb-1 xs:mb-1.5">
              Cover Letter <span className="text-gray-500">(Optional)</span>
            </label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              placeholder="Tell us why you're interested in this position..."
              onChange={handleChange}
              value={formData.coverLetter}
              className="w-full border border-blue-200 rounded-lg p-2 xs:p-2.5 sm:p-3 focus:ring-2 focus:ring-blue-400 outline-none resize-none min-h-[80px] sm:min-h-[100px] text-xs xs:text-sm"
              maxLength="500"
              aria-describedby="cover-letter-hint"
            />
            <p id="cover-letter-hint" className="text-[10px] xs:text-xs text-gray-500 mt-1">
              {formData.coverLetter.length}/500 characters
            </p>
          </div>

          {/* Resume Upload */}
          <div>
            <label htmlFor="resume" className="block text-xs xs:text-sm font-semibold text-gray-900 mb-1 xs:mb-1.5">
              Upload Resume <span className="text-red-500">*</span>
            </label>
            <input
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              required
              onChange={handleResume}
              className={`w-full border rounded-lg p-2 xs:p-2.5 sm:p-3 bg-blue-50 text-xs xs:text-sm cursor-pointer ${
                fieldErrors.resume ? "border-red-500" : "border-blue-200"
              }`}
              aria-describedby={fieldErrors.resume ? "resume-error" : "resume-hint"}
            />
            <p id="resume-hint" className="text-[10px] xs:text-xs text-gray-500 mt-1">
              Accepted formats: PDF, DOC, DOCX (Max: 5MB)
            </p>
            {fieldErrors.resume && (
              <p id="resume-error" className="text-red-600 text-[10px] xs:text-xs mt-1">
                {fieldErrors.resume}
              </p>
            )}
            {resume && (
              <p className="text-green-600 text-[10px] xs:text-xs mt-1">
                ✓ {resume.name} selected
              </p>
            )}
          </div>

          {/* Buttons - Responsive layout */}
          <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 sm:gap-4 mt-4 xs:mt-5 sm:mt-6 md:mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg shadow hover:from-blue-700 hover:to-blue-600 transition-all duration-200 px-4 xs:px-5 py-2 xs:py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed text-xs xs:text-sm sm:text-base"
              aria-busy={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
            <button
              onClick={onClose}
              type="button"
              className="flex-1 bg-gray-100 text-gray-600 rounded-lg px-4 xs:px-5 py-2 xs:py-2.5 sm:py-3 hover:bg-gray-200 transition-colors duration-200 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-xs xs:text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
