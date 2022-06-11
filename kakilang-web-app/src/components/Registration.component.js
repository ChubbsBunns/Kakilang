import React, { useState } from "react";
import axios from "axios";
import "./Login.component.css";
import { useNavigate } from "react-router-dom";
import BigLogo from "./BigLogo.component";
import Dropdown from "./Dropdown.component";

// default variables for options
const houses = [
  { label: "I'll rather not say", value: null },
  { label: "Saren", value: "Saren" },
  { label: "Ianthe", value: "Ianthe" },
  { label: "Ursala", value: "Ursala" },
  { label: "Nocturna", value: "Nocturna" },
  { label: "Triton", value: "Triton" },
  { label: "Ankaa", value: "Ankaa" },
];
const floors = Array.from({ length: 19 }, (_, i) => 3 + i * 1).map((num) => {
  return { value: num, label: "Cinnamon Wing Floor " + num };
});
floors[0] = { value: null, label: "I'll rather not say" };
const ccas = [
  { value: null, label: "I'll rather not say" },
  { value: "Floorball", label: "Floorball" },
  { value: "USP Tabletop", label: "USP Tabletop" },
  { value: "UStetris", label: "UStetris" },
];
const majors = [
  { value: null, label: "I'll rather not say" },
  { value: "Computer Science", label: "Computer Science" },
  { value: "Information Systems", label: "Information Systems" },
  { value: "Computer Engineering", label: "Computer Engineering" },
  { value: "Business Analytics", label: "Business Analytics" },
  { value: "Information Security", label: "Information Security" },
];

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
  const [name, setName] = useState("Example Surname");
  const [major, setMajor] = useState();
  const [cca, setCCA] = useState();
  const [floor, setFloor] = useState();
  const [house, setHouse] = useState();

  const emailChange = (event) => setEmail(event.target.value);
  const passwordChange = (event) => setPassword(event.target.value);
  const nameChange = (event) => setName(event.target.value);
  const majorSetting = (event) => setMajor(event.target.value);
  const floorSetting = (event) => setFloor(event.target.value);
  const houseSetting = (event) => setHouse(event.target.value);
  const ccaSetting = (event) => setCCA(event.target.value);

  const goTo = useNavigate();
  const server = process.env.REACT_APP_SERVER;

  // eslint-disable-next-line no-unused-vars
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      name: name,
      major: major,
      house: house,
      floor: floor,
      cca: cca,
      email: email,
      password: password,
    };
    axios.post(server + "/register/add", user).then((res) => {
      res.data.isSuccessful
        ? goTo("/", { replace: true })
        : alert(res.data.message);
      console.log(res.data.message);
    });
  };

  // eslint-disable-next-line no-unused-vars
  const debugSubmit = (event) => {
    event.preventDefault();
    const user = {
      name: name,
      major: major,
      house: house,
      floor: floor,
      cca: cca,
      email: email,
      password: password,
    };
    console.log(user);
  };

  return (
    <>
      <BigLogo />
      <div className="Login-window">
        <form onSubmit={handleSubmit}>
          <h1> Register an account </h1>
          <input type="string" name="Name" value={name} onChange={nameChange} />
          <br />
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
          <Dropdown
            label="Major"
            options={majors}
            value={major}
            onChange={majorSetting}
          />
          <br />
          <Dropdown
            label="House"
            options={houses}
            value={house}
            onChange={houseSetting}
          />
          <br />
          <Dropdown
            label="Floor"
            options={floors}
            value={floor}
            onChange={floorSetting}
          />
          <br />
          <Dropdown
            label="CCAs"
            options={ccas}
            value={cca}
            onChange={ccaSetting}
          />
          <br />
          <input className="submit" type="submit" value="Register" />
        </form>
      </div>
    </>
  );
}

export default Registration;
