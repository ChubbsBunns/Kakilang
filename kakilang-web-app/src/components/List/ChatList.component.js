import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";

/** Import Components & CSS **/
import "./ListOfPeople.component.css";
const defaultProfile = "/defaultProfile.png";
const defaultEvent = "/defaultEvent.jpg";

/**
 * Chat List of exising messages
 *
 *
 * @component
 */
function ChatList({ user, setTarget }) {
  /** Declare constants */
  const server = process.env.REACT_APP_SERVER;
  const navigate = useNavigate();
  const [group, setGroup] = useState([]);

  /** Handle selections */
  const onSelectPerson = (targetUser) => () => {
    setTarget(targetUser);
    const targetHandle = targetUser.name.split(" ")[0];
    navigate(targetHandle + "/chat");
  };

  /** Get the list of people from server */
  const getGroupAsync = async () => {
    const response = await axios
      .get(server + "/message/user/" + user._id)
      .then((res) => {
        return res.data.convos;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
    const treated = response.map((convo) => {
      convo.img = convo.eventDate
        ? convo.eventIMG || defaultEvent
        : convo.profileIMG || defaultProfile;
      return convo;
    });
    setGroup(treated);
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
                {group.map((convo) => {
                  return (
                    <li key={convo._id}>
                      <a onClick={onSelectPerson(convo)}>
                        <img src={convo.img} />
                        {convo.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

ChatList.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }),
  setTarget: PropTypes.func.isRequired,
};

export default ChatList;
