import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Get the token from localStorage
  const token = localStorage.getItem("token");

  // If a token exists, render the children (protected component)
  // Otherwise, redirect the user to the admin login page
  return token ? children : <Navigate to="/admin" />;
};

export default ProtectedRoute;
