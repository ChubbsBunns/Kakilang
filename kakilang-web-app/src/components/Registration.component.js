import React, { useState } from "react";
import axios from "axios";
import "./Login.component.css";
import { useNavigate } from "react-router-dom";
import BigLogo from "./BigLogo.component";
import Dropdown from "./Dropdown.component";

/**
 * User Register component
 * It is a Form with 8 inputs:
 * email, password, name, major,
 * cca, floor,  house, profileImage
 *
 *
 */
function Registration() {
  /** Login Information */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /** Profile Information */
  const [name, setName] = useState("");
  const [major, setMajor] = useState();
  const [cca, setCCA] = useState();
  const [floor, setFloor] = useState();
  const [house, setHouse] = useState();
  const [img, setIMG] = useState();
  const [preview, setPreview] = useState("/defaultProfile.png");

  /** Handle inputs */
  const emailChange = (event) => setEmail(event.target.value);
  const passwordChange = (event) => setPassword(event.target.value);
  const nameChange = (event) => setName(event.target.value);
  const majorSetting = (event) => setMajor(event.target.value);
  const floorSetting = (event) => setFloor(event.target.value);
  const houseSetting = (event) => setHouse(event.target.value);
  const ccaSetting = (event) => setCCA(event.target.value);
  // setting the img also changes the preview
  const imgSetting = (event) => {
    if (event.target.files.length == 0) {
      setPreview("/defaultProfile.png");
      return false;
    } else if (event.target.files.length > 1) {
      alert("Please upload only 1 image");
      event.target.value = null;
      setPreview("/defaultProfile.png");
      return false;
    } else if (event.target.files[0].size > 9e6) {
      alert("Please upload an image smaller than 9 MB ");
      setPreview("/defaultProfile.png");

      event.target.value = null;
      return false;
    } else {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        setPreview(reader.result);
      };
      setIMG(file);
    }
  };

  /** Define the server to connect */
  const server = process.env.REACT_APP_SERVER;
  /** Define page navigation method  */
  const goTo = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // FormData format for multer
    const registrationData = new FormData();

    // FormData format requires appending with name
    registrationData.append("name", name);
    registrationData.append("email", email);
    registrationData.append("password", password);
    major ? registrationData.append("major", major) : null;
    house ? registrationData.append("house", house) : null;
    floor ? registrationData.append("floor", floor) : null;
    cca ? registrationData.append("cca", cca) : null;
    registrationData.append("myImage", img);

    // Axios post with headers for Multer to work
    axios
      .post(server + "/register/add", registrationData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.isSuccessful) {
          alert("Registeration Successful");
          goTo("/", { replace: true });
        } else {
          alert(res.data.message);
          goTo("/register", { replace: true });
        }
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <>
      <BigLogo />
      <div className="Login-window">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <h1> Register an account </h1>
          <input
            type="string"
            name="Name"
            value={name}
            onChange={nameChange}
            placeholder="Name"
          />
          <br />
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
          <input type="file" name="myImage" onChange={imgSetting} />
          <br />
          <img src={preview} alt="Unable to display image" />
          <br />
          <input className="submit" type="submit" value="Register" />
        </form>
      </div>
    </>
  );
}

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

export default Registration;
