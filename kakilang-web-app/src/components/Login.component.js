import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

/**Import Components & CSS */
/*
import Button from "@mui/material/Button";
import BigLogo from "./BigLogo.component";
*/
import FrontPageLogo from "./images/Kakilang_Frontpage.JPG";
import Logo from "./images/KakilangLogo.png";

const defaultProfile = "/defaultProfile.png";
import "./Login.component.css";

/**
 * Login Component
 *
 * @component
 */
function Login({ setAuth, setUser }) {
  const server = process.env.REACT_APP_SERVER;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirect = "/myProfile";
  const goTo = useNavigate();

  /** Helper functions */
  function setDefaultIMG(user) {
    if (!user.profileIMG) {
      user.profileIMG = defaultProfile;
      return user;
    } else {
      return user;
    }
  }

  /** Handle input changes*/
  const emailChange = (event) => setEmail(event.target.value);
  const passwordChange = (event) => setPassword(event.target.value);
  // Goes to the login page if successfull, otherwise alert an error message
  const handleSubmit = (event) => {
    event.preventDefault();

    const user = { email: email.toLowerCase(), password: password };

    //@TODO setup USER details
    axios.post(server + "/login", user).then((res) => {
      localStorage.setItem("token", res.data.token);
      if (res.data.login) {
        setAuth(true);
        setUser(setDefaultIMG(res.data.user));
        goTo(redirect);
      } else {
        setAuth(false);
        setUser({});
        alert(res.data.message);
      }
    });
  };

  /**
   * Checks for JsonWebToken to autologin on web refreshed
   */
  useEffect(() => {
    axios
      .get(server + "/getUser", {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((res) => {
        const user = res.data.user;
        if (res.data.isLoggedIn) {
          setAuth(true);
          setUser(setDefaultIMG(user));
          goTo(redirect);
        } else {
          setAuth(false);
          setUser({});
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);
  {
    /** 
      <div
        className="Login-Component"
        style={{ backgroundImage: `url(${FrontPageLogo})` }}
      ></div>
      */
  }
  return (
    <div className="Login-Entire-Component">
      <div
        className="Login-Image"
        style={{ backgroundImage: `url(${FrontPageLogo})` }}
      ></div>
      <div className="Login-Page">
        {/**
        <BigLogo />
         */}

        <div className="Login-window">
          <div className="Kakilang-Login-Logo">
            <img src={Logo}></img>
          </div>
          <form onSubmit={handleSubmit}>
            <h1> Log In </h1>
            <TextField
              id="outlined-basic"
              label="Username/Email"
              variant="outlined"
              type="email"
              name="Email"
              value={email}
              onChange={emailChange}
            />
            {/** 
            <input />
            <input />
            */}
            <br />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              name="Password"
              value={password}
              /*
              placeholder="Password"
              */
              onChange={passwordChange}
              /*Style for Material UI*/
              sx={{
                backgroundColor: "#fce9dc",
                margin: 2,
              }}
            />

            <br />
            <Button
              variant="contained"
              className="submit"
              type="submit"
              value="Log In"
            >
              Sign In!
            </Button>
          </form>
          {/**
          <Button variant="contained">I AM A BABY</Button>
           */}
          <i>
            {" "}
            Need an account? <a href="/register"> Sign up </a>{" "}
          </i>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  setAuth: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Login;
