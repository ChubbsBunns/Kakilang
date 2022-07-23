import React from "react";
import { useNavigate } from "react-router-dom";
import "./buttons.css";

import Button from "@mui/material/Button";

function Logout() {
  const navigate = useNavigate();

  const onClick = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <Button className="Logout" onClick={onClick} color="primary">
      <p>Logout</p>
    </Button>
  );
}

export default Logout;
