import React from "react";
import { Navigate } from "react-router-dom"; // Make sure to import Navigate

const isAuthenticated = () => {
  // Authentication logic to determine if the user is logged in
  return localStorage.getItem("isLoggedIn") === "true";
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  return children; // If authenticated, render the child components
};

export default ProtectedRoute;
