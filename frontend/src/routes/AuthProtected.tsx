import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../helper/auth_helper";

interface AuthProtectedProps {
  children: ReactNode;
}

const AuthProtected: React.FC<AuthProtectedProps> = ({ children }) => {
  const accessToken = getToken();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AuthProtected;
