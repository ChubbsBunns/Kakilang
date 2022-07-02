import React, { useEffect, useState } from "react";
import Proptypes from "prop-types";

/** import Components & CSS **/
import "./EventsBox.component.css";
import { useNavigate } from "react-router";
const defaultEvent = "/defaultEvent.jpg";

function EventsBox({ user, target, setOwnership }) {
  /** Constants **/
  const [canEdit, setCanEdit] = useState(false);
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

  /** Access rights to edit **/
  const goToEdit = () => navigate("/myEvents/" + targetHandle + "/edit");
  useEffect(() => {
    if (user._id == target.owner.id) {
      setOwnership(true);
      setCanEdit(true);
    } else {
      console.log("User:", user._id);
      console.log("Owner:", target.owner.id);
      setOwnership(false);
      setCanEdit(false);
    }
  });

  return (
    <div className="event-container">
      <div className="event-poster-image">
        <img src={target.eventIMG || defaultEvent} />
      </div>
      <div className="event-overview">
        <h3 className="event-title">
          {target.name}{" "}
          {canEdit ? (
            <button className="event-edit-button" onClick={goToEdit}>
              edit
            </button>
          ) : null}
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
