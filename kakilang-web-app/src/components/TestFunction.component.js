/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Logout from "./Logout.component";
import "./EventCreation.component.css";

/**
 * This functional component is used purely for testing purposes
 */
function TestFunction() {
  const getCurrentUser = () => {
    return {
      email: localStorage.getItem("email"),
      name: localStorage.getItem("name"),
      profileIMG: localStorage.getItem("img"),
    };
  };
  const [login, setLogin] = useState(getCurrentUser());

  const [preview, setPreview] = useState("/defaultEvent.jpg");

  const imgSetting = (event) => {
    const error = (message = null) => {
      message ? alert(message) : null;
      setPreview("/defaultEvent.jpg");
      return false;
    };
    if (event.target.files.length == 0) {
      error();
    } else if (event.target.files.length > 1) {
      error("Please upload only 1 image");
    } else if (event.target.files[0].size > 9e6) {
      error("Please upload an image smaller than 9 MB ");
    } else {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        setPreview(reader.result);
      };
    }
  };
  return (
    <div className="placeholder-holder">
      <div></div>
      <div></div>
      <div className="event-creation-component">
        <div className="event-details-title">Event Details:</div>
        <form encType="multipart/form-data">
          <input
            className="input-name"
            type="String"
            name="name"
            placeholder="Name*"
          />
          <br />
          <input
            className="input-description"
            type="String"
            name="description"
            placeholder="Description*"
          />
          <br />
          <div className="input-date-time">
            <label>
              Event begin date*: <span />
              <input type="datetime-local" name="eventDate" />
            </label>
          </div>
          <br />
          <div className="input-image">
            <input type="file" name="eventImage" onChange={imgSetting} />
          </div>
          <br />
          <div className="preview-image">
            <img src={preview} alt="Unable to display image" />
          </div>
          <br />
          <input
            className="submit-button"
            type="Submit"
            name="Create new Event"
          />
        </form>
      </div>
    </div>
    /*
    <>
      <Logout />
      {Object.entries(login).map(([k, v]) => {
        return (
          <p key={k}>
            {k}: {v}
          </p>
        );
      })}
    </>
    */
  );
}

export default TestFunction;
