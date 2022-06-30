import React from "react";
import { useNavigate } from "react-router-dom";
import "./buttons.css";

function Logout() {
  const navigate = useNavigate();

  const onClick = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <button className="Logout" onClick={onClick}>
      <p>Logout</p>
    </button>
  );
}

export default Logout;
