import React, { useContext } from "react";
import { AuthContext } from "../components/contexts/MyAuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Access Context
  const { user, loading } = useContext(AuthContext);
// console.log(user,loading);
  if (loading) {
    return <span className="loading loading-ball loading-lg"></span>;
  }

  if (user) {
    return children;
  }
  // \end{code}
  return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
