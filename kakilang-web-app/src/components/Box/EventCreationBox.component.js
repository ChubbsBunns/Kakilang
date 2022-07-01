import React, { useState } from "react";
import Proptypes from "prop-types";
import axios from "axios";

import "./EventCreationBox.component.css";

/**
 * This component is a creation page for events
 */
function EventCreationBox({ owner }) {
  /** Define the server to connect */
  const server = process.env.REACT_APP_SERVER;
  const [preview, setPreview] = useState("/defaultEvent.jpg");

  /** Handle Events  **/
  const imgSetting = (event) => {
    const error = (message = null) => {
      message ? alert(message) : null;
      setPreview("/defaultEvent.jpg");
      event.target.value = null;
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
  const handleSubmit = (e) => {
    e.preventDefault();

    // FormData for multer
    const eventData = new FormData(e.target);
    try {
      if (!owner._id || !owner.name) {
        throw new Error("Missing creator information");
      }
      eventData.append("ownerID", owner._id);
      eventData.append("ownerName", owner.name);
      owner.profileIMG
        ? eventData.append("profileIMG", owner.profileIMG)
        : null;
    } catch (error) {
      alert("Oops it looks like an error occured\nTry again later");
      console.log(error);
      return;
    }

    // Prevent Bad input
    for (let [k, v] of eventData.entries()) {
      (v, k) => console.log(k, ":", v);
      if (k !== "eventImage" && !v) {
        alert("Please fill in the compulsory fields");
        window.location.reload(false);
        return;
      }
    }
    //Success
    axios
      .post(server + "/events/create", eventData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
    eventData.forEach((v, k) => console.log(k, ":", v));
  };

  const today = new Date().toISOString().split(".")[0];

  return (
    <div className="event-creation-component">
      <div className="event-details-title">Event Details:</div>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
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
            <input type="datetime-local" name="eventDate" min={today} />
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
  );
}

EventCreationBox.propTypes = {
  owner: Proptypes.shape({
    name: Proptypes.string.isRequired,
    profileIMG: Proptypes.string,
    _id: Proptypes.string.isRequired,
  }),
};

export default EventCreationBox;
