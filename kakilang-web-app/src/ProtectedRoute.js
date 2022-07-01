import React from "react";
import PropTypes from "prop-types";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute({ isAuth, redirectPath, children }) {
  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}

ProtectedRoute.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  redirectPath: PropTypes.string.isRequired,
  children: PropTypes.any,
};

export default ProtectedRoute;
