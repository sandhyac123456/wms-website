// ==========================================
// src/pages/AdminLogin.jsx - API Based, Simple & Clean
// ==========================================

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../Service/Operation/adminAuthApi"; // Link to your API ops file

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [fieldError, setFieldError] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Input change handler
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFieldError((prev) => ({ ...prev, [e.target.name]: "" }));
    setError("");
  };

  // Validate fields
  const validateForm = () => {
    const errors = {};
    if (!form.email.trim()) errors.email = "Email is required";
    if (!form.password.trim()) errors.password = "Password is required";
    return errors;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFieldError({});

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldError(errors);
      setLoading(false);
      return;
    }

    try {
      // API call to backend
      const res = await adminLogin(form.email, form.password, navigate);
      console.log("Admin Login Response:", res);

      if (res.success) {
        // Save admin data and token
        localStorage.setItem("adminToken", res.token);
        localStorage.setItem("adminEmail", res.admin?.email || form.email);

     
      } else {
        setError(res.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg border border-blue-100 max-w-md w-full p-8 space-y-6"
        autoComplete="off"
      >
        <h2 className="text-2xl font-bold text-blue-800 mb-2 text-center">Admin Login</h2>
        <p className="text-xs text-gray-500 mb-6 text-center">Only for authorized admin users.</p>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-2 rounded text-xs mb-3">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-900 mb-1">
              Admin Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="username"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none text-xs ${
                fieldError.email ? "border-red-500 bg-red-50" : "border-blue-200"
              }`}
              placeholder="Enter your admin email"
            />
            {fieldError.email && <p className="text-xs text-red-600 mt-1">{fieldError.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-medium text-gray-900 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
              className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none text-xs ${
                fieldError.password ? "border-red-500 bg-red-50" : "border-blue-200"
              }`}
              placeholder="Enter your password"
            />
            {fieldError.password && <p className="text-xs text-red-600 mt-1">{fieldError.password}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-700 text-white font-bold py-2.5 rounded-lg mt-4 shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
