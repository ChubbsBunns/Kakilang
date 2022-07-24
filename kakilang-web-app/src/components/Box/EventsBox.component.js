import React, { useEffect, useState } from "react";
import Proptypes from "prop-types";
import axios from "axios";

/** import Components & CSS **/
import "./EventsBox.component.css";
import { useNavigate } from "react-router";
import setAuthToken from "../../common/token";

function EventsBox({ user, target, setOwnership }) {
  /** Constants **/
  const server = process.env.REACT_APP_SERVER;
  const [canEdit, setCanEdit] = useState(false);
  const [registered, setRegistration] = useState(
    target.registeredIDs.includes(user._id) || target.ownerID == user._id
  );
  const navigate = useNavigate();
  const targetHandle = target.name.replace(/( )/gi, "-");
  const date = new Date(target.eventDate);
  const ddMonth = date.toLocaleDateString("default", {
    month: "long",
    day: "2-digit",
  });
  const time = date.toLocaleTimeString("default", {
    hour: "2-digit",
    minute: "2-digit",
  });

  /** Access event chat */
  const goToChat = () => navigate("chat");
  const updateRegisterAs = (isReg) => () => {
    if (isReg) {
      axios
        .post(
          server + "/events/" + target._id + "/" + user._id,
          {},
          setAuthToken()
        )
        .then((res) => {
          if (!res.status == 200) {
            console.log(res);
            return;
          }
          setRegistration(isReg);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .delete(
          server + "/events/" + target._id + "/" + user._id,
          setAuthToken()
        )
        .then((res) => {
          console.log(res);
          setRegistration(isReg);
        })
        .catch((err) => {
          console.log(err);
          console.log(err.data.message);
        });
    }
  };

  const chatAccess = (isReg) => {
    if (isReg) {
      if (!canEdit) {
        return (
          <>
            <div className="message-button">
              <a onClick={goToChat} className="fa-solid fa-message"></a>
            </div>
            <button
              className="event-edit-button"
              onClick={updateRegisterAs(false)}
            >
              Unregister
            </button>
          </>
        );
      } else {
        return (
          <>
            <div className="message-button">
              <a onClick={goToChat} className="fa-solid fa-message"></a>
            </div>
          </>
        );
      }
    } else {
      return (
        <button className="event-edit-button" onClick={updateRegisterAs(true)}>
          Register
        </button>
      );
    }
  };

  /** Access rights to edit **/
  const goToEdit = () => navigate("/myEvents/" + targetHandle + "/edit");
  useEffect(() => {
    if (user._id == target.ownerID) {
      setOwnership(true);
      setCanEdit(true);
    } else {
      setOwnership(false);
      setCanEdit(false);
    }
    setRegistration(
      target.registeredIDs.includes(user._id) || target.ownerID == user._id
    );
  }, [target]);

  return (
    <div className="event-container">
      <div className="event-poster-image">
        <img src={target.img} />
      </div>
      <div className="event-overview">
        <h3 className="event-title">
          {target.name}
          {canEdit ? (
            <button className="event-edit-button" onClick={goToEdit}>
              edit
            </button>
          ) : null}
          {chatAccess(registered)}
        </h3>
        <p className="event-date"> {ddMonth} </p>
        <p className="event-time"> {time} </p>
        <hr className="event-divider"></hr>
        <p className="event-overview-header">Details: </p>
        <i className="event-details">
          {target.description}
          {/*disclaimer ive no idea how links work in React yet, not sure how to set this up*/}
        </i>
      </div>
    </div>
  );
}

EventsBox.propTypes = {
  user: Proptypes.object.isRequired,
  target: Proptypes.object.isRequired,
  setOwnership: Proptypes.func.isRequired,
};

export default EventsBox;
