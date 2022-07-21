import React, { useState } from "react";
import Proptypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router";
import { confirm } from "react-confirm-box";

import "./EventCreationBox.component.css";

/**
 * This component is a editing page for a event
 */
function EventEditingBox({ owner, target }) {
  /** Define the server to connect */
  const server = process.env.REACT_APP_SERVER;
  const oldIMG = target.img;
  const [name, setName] = useState(target.name);
  const [description, setDescription] = useState(target.description);
  const [eventDate, setEventDate] = useState(target.eventDate);
  const [preview, setPreview] = useState(target.img || "/defaultEvent.jpg");
  const navigate = useNavigate();

  /** Handle Events  **/
  const nameChange = (e) => setName(e.target.value);
  const descChange = (e) => setDescription(e.target.value);
  const dateChange = (e) => setEventDate(e.target.value);
  const imgSetting = (event) => {
    const error = (message = null) => {
      message ? alert(message) : null;
      setPreview(target.img || "/defaultEvent.jpg");
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
  const handleDelete = async () => {
    const result = await confirm("Delete this event?");
    let oldIMG = "";
    if (target.img && target.img !== "/defaultEvent.jpg") {
      oldIMG = target.img;
    }

    if (result) {
      axios
        .delete(server + "/events/" + target._id, {
          data: {
            oldIMG: oldIMG,
          },
        })
        .then((res) => {
          console.log(res.data.update);
          navigate("/myEvents");
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    } else {
      console.log("Event is not deleted!");
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
    } else if (owner._id !== target.ownerID) {
      alert("Oops it looks like an error occured\nTry again later");
      console.log("Illegal editing access!");
      return;
    }

    // Additional input
    oldIMG !== "/defaultEvent.jpg" ? eventData.append("oldIMG", oldIMG) : null;

    // Prevent Bad input
    for (let [k, v] of eventData.entries()) {
      if (k !== "eventImage" && !v) {
        alert("Please fill in the compulsory fields");
        window.location.reload(false);
        return;
      }
    }
    //Success
    axios
      .patch(server + "/events/" + target._id, eventData)
      .then((res) => {
        console.log(res.data.update);
        navigate("/myEvents");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const today = new Date().toISOString().split(".")[0].slice(0, -3);

  return (
    <div className="event-creation-component">
      <div className="event-details-title">Event Details:</div>
      <div className="event-details-input">
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="event-input-field">
            <p className="event-edit-title">Event Title:</p>
            <input
              className="input-name"
              type="String"
              name="name"
              value={name}
              onChange={nameChange}
              placeholder="Name*"
            />
          </div>
          <div className="event-input-field">
            <p className="event-edit-title">Event Description:</p>
            <textarea
              className="input-description"
              type="String"
              name="description"
              value={description}
              onChange={descChange}
              placeholder="Description*"
            ></textarea>
          </div>
          <div className="event-input-field">
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
          </div>
          <div className="event-input-field">
            <p className="event-edit-title">Event Image (Optional):</p>
            <div className="input-image">
              <input type="file" name="eventImage" onChange={imgSetting} />
            </div>
            <div className="preview-image">
              <img src={preview} alt="Unable to display image" />
            </div>
          </div>
          <div className="event-input-field">
            <input
              className="submit-button"
              type="Submit"
              name="Create new Event"
            />
          </div>
        </form>
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
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
