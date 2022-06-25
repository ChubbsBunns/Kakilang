import React from "react";
import "./EventsPage.component.css";
import chess_background from "./images/chess_picture.jpg";

function EventsPage() {
  return (
    <div className="event-container">
      <div className="event-poster-image">
        <img src={chess_background} />
      </div>
      <div className="event-overview">
        <h3 className="event-title">Chess Blitz <button className="event-edit-button">edit</button></h3>
        <p className="event-date">13 August</p>
        <p className="event-time">6:30pm</p>
        <hr className="event-divider"></hr>
        <p className="event-overview-header">Details: </p>
        <i className="event-details">
          Come and join us for a quick chess blitz session! Welcoming veterans
          and beginners alike!

          <br></br>
          <br></br>
          Here is the link: <a href="shorturl.at/mrGP0" rel="noreferrer"> Here! </a>
          {/*disclaimer ive no idea how links work in React yet, not sure how to set this up*/}
        </i>
      </div>
    </div>
  );
}

export default EventsPage;
