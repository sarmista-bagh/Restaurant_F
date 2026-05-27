import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  // ❌ NOT LOGGED IN → redirect to login
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }} // helps redirect back after login
      />
    );
  }

  // ✅ LOGGED IN → allow access
  return children;
};

export default ProtectedRoute;
