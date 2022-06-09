import React from "react";
import "./ListOfPeople.component.css";
import dylan1 from "./images/Dylan-img1.png";
import marcus_dp from "./images/marcus.jpg";
import sherwin_dp from "./images/sherwin.jpg";
import xuanyi_dp from "./images/xy.jpg";
import stephen_dp from "./images/stephen.jpg";
import yongjie_dp from "./images/yong jie.jpg";
import william_dp from "./images/william.jpg";
/**
 * List-Of-People
 * Lists down the people inside a selected group from the sidebar
 *
 *
 *
 * @component
 */

function ListOfPeople() {
  return (
    <div className="list-of-people-component">
      <div className="list-of-people">
        <ul>
          <li>
            <a href="#">
              {" "}
              <img src={dylan1} className="dylan1-img" />
              Dylan Ho
            </a>
          </li>
          <li>
            <a href="#">
              {" "}
              <img src={marcus_dp} className="marcus-img" />
              Marcus Lim
            </a>
          </li>
          <li>
            <a href="#">
              {" "}
              <img src={william_dp} className="william-img" />
              William Chau
            </a>
          </li>
          <li>
            <a href="#">David Lim</a>
          </li>
          <li>
            <a href="#">Garand HEWHEW</a>
          </li>
          <li>
            <a href="#">
              <img src={sherwin_dp} className="sherwin-img" />
              Sherwin Lim
            </a>
          </li>
          <li>
            <a href="#">
              {" "}
              <img src={xuanyi_dp} className="xuanyi-img" />
              Xuan Yi
            </a>
          </li>
          <li>
            <a href="#">Ian Lee</a>
          </li>

          <li>
            <a href="#">
              {" "}
              <img src={yongjie_dp} className="yongjie-img" />
              Ng Yong Jie
            </a>
          </li>
          <li>
            <a href="#">
              {" "}
              <img src={stephen_dp} className="stephen-img" />
              Stephen Lim
            </a>
          </li>
          <li>
            <a href="#">Tan Yu</a>
          </li>
          <li>
            <a href="#">Russell Pierre</a>
          </li>
          <li>
            <a href="#">Ronel Htun Win Aung</a>
          </li>
          <li>
            <a href="#">
              A really really really really really really really really really
              really really really long name
            </a>
          </li>
        </ul>
      </div>
      <div className="group-name">
        <i>Group Name Placeholder</i>
      </div>
    </div>
  );
}

export default ListOfPeople;
