import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";

const Protect = ({ children }) => {
  const { user, loading } = useAuth();
  

  if (loading) {
    return <h1>Loading...</h1>;
  }

 
  if (!user && !loading) {
    return <Navigate to="/login"/>;
  }

  return children;
};

export default Protect;