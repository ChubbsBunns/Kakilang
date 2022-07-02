import React, { useState } from "react";
import Proptypes from "prop-types";
import axios from "axios";

import "./EventCreationBox.component.css";
import { useNavigate } from "react-router";

/**
 * This component is a editing page for a event
 */
function EventEditingBox({ owner, target }) {
  /** Define the server to connect */
  const server = process.env.REACT_APP_SERVER;
  const oldIMG = target.eventIMG;
  const [name, setName] = useState(target.name);
  const [description, setDescription] = useState(target.description);
  const [eventDate, setEventDate] = useState(target.eventDate);
  const [preview, setPreview] = useState(
    target.eventIMG || "/defaultEvent.jpg"
  );
  const navigate = useNavigate();

  /** Handle Events  **/
  const nameChange = (e) => setName(e.target.value);
  const descChange = (e) => setDescription(e.target.value);
  const dateChange = (e) => setEventDate(e.target.value);
  const imgSetting = (event) => {
    const error = (message = null) => {
      message ? alert(message) : null;
      setPreview(target.eventIMG || "/defaultEvent.jpg");
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
    if (!owner._id || !owner.name) {
      alert("Oops it looks like an error occured\nTry again later");
      console.log("Missing creator information");
      return;
    } else if (owner._id !== target.owner.id) {
      alert("Oops it looks like an error occured\nTry again later");
      console.log("Illegal editing access!");
      return;
    }

    // Additional input
    oldIMG ? eventData.append("oldIMG", oldIMG) : null;

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
      .patch(server + "/events/update/" + target._id, eventData)
      .then((res) => {
        console.log(res.data.update);
        navigate("/myEvents");
      })
      .catch((err) => {
        console.log(err);
      });
    eventData.forEach((v, k) => console.log(k, ":", v));
  };

  const today = new Date().toISOString().split(".")[0].slice(0, -3);

  return (
    <div className="event-creation-component">
      <div className="event-details-title">Event Details:</div>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <input
          className="input-name"
          type="String"
          name="name"
          value={name}
          onChange={nameChange}
          placeholder="Name*"
        />
        <br />
        <textarea
          className="input-description"
          type="String"
          name="description"
          value={description}
          onChange={descChange}
          placeholder="Description*"
        ></textarea>
        <br />
        <div className="input-date-time">
          <label>
            Event begin date*: <span />
            <input
              type="datetime-local"
              name="eventDate"
              value={eventDate}
              onChange={dateChange}
              min={today}
              step="60"
            />
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

EventEditingBox.propTypes = {
  owner: Proptypes.shape({
    name: Proptypes.string.isRequired,
    profileIMG: Proptypes.string,
    _id: Proptypes.string.isRequired,
  }),
  target: Proptypes.object.isRequired,
};

export default EventEditingBox;
