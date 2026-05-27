import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RoleRoute = ({ children, allowedRoles }) => {
  const user = useSelector((state) => state.auth.user);

  // not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // role check
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleRoute;
