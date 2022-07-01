import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";

/** Import Components & CSS **/
import "./ListOfPeople.component.css";
const defaultProfile = "/defaultProfile.png";
import { staticGroup } from "../staticVariables";

/**
 * List-Of-People
 * Lists down the people inside a selected group from the sidebar
 *
 *
 *
 * @component
 */
function ListOfPeople({ user, setTarget }) {
  /** Declare constants */
  const server = process.env.REACT_APP_SERVER;
  const navigate = useNavigate();
  const [group, setGroup] = useState(staticGroup);

  /** Handle selections */
  const onSelectPerson = (targetUser) => () => {
    setTarget(targetUser);
    const targetHandle = targetUser?.email?.split("@")[0];
    navigate(targetHandle + "/profile");
  };

  /** Get the list of people from server */
  const getGroupAsync = async () => {
    const response = await axios
      .get(server + "/users/getBasic")
      .then((res) => {
        return res.data.users;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
    const index = response.findIndex(({ email }) => {
      return email == user.email.toLowerCase();
    });
    // put current user at the top (may remove user)
    const [curr] = response.splice(index, 1);
    response.unshift(curr);
    setGroup(response);
  };
  /** Run once for performance */
  useEffect(() => {
    getGroupAsync();
  }, []);

  return (
    <>
      <div className="UI" id="list_of_people">
        <div className="list-component">
          <div className="filter-component">
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
                  person.profileIMG = person.profileIMG || defaultProfile;
                  return (
                    <li key={person._id}>
                      <a onClick={onSelectPerson(person)}>
                        <img src={person.profileIMG} />
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
      </div>
      <Outlet />
    </>
  );
}

ListOfPeople.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
  setTarget: PropTypes.func.isRequired,
};

export default ListOfPeople;
