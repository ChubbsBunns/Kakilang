import React from "react";
import PropTypes from "prop-types";
import Logout from "./Logout.component";
import "./Sidebar.component.css";
import { useNavigate } from "react-router";

/**
 * Sidebar for navigation
 *
 *
 *
 * @component
 */
function Sidebar({ setBox, user, group, setGroup }) {
  const navigate = useNavigate();
  const goToEvent = () => setBox("EventsPage");
  const goToPeople = () => {
    setBox("ProfilePage");
    setGroup(group);
    console.log(user);
    navigate("/home/" + user.email.split("@")[0]);
  };

  const filter = (predicate) => () => setGroup(group.filter(predicate));

  return (
    <div className="sidebar">
      <header>
        My Kakis! <Logout />
      </header>

      <ul className="sidebar-menu">
        <li>
          <a
            href="#Housemates"
            onClick={filter((person) => person.house == user.house)}
          >
            <span className="fa fa-house"></span>
            <span id="Houses"> Housemates</span>
          </a>
        </li>
        <li>
          <a
            href="#Floormates"
            onClick={filter((person) => person.floor == user.floor)}
          >
            <span className="fa fa-people-roof"></span>
            <span id="Floor"> Floormates</span>
          </a>
        </li>
        <li className="sub-menu">
          <a
            href="#CCA"
            onClick={filter((person) =>
              person.cca.find((ig) => user.cca.includes(ig))
            )}
          >
            <i className="fa-solid fa-baseball-bat-ball"></i> CCAs/IGs
            <i className="fa fa-chevron-circle-down indicator"></i>
          </a>
          <ul>
            <li>
              <a href="#">
                <i className="fa fa-bicycle"></i>Cycling
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-volleyball"></i>Volleyball
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-masks-theater"></i>USProductions
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <div className="choice-people-or-events">
        <div className="choice-people-or-events-container">
          <div>
            <p className="choice-people-or-events-text">Display:</p>
          </div>
          <div className="choice-people-or-events-buttons">
            <button className="event-button" onClick={goToPeople}>
              <i className="fa-solid fa-people-group"></i>
              <br></br>People
            </button>
            <button className="event-button">
              <i className="fa-solid fa-calendar-day"></i> <br></br>Events
            </button>
          </div>
        </div>
      </div>
      <div className="choice-chat-type">
        <p className="choice-chat-type-text">Chat Filter:</p>
        <div className="choice-chat-type-buttons">
          <button className="chat-type-button">
            <i className="fa-solid fa-users"></i> <br></br>All
          </button>
          <button className="chat-type-button">
            <i className="fa-solid fa-user"></i> <br></br>DMs
          </button>
          <button className="chat-type-button">
            <i className="fa-solid fa-user-group"></i> <br></br>Groups
          </button>
        </div>
      </div>

      <div className="impromptus">
        <div>
          <i className="fa-solid fa-clock"></i>
          <p className="impromptus-title">Impromptus!</p>
        </div>
        <ul className="impromptus-events">
          <li>
            <button className="an-event" onClick={goToEvent}>
              <i className="fa-solid fa-chess-king"></i> <br></br>Chess Blitz!
            </button>
          </li>
          <li>
            <button className="an-event">
              <i className="fa-solid fa-gamepad"></i> <br></br>A really long and
              elaborate title even though we should advise people not to write
              them this long
            </button>
          </li>
          <li>
            <button className="an-event">
              <i className="fa-solid fa-headset"></i> <br></br>Chill and talk
            </button>
          </li>
          <li>
            <button className="an-event">
              <i className="fa-brands fa-battle-net"></i> <br></br>Overwatch
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  setBox: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  group: PropTypes.array,
  setGroup: PropTypes.func.isRequired,
};

export default Sidebar;
