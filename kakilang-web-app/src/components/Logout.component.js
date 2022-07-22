import React from "react";
import axios from "axios";
import setAuthToken from "../common/token";
import { useNavigate } from "react-router-dom";
import "./buttons.css";

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
    <button className="Logout" onClick={onClick}>
      <p>Logout</p>
    </button>
  );
}

export default Logout;
