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
    </div>
  );
}

export default Sidebar;
