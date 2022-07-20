import React, { useState } from "react";
import axios from "axios";
import "./Registration.component.css";
import { useNavigate } from "react-router-dom";

/*
import Dropdown from "./Dropdown.component";
*/
import { majors, houses, floors, ccas } from "./staticVariables";
import Logo from "./images/KakilangLogo.png";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

/*
 */

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
      <div className="Login-window">
        <div className="Kakilang-Registration-Logo">
          <img src={Logo}></img>
        </div>
        <FormControl onSubmit={handleSubmit} encType="multipart/form-data">
          <h1> Register an account </h1>
          <TextField
            type="string"
            name="Name"
            value={name}
            onChange={nameChange}
            label="Name"
            sx={{}}
            size="small"
          />
          <TextField
            type="email"
            name="Email"
            value={email}
            onChange={emailChange}
            label="Email Address"
            sx={{
              margin: 1,
            }}
            size="small"
          />
          <TextField
            type="password"
            name="Password"
            value={password}
            onChange={passwordChange}
            label="Password"
            size="small"
          />
          {/** 
          <Dropdown
            label="Major"
            options={majors}
            value={major}
            onChange={majorSetting}
          />
          <Dropdown
            label="House"
            options={houses}
            value={house}
            onChange={houseSetting}
          />
          <Dropdown
            label="Floor"
            options={floors}
            value={floor}
            onChange={floorSetting}
          />
          */}
          <FormControl>
            <InputLabel>Major</InputLabel>
            <Select
              labelId="Major"
              id="Major"
              label="Major"
              onChange={majorSetting}
            >
              {majors.map((major) => {
                return (
                  <MenuItem value={major.value} key="major">
                    {major.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>House</InputLabel>
            <Select
              labelId="House"
              id="House"
              label="House"
              onChange={houseSetting}
            >
              {houses.map((house) => {
                return (
                  <MenuItem value={house.value} key="house">
                    {house.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Floor</InputLabel>
            <Select
              labelId="Floor"
              id="Floor"
              label="Floor"
              onChange={floorSetting}
            >
              {floors.map((floor) => {
                return (
                  <MenuItem value={floor.value} key="floor">
                    {floor.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>CCAs</InputLabel>
            <Select labelId="CCAs" id="CCAs" label="CCAs" onChange={ccaSetting}>
              {ccas.map((ccas) => {
                return (
                  <MenuItem value={ccas.value} key="ccas">
                    {ccas.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          {/**
          <Dropdown
            label="CCAs"
            options={ccas}
            value={cca}
            onChange={ccaSetting}
          />
            */}
          <div className="File-Input">
            <input type="file" name="myImage" onChange={imgSetting} />
          </div>
          <div>
            <img
              src={preview}
              alt="Unable to display image"
              width={"130px"}
              height={"130px"}
            />
          </div>
          <Button
            className="submit"
            variant="contained"
            type="submit"
            value="Register"
            sx={{
              padding: 0.4,
              margin: 0.2,
            }}
          >
            Register
          </Button>{" "}
        </FormControl>
      </div>
    </>
  );
}

// default variables for options

export default Registration;
