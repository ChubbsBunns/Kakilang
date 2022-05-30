import React, { useState } from "react";
import axios from "axios";
import "./Login.component.css";
import { useNavigate } from "react-router-dom";
import BigLogo from "./BigLogo.component";

/**
 * User Register component
 *
 */
function Registration() {
  /**
   * @memberof Register
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

  /**
   * Handles when the submit button is pressed
   * Goes to the login page if successful, otherwise alert an error message
   *
   * @param {SyntheticBaseEvent} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { email: email, password: password };
    axios.post("http://localhost:2500/register/add", user).then((res) => {
      res.data.isSuccessful
        ? goTo("/", { replace: true })
        : alert(res.data.message);
      console.log(res.data.message);
    });
  };

  return (
    <>
      <BigLogo />
      <div className="Login-window">
        <form onSubmit={handleSubmit}>
          <h1> Register an account </h1>
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
          <input className="submit" type="submit" value="Register" />
        </form>
      </div>
    </>
  );
}

export default Registration;
