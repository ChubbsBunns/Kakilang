import React from "react";
import PropTypes from "prop-types";
import "./ListOfPeople.component.css";

/**
 * List-Of-People
 * Lists down the people inside a selected group from the sidebar
 *
 *
 *
 * @component
 */
function ListOfPeople({ onSelectPerson, group }) {
  //@TODO Makesure the individual's profile page is on top

  return (
    <div className="list-component">
      <div>
        {" "}
        <select className="filter-options">
          <option value="filter-houses">Houses</option>
          <option value="filter-floor">Floor</option>
          <option value="filter-CCA">CCA/IGs</option>
        </select>
      </div>
      <div className="list-of-people-component">
        <div className="list-of-people">
          <ul>
            {group.map((person) => {
              return (
                <li key={person._id}>
                  <a onClick={onSelectPerson(person)}>
                    <img src={person.img} />
                    {person.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="group-name">
          <i>Group Name Placeholder</i>
        </div>
      </div>
    </div>
  );
}

ListOfPeople.propTypes = {
  group: PropTypes.array,
  onSelectPerson: PropTypes.func,
};

export default ListOfPeople;
