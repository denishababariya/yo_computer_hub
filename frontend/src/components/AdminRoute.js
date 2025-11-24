import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getToken, getUser } from '../utils/auth';

const AdminRoute = ({ children }) => {
  const token = getToken();
  const user = getUser();
  const location = useLocation();

  if (!token || !user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;

