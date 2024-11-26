import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthentication } from "../AuthenticationContext/AuthenticationContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthentication();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
