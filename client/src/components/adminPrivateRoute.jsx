import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminPrivateRoute = ({ children }) => {

  const role = useSelector((state) => state.user?.user.user.role);

  if (role !== 'admin' && role !== 'course_advisor') {
    return <Navigate to="/home/classes" />;
  }

  
  return children;
};

export default AdminPrivateRoute;
