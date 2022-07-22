import React from "react";
import PropTypes from "prop-types";
import { Outlet, useNavigate } from "react-router";

/**Import Components & CSS */
import Logout from "./Logout.component";
import Kakilang_logo from "./images/Kakilang-log-just-the-word.png";
import "./Sidebar.component.css";

import Button from "@mui/material/Button";

/**
 * Sidebar for navigation
 *
 *
 *
 * @component
 */
function Sidebar({ user }) {
  user;
  const navigate = useNavigate();
  const goTo = (link) => () => navigate(link);

  return (
    <div className="header-main">
      <div>
        <div className="sidebar">
          <header className="sidebar-logo-logout">
            <div className="sidebar-header-title">
              <img src={Kakilang_logo}></img>
            </div>{" "}
            <Logout />
          </header>

          <div className="create-event-component">
            <button
              className="create-event-button"
              onClick={goTo("/myEvents/create")}
            >
              <p>Create an Event!</p>
            </button>
          </div>

          <div className="create-event-component">
            <button
              className="create-event-button"
              onClick={goTo("/discover/kakis")}
            >
              <p>Discover Kakis!</p>
            </button>
          </div>

          <div className="create-event-component">
            <button
              className="create-event-button"
              onClick={goTo("/discover/events")}
            >
              <p>Discover Events!</p>
            </button>
          </div>

          <div className="create-event-component">
            <button className="create-event-button" onClick={goTo("/myChats")}>
              <p>My Chats</p>
            </button>
          </div>

          <div className="create-event-component">
            <Button
              className="create-event-button"
              onClick={goTo("/myEvents")}
              backgroundColor="secondary"
            >
              <p>My Events</p>
            </Button>
          </div>

          <div className="create-event-component">
            <button
              className="create-event-button"
              onClick={goTo("/myProfile")}
            >
              <p>My Profile</p>
            </button>
            <i className="fa-solid fa-gear"></i>
          </div>

          <div className="impromptus">
            <div>
              <i className="fa-solid fa-clock"></i>
              <p className="impromptus-title">Impromptus!</p>
            </div>
            <ul className="impromptus-events">
              <li>
                <button className="an-event" /*onClick={goToEvent} */>
                  <i className="fa-solid fa-chess-king"></i> <br></br>
                  <p className="impromptu-event-title">Chess Blitz!</p>
                </button>
              </li>
              <li>
                <button className="an-event">
                  <i className="fa-solid fa-gamepad"></i> <br></br>
                  <p className="impromptu-event-title">
                    A really long and elaborate title even though we should
                    advise people not to write them this long
                  </p>
                </button>
              </li>
              <li>
                <button className="an-event">
                  <i className="fa-solid fa-headset"></i> <br></br>
                  <p className="impromptu-event-title">Chill and talk</p>
                </button>
              </li>
              <li>
                <button className="an-event">
                  <i className="fa-brands fa-battle-net"></i> <br></br>
                  <p className="impromptu-event-title">Overwatch</p>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

Sidebar.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default Sidebar;
