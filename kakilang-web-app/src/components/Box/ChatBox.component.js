import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

import MessageBox from "./MessageBox.component";
import "./MessageBox.component.css";

/**
 * Chat Box
 *
 *
 *
 * @component
 */
function ChatBox({ user, target }) {
  /** Debug inputs */

  const server = process.env.REACT_APP_SERVER;
  const [message, setMessage] = useState("");
  const [messageBox, setMessageBox] = useState([]);
  const [convoID, setConvoID] = useState(target.convoID);
  const navigate = useNavigate();

  /** Handle changes */
  const messageEdit = (event) => setMessage(event.target.value);
  const goToProfile = () => navigate("../profile");
  const goToEvent = () => navigate("..");

  /** Get different Messages from different people */
  const getMessageAsync = async (convoID) => {
    const response = await axios
      .get(server + "/message/convo/" + convoID)
      .then((res) => {
        return res.data.messages;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
    const targetResponse = response;
    setMessageBox(targetResponse);
  };

  useEffect(() => {
    setConvoID(target.convoID);
  }, [target]);

  useEffect(() => {
    const newSocket = io(server);
    newSocket.on("connect", () => {
      console.log(newSocket.id);
    });
    newSocket.on("connection_error", (error) =>
      console.log("Failed to connect: ", error)
    );
    newSocket.on("message", (data) => {
      console.log("socket: ", data);
      if (data.convoID == convoID) {
        console.log("Updating Messages!");
        getMessageAsync(convoID);
      }
    });

    convoID ? getMessageAsync(convoID) : null;

    return () => newSocket.close();
  }, [convoID]);

  async function newConvo() {
    const messageData = {
      senderID: user._id,
      targetID: target._id,
      message: message,
    };
    const convoID = await axios
      .post(server + "/message/convo", messageData)
      .then((res) => {
        console.log(res.data);
        target.convoID = res.data.convoID;
        return res.data.convoID;
      });
    setConvoID(convoID);
    console.log(convoID);
  }

  function existingConvo() {
    const messageData = {
      senderID: user._id,
      message: message,
    };
    console.log("old");
    axios
      .post(server + "/message/convo/" + convoID, messageData)
      .then((res) => {
        console.log(res.data);
      });
  }

  /**
   * Handles when the message is sent.
   * Refreshes the page when sent
   */
  function handleSend(event) {
    event.preventDefault();
    console.log(convoID);
    if (convoID) {
      existingConvo();
    } else {
      newConvo();
    }
    setMessage("");
  }

  return (
    <div className="UI" id="text_interface">
      <div className="container">
        <div className="msg-header">
          <div className="msg-header-padding"></div>
          <div className="msg-header-components">
            <div></div>
            <div className="msg-header-img">
              <img src={target.img} />
            </div>
            <div className="active">
              <div className="active-padding"></div>
              <h4>{target.name}</h4>
              <div className="active-padding"></div>
            </div>

            <div className="header-icons">
              <a onClick={target.eventDate ? goToEvent : goToProfile}>
                <i className="fa fa-info-circle"></i>
              </a>
            </div>
            <div></div>
          </div>
          <div className="msg-header-padding"></div>
        </div>

        <div className="chat-page">
          <MessageBox messages={messageBox} currentUser={user} />
          <div className="msg-bottom">
            <div></div>
            <form onSubmit={handleSend} className="input-group">
              <input
                type="string"
                name="message"
                className="form-control"
                value={message}
                onChange={messageEdit}
                style={{ display: "inline" }}
              />
              <input
                className="input-group-text"
                type="submit"
                style={{ display: "inline" }}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

ChatBox.propTypes = {
  user: PropTypes.shape({
    profileIMG: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  target: PropTypes.shape({
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    convoID: PropTypes.string,
    _id: PropTypes.string,
    eventDate: PropTypes.string,
  }).isRequired,
};

export default ChatBox;
