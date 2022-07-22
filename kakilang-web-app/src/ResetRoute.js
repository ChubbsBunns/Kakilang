import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

function ResetRoute({ reset, redirectPath = "/" }) {
  useEffect(() => {
    reset();
  }, []);

  return <Navigate to={redirectPath} replace />;
}

ResetRoute.propTypes = {
  reset: PropTypes.func.isRequired,
  redirectPath: PropTypes.string,
};

export default ResetRoute;
