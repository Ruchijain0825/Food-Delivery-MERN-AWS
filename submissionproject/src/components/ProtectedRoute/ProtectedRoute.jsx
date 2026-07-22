import React, { useContext } from "react";
import { FoodContext } from "../../context/FoodContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(FoodContext);//token globalcontext se aa raha hai 

  // fallback: localStorage se bhi check karo
  const storedToken = localStorage.getItem("token");

  if (!token && !storedToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;