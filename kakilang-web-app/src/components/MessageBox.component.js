import React from "react";
import PropTypes from "prop-types";

/**
 * MessageBox
 *
 *
 *
 * @component
 */
function MessageBox({ messages }) {
  //for debugging
  //console.log(messages);

  return messages ? (
    <div className="MessageBox">
      {messages.map(({ _id, fromEmail, message }) => {
        return (
          <p key={_id}>
            From {fromEmail} : {message}
          </p>
        );
      })}
    </div>
  ) : (
    <></>
  );
}

MessageBox.propTypes = {
  messages: PropTypes.array,
};

export default MessageBox;
