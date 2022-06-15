import React from "react";
import "./Sidebar.component.css";
/**
 * Sidebar for navigation
 *
 *
 *
 * @component
 */
function Sidebar() {
  return (
    <div className="sidebar">
      <header>My Kakis!</header>
      <ul className="sidebar-menu">
        <li>
          <a href="#">
            <span className="fa fa-house"></span>
            <span id="Houses"> Housemates</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="fa fa-people-roof"></span>
            <span id="Floor"> Floormates</span>
          </a>
        </li>
        <li className="sub-menu">
          <a href="#">
            <i className="fa fa-baseball-bat-ball"></i> CCAs/IGs
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
            <button className="event-button">
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
          <p>Impromptus!</p>
        </div>
        <ul className="impromptus-events">
          <li>
            <div className="an-event">harlo1</div>
          </li>
          <li>
            <div className="an-event">harlo2</div>
          </li>
          <li>
            <div className="an-event">harlo3</div>
          </li>
          <li>
            <div className="an-event">harlo1</div>
          </li>
          <li>
            <div className="an-event">harlo2</div>
          </li>
          <li>
            <div className="an-event">harlo3</div>
          </li>
          <li>
            <div className="an-event">harlo1</div>
          </li>
          <li>
            <div className="an-event">harlo2</div>
          </li>
          <li>
            <div className="an-event">harlo3</div>
          </li>
          <li>
            <div className="an-event">harlo1</div>
          </li>
          <li>
            <div className="an-event">harlo2</div>
          </li>
          <li>
            <div className="an-event">harlo3</div>
          </li>
          <li>
            <div className="an-event">harlo1</div>
          </li>
          <li>
            <div className="an-event">harlo2</div>
          </li>
          <li>
            <div className="an-event">harlo3</div>
          </li>
          <li>
            <div className="an-event">harlo1</div>
          </li>
          

          
          
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
