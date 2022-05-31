import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.component.css";
import { useNavigate } from "react-router-dom";
import BigLogo from "./BigLogo.component";

/**
 * Login Component
 *
 * @component
 */
function Login() {
  /**
   * @memberof Login
   * @property {email} email - The user's email.
   * @property {function} setEmail - Changes the email value
   * @property {password} password - The user's password.
   * @property {function} setPassword - Changes the password value
   */
  const [email, setEmail] = useState("example@email.com");
  const [password, setPassword] = useState("password123");

  /**
   * Handles when email input box is changed
   * @param {SyntheticBaseEvent} event
   */
  const emailChange = (event) => setEmail(event.target.value);

  /**
   * Handles when password input box is changed
   * @param {SyntheticBaseEvent} event
   */
  const passwordChange = (event) => setPassword(event.target.value);

  /**
   * Goes to websubpages.
   * See react-route-dom useNavigate()
   *
   * @example
   * goTo("/home"); goes to https://website.com/currentSub/home
   * goTo("https://website.com/", {replace: true}) goes to https://website.com/
   */
  const goTo = useNavigate();

  /** Load env and get the server name */
  const server =
    process.env.SERVER || "https://kakilang-server-app.herokuapp.com";

  /**
   * Handles when the submit button is pressed
   * Goes to the login page if successfull, otherwise alert an error message
   *
   * @param {SyntheticBaseEvent} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    const user = { email: email, password: password };

    axios.post(server + "/login", user).then((res) => {
      localStorage.setItem("token", res.data.token);

      const handle = email.split("@")[0];
      res.data.login ? goTo("/home/" + handle) : alert(res.data.message);
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
        const handle = res.data.email?.split("@")[0];
        res.data.isLoggedIn ? goTo("/home/" + handle) : null;
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
            onChange={emailChange}
          />
          <br />
          <input
            type="password"
            name="Password"
            value={password}
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

export default Login;
