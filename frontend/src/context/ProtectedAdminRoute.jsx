// ==========================================
// src/components/ProtectedAdminRoute.jsx - Fixed
// ==========================================

import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedAdminRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const checkToken = () => {
      try {
        const token = localStorage.getItem("adminToken");

        console.log("🔍 Checking token...");

        if (!token) {
          console.warn("❌ No token found");
          setIsValid(false);
          return;
        }

        // Decode JWT token
        const parts = token.split(".");
        if (parts.length !== 3) {
          console.warn("❌ Invalid token format");
          setIsValid(false);
          return;
        }

        // Decode payload (without verification)
        const payload = JSON.parse(atob(parts[1]));
        console.log("📝 Token payload:", payload);

        // Get expiry time (in seconds)
        const expiresAt = payload.exp;

        if (!expiresAt) {
          console.warn("❌ No expiry time in token");
          setIsValid(false);
          return;
        }

        // Current time in seconds
        const currentTime = Math.floor(Date.now() / 1000);

        console.log("⏰ Current time:", currentTime);
        console.log("⏰ Expires at:", expiresAt);
        console.log("⏰ Time remaining:", expiresAt - currentTime, "seconds");

        // Check if expired
        if (currentTime > expiresAt) {
          console.warn("❌ Token expired!");
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminEmail");
          setIsValid(false);
          return;
        }

        console.log("✅ Token is valid");
        setIsValid(true);
      } catch (error) {
        console.error("❌ Token verification error:", error);
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminEmail");
        setIsValid(false);
      }
    };

    checkToken();
  }, []);

  // Loading state
  if (isValid === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isValid) {
    return <Navigate to="/admin/login" replace />;
  }

  // Authenticated - show content
  return children;
};

export default ProtectedAdminRoute;
