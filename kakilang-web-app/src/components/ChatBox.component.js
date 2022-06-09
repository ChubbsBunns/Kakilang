import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import MessageBox from "./MessageBox.component";
import io from "socket.io-client";

const server = process.env.SERVER || "http://localhost:2500";

/**
 * Chat Box
 *
 *
 *
 * @component
 */
function ChatBox({ email }) {
  const [message, setMessage] = useState("");
  const [messageBox, setMessageBox] = useState([]);

  const messageEdit = (event) => setMessage(event.target.value);

  /**
   * Get different Messages from different people
   */
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
    getMessageAsync();
  }, [email]);

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

    return () => newSocket.close();
  }, []);

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

  return (
    <div className="ChatBox">
      <MessageBox messages={messageBox} />
      <form onSubmit={handleSend}>
        <input
          type="string"
          name="message"
          value={message}
          onChange={messageEdit}
          style={{ display: "inline" }}
        />
        <input
          className="submit"
          type="submit"
          value="Send"
          style={{ display: "inline" }}
        />
      </form>
    </div>
  );
}

ChatBox.propTypes = {
  email: PropTypes.string.isRequired,
};

export default ChatBox;
