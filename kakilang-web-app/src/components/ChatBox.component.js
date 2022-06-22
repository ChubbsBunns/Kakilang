import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import MessageBox from "./MessageBox.component";
import io from "socket.io-client";
import "./MessageBox.component.css";

const server = process.env.REACT_APP_SERVER;

/**
 * Chat Box
 *
 *
 *
 * @component
 */
function ChatBox({ img, name, email }) {
  const [message, setMessage] = useState("");
  const [messageBox, setMessageBox] = useState([]);

  /** Handle message input changes */
  const messageEdit = (event) => setMessage(event.target.value);

  /** Get different Messages from different people */
  const getMessageAsync = async () => {
    const response = await axios
      .get(server + "/message/get", {
        params: {
          token: localStorage.getItem("token"),
          email: localStorage.getItem("email"),
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
      return toEmail == email || fromEmail == email;
    });
    console.log("filtered: ", targetResponse);
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
      console.log(message);
      getMessageAsync();
    });
    
    getMessageAsync();

    return () => newSocket.close();
  }, [email]);

  /**
   * Handles when the message is sent.
   * Refreshes the page when sent
   */
  function handleSend(event) {
    event.preventDefault();
    const messageData = {
      fromEmail: localStorage.getItem("email"),
      toEmail: email,
      message: message,
    };
    axios.post(server + "/message/send", messageData).then((res) => {
      console.log(res.data);
    });
    setMessage("");
  }

  const targetUser = { img: img, name: name, email: email };
  const currentUSer = {
    img: localStorage.getItem("img"),
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
  };

  return (
    <div className="container">
      <div className="msg-header">
        <div className="msg-header-img">
          <img src={img} />
        </div>
        <div className="active">
          <h4>{name}</h4>
          <h6>Last seen 3 hours ago...</h6>
        </div>
        <div className="header-icons">
          <i className="fa fa-info-circle"></i>
        </div>
      </div>
      <div className="chat-page">
        <MessageBox
          messages={messageBox}
          currentUser={currentUSer}
          targetUser={targetUser}
        />
        <div className="msg-bottom">
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
  );
}

ChatBox.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default ChatBox;

/**
 * Dylan's sending UI
 *
 * <div className="msg-bottom">
 *      <div className="input-group">
 *        <input
 *          type="text"
 *          className="form-control"
 *          placeholder="write message..."
 *        /></input>
 *        <div className="input-group-append">
 *          <span className="input-group-text">
 *            <i className="fa fa-paper-plane"></i>
 *          </span>
 *        </div>
 *      </div>
 *    </div>
 */
