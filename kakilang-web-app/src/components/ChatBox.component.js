import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import MessageBox from "./MessageBox.component";

const server = process.env.SERVER || "http://localhost:2500";

/**
 * Chat Box
 *
 *
 *
 * @component
 */
function ChatBox({ email }) {
  const [message, setMessage] = useState();
  const [messageBox, setMessageBox] = useState([]);

  const messageEdit = (event) => setMessage(event.target.value);

  /**
   * Get different Messages from different people
   */
  useEffect(() => {
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
    getMessageAsync();
  }, [email]);

  /**
   * Handles when the message is sent.
   * Refreshes the page when sent
   */
  function handleSend() {
    const messageData = {
      fromEmail: localStorage.getItem("email"),
      toEmail: email,
      message: message,
    };
    axios.post(server + "/message/send", messageData).then((res) => {
      console.log(res.data);
    });
  }

  return (
    <div className="ChatBox">
      <MessageBox messages={messageBox} />
      <form onSubmit={handleSend}>
        <input
          type="string"
          name="message"
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
