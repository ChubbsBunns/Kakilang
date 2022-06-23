import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isAuth, redirectPath, children }) {
  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  redirectPath: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};

export default ProtectedRoute;
