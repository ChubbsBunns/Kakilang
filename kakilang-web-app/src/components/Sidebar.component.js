import React from "react";
import PropTypes from "prop-types";
import { Outlet, useNavigate } from "react-router";

/**Import Components & CSS */
import Logout from "./Logout.component";
import Kakilang_logo from "./images/Kakilang-log-just-the-word.png";
import "./Sidebar.component.css";

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
            <button
              className="create-event-button"
              onClick={goTo("/myEvents")}
              backgroundColor="secondary"
            >
              <p>My Events</p>
            </button>
          </div>

          <div className="create-event-component">
            <button
              className="create-event-button"
              onClick={goTo("/myProfile")}
            >
              <p>
                My Profile <i className="fa-solid fa-gear"></i>
              </p>
            </button>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

Sidebar.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Sidebar;
