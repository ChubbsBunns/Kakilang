import React from "react";
import PropTypes from "prop-types";
import "./MessageBox.component.css";

/**Messaging UI of the user
 *
 * @TODO actually work with the backend to make this usable
 *
 * @component
 */
function MessageBox({ messages, currentUser, targetUser }) {
  function renderReceivedMessage({ message, img, date, id }) {
    return (
      <div className="received-chats" key={id}>
        <div className="received-chats-img">
          <img src={img} className="dylan1-img" />
        </div>
        <div className="received-msg">
          <div className="received-msg-inbox">
            <p>{message}</p>
            <span className="time">{date}</span>
          </div>
        </div>
      </div>
    );
  }

  function renderOutgoingMessage({ message, img, date, id }) {
    return (
      <div className="outoing-chats" key={id}>
        <div className="outgoing-chats-msg">
          <p>{message}</p>
          <span className="time">{date}</span>
        </div>
        <div className="outoing-chats-img">
          <div className="outgoing-chats-img">
            <img src={img} className="dylan2-img" />
          </div>
        </div>
      </div>
    );
  }

  function parseDate(date) {
    const jsDate = new Date(date);
    const monthDay = jsDate.toLocaleString("default", {
      month: "long",
      day: "2-digit",
    });
    const time = jsDate
      .toLocaleDateString("default", {
        hour: "2-digit",
        minute: "2-digit",
      })
      .split(",")[1];
    return time + " | " + monthDay;
  }

  function RenderMessage() {
    return messages.map(({ fromEmail, message, createdAt, _id }) => {
      if (fromEmail === currentUser.email) {
        const prop = {
          message: message,
          img: currentUser.img,
          date: parseDate(createdAt),
          id: _id,
        };
        return renderOutgoingMessage(prop);
      } else {
        const prop = {
          message: message,
          img: targetUser.img,
          date: parseDate(createdAt),
          id: _id,
        };
        return renderReceivedMessage(prop);
      }
    });
  }

  return (
    <>
      <div className="msg-inbox">
        <div className="chats">
          <div className="msg-page">
            <RenderMessage />
          </div>
        </div>
      </div>
    </>
  );
}

MessageBox.propTypes = {
  messages: PropTypes.array,
  currentUser: PropTypes.object,
  targetUser: PropTypes.object,
};

export default MessageBox;
