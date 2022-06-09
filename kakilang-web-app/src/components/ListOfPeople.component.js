import React from "react";
import "./ListOfPeople.component.css";

/**
 * Lists down the people inside a selected group from the sidebar
 *
 *
 *
 * @component
 */

function ListOfPeople() {
  return (
    <div className="list-of-people">
      <ul>
        <li>
          <a href="#">Dylan Ho</a>
        </li>
        <li>
          <a href="#">Marcus Lim</a>
        </li>
        <li>
          <a href="#">William Chau</a>
        </li>
        <li>
          <a href="#">David Lim</a>
        </li>
        <li>
          <a href="#">Garand HEWHEW</a>
        </li>
        <li>
          <a href="#">Pan Pan</a>
        </li>
        <li>
          <a href="#">Xuan Yi</a>
        </li>
        <li>
          <a href="#">Ian Lee</a>
        </li>

        <li>
          <a href="#">Ng Yong Jie</a>
        </li>
        <li>
          <a href="#">Stephen Lim</a>
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
  );
}

export default ListOfPeople;
