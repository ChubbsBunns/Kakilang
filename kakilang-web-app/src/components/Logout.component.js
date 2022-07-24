import React from "react";
import axios from "axios";
import setAuthToken from "../common/token";
import { useNavigate } from "react-router-dom";
import "./buttons.css";

import Button from "@mui/material/Button";

function Logout() {
  const navigate = useNavigate();
  const server = process.env.REACT_APP_SERVER;

  const onClick = () => {
    const auth = setAuthToken();
    axios
      .delete(server + "/auth", auth)
      .then((res) => {
        console.log(res);
        navigate("/logout", { replace: true });
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    localStorage.clear();
  };

  return (
    <Button className="Logout" onClick={onClick} color="primary">
      <p>Logout</p>
    </Button>
  );
}

export default Logout;
