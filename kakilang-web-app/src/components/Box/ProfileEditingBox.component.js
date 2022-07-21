import React, { useState } from "react";
import "./ProfileEditingBox.component.css";

import { majors, houses, floors, ccas, years } from "../staticVariables";

import imageTest from "./Dylan-img1.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

/**
 * Profile Editing Box
 *
 *
 *
 * @component
 */

//setting stuff

function ProfileEdit() {
  const registrationData = new FormData();
  /** Login Information */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /** Profile Information */
  const [name, setName] = useState("");
  const [bio, setBio] = useState();
  const [major, setMajor] = useState();
  const [cca, setCCA] = useState();
  const [floor, setFloor] = useState();
  const [house, setHouse] = useState();
  const [img, setIMG] = useState();
  const [setPreview] = useState("/defaultProfile.png");
  const [year, setYear] = useState();

  // FormData format requires appending with name
  registrationData.append("name", name);
  registrationData.append("email", email);
  registrationData.append("password", password);
  major ? registrationData.append("major", major) : null;
  house ? registrationData.append("house", house) : null;
  floor ? registrationData.append("floor", floor) : null;
  cca ? registrationData.append("cca", cca) : null;
  year ? registrationData.append("year", year) : null;
  bio ? registrationData.append("bio", bio) : null;
  registrationData.append("myImage", img);

  /** Handle inputs */
  const emailChange = (event) => setEmail(event.target.value);
  const passwordChange = (event) => setPassword(event.target.value);
  const nameChange = (event) => setName(event.target.value);
  const majorSetting = (event) => setMajor(event.target.value);
  const floorSetting = (event) => setFloor(event.target.value);
  const houseSetting = (event) => setHouse(event.target.value);
  const ccaSetting = (event) => setCCA(event.target.value);
  const yearSetting = (event) => setYear(event.target.value);
  const bioSetting = (event) => setBio(event.target.value);

  // setting the img also changes the preview
  const imgSetting = (event) => {
    if (event.target.files.length == 0) {
      setPreview("/defaultProfile.png");
      console.log("i did not set any image");
      return false;
    } else if (event.target.files.length > 1) {
      alert("Please upload only 1 image");
      event.target.value = null;
      setPreview("/defaultProfile.png");
      console.log("Uploaded more that one image");
      return false;
    } else if (event.target.files[0].size > 9e6) {
      alert("Please upload an image smaller than 9 MB ");
      setPreview("/defaultProfile.png");
      console.log("Image is too large");
      event.target.value = null;
      return false;
    } else {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        setPreview(reader.result);
        console.log("Successfully reads in image");
      };
      setIMG(file);
    }
  };

  return (
    <div className="editing-box">
      <h1>Edit Profile</h1>
      <div className="profile-info-input">
        <FormControl
          onSubmit={"WILLIAM IVE NO IDEA HOW FORMS WORK"}
          encType="multipart/form-data"
        >
          <img className="imagePreview" src={imageTest}></img>
          <div className="File-Input" onChange={imgSetting}>
            <input type="file" name="myImage" onChange={"insert change here"} />
          </div>
          <TextField
            type="string"
            name="Name"
            value={name}
            onChange={nameChange}
            label="Name"
            sx={{ margin: 1 }}
            size="small"
          />
          <TextField
            type="string"
            name="Bio"
            value={bio}
            onChange={bioSetting}
            label="Bio"
            sx={{ margin: 1 }}
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
          <TextField
            type="string"
            name="Interests!"
            value={""}
            onChange={""}
            label="Interests!"
            sx={{ margin: 1 }}
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
          <FormControl
            sx={{
              margin: 1,
            }}
          >
            <InputLabel>Year</InputLabel>
            <Select
              labelId="Year"
              id="Year"
              label="Year"
              size="small"
              onChange={yearSetting}
            >
              {years.map((year) => {
                return (
                  <MenuItem value={year.value} key="year">
                    {year.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl
            sx={{
              margin: 1,
            }}
          >
            <InputLabel>Major</InputLabel>
            <Select
              labelId="Major"
              id="Major"
              label="Major"
              size="small"
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
          <FormControl
            sx={{
              margin: 1,
            }}
          >
            <InputLabel>House</InputLabel>
            <Select
              labelId="House"
              id="House"
              label="House"
              size="small"
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
          <FormControl
            sx={{
              margin: 1,
            }}
          >
            <InputLabel>Floor</InputLabel>
            <Select
              labelId="Floor"
              id="Floor"
              label="Floor"
              size="small"
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
          <FormControl
            sx={{
              margin: 1,
            }}
          >
            <InputLabel>CCAs</InputLabel>
            <Select
              labelId="CCAs"
              id="CCAs"
              label="CCAs"
              onChange={ccaSetting}
              size="small"
            >
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
          <Button
            className="submit"
            variant="contained"
            type="submit"
            value="Save"
            sx={{
              padding: 0.4,
              margin: 0.2,
            }}
          >
            Save Edits
          </Button>{" "}
        </FormControl>
      </div>
    </div>
  );
}

export default ProfileEdit;
