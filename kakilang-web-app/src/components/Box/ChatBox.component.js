import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

import MessageBox from "./MessageBox.component";
const defaultProfile = "./defaultProfile.png";
import "./MessageBox.component.css";

const server = process.env.REACT_APP_SERVER;

/**
 * Chat Box
 *
 *
 *
 * @component
 */
function ChatBox({ user, target }) {
  const [message, setMessage] = useState("");
  const [messageBox, setMessageBox] = useState([]);
  const navigate = useNavigate();

  /** Handle changes */
  const messageEdit = (event) => setMessage(event.target.value);
  const goToProfile = () => navigate("../profile");

  /** Get different Messages from different people */
  const getMessageAsync = async () => {
    const response = await axios
      .get(server + "/message/get", {
        params: {
          token: localStorage.getItem("token"),
          email: user.email,
        },
      })
      .then((res) => {
        return res.data.messages;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
    const targetResponse = response.filter(({ toEmail, fromEmail }) => {
      return toEmail == target.email || fromEmail == target.email;
    });
    setMessageBox(targetResponse);
  };

  useEffect(() => {
    const newSocket = io(server);
    newSocket.on("connect", () => {
      console.log(newSocket.id);
    });
    newSocket.on("connection_error", (error) =>
      console.log("Failed to connect: ", error)
    );
    newSocket.on("message", (message) => {
      message;
      getMessageAsync();
    });

    getMessageAsync();

    return () => newSocket.close();
  }, [target]);

  /**
   * Handles when the message is sent.
   * Refreshes the page when sent
   */
  function handleSend(event) {
    event.preventDefault();
    const messageData = {
      fromEmail: user.email,
      toEmail: target.email,
      message: message,
    };
    axios.post(server + "/message/send", messageData).then((res) => {
      res.data;
    });
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
              <img src={target.profileIMG || defaultProfile} />
            </div>
            <div className="active">
              <div className="active-padding"></div>
              <h4>{target.name}</h4>
              <h6>Last seen 3 hours ago...</h6>
              <div className="active-padding"></div>
            </div>

            <div className="header-icons">
              <a onClick={goToProfile}>
                <i className="fa fa-info-circle"></i>
              </a>
            </div>
            <div></div>
          </div>
          <div className="msg-header-padding"></div>
        </div>

        <div className="chat-page">
          <MessageBox
            messages={messageBox}
            currentUser={user}
            targetUser={target}
          />
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
    email: PropTypes.string.isRequired,
  }).isRequired,
  target: PropTypes.shape({
    profileIMG: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default ChatBox;
