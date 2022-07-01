import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/**Import Components & CSS */
import BigLogo from "./BigLogo.component";
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

  return (
    <>
      <BigLogo />
      <div className="Login-window">
        <form onSubmit={handleSubmit}>
          <h1> Log In </h1>
          <input
            type="email"
            name="Email"
            value={email}
            placeholder="Email address"
            onChange={emailChange}
          />
          <br />
          <input
            type="password"
            name="Password"
            value={password}
            placeholder="Password"
            onChange={passwordChange}
          />
          <br />
          <input className="submit" type="submit" value="Log In" />
        </form>
        <i>
          {" "}
          Need an account? <a href="/register"> Sign up </a>{" "}
        </i>
      </div>
    </>
  );
}

Login.propTypes = {
  setAuth: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Login;
