/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";

/**
 * This functional component is used purely for testing purposes
 */
function TestFunction() {
  /** Define the server to connect */
  const server = process.env.REACT_APP_SERVER;
  const [preview, setPreview] = useState("/defaultEvent.jpg");
  const [owner, setOwner] = useState();

  /** Handlers */
  const createOwner = () => {
    const fake = {
      name: "Fake creater2",
      _id: "62b2bff4dd64d02a57a6b5ec",
    };
    setOwner(fake);
    console.log("Success");
  };
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
  return (
    <>
      <button onClick={createOwner}> Create An Owner </button>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="String" name="name" placeholder="Name*" />
        <br />
        <input type="String" name="description" placeholder="Description*" />
        <br />
        <label>
          Event begin date*: <span />
          <input type="datetime-local" name="eventDate" />
        </label>
        <br />
        <input type="file" name="eventImage" onChange={imgSetting} />
        <br />
        <img src={preview} alt="Unable to display image" />
        <br />
        <input type="Submit" name="Create new Event" />
      </form>
    </>
  );
}

export default TestFunction;
