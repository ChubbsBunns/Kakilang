import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";

/** Import Components & CSS **/
import "./ListOfPeople.component.css";
const defaultEvent = "/defaultEvent.jpg";
import { staticGroup } from "../staticVariables";

/**
 * Event List
 *
 * List of existing events
 */
function EventList({ user, setTarget }) {
  /** Declare constants */
  const server = process.env.REACT_APP_SERVER;
  const navigate = useNavigate();
  const [group, setGroup] = useState(staticGroup);

  /** Handle selections */
  const onSelectEvent = (targetEvent) => () => {
    setTarget(targetEvent);
    const targetHandle = targetEvent.name.replace(/( )/gi, "-");
    navigate(targetHandle);
  };

  /** Get the list of people from server */
  const getGroupAsync = async () => {
    const response = await axios
      .get(server + "/events/getEvents")
      .then((res) => {
        return res.data.events;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
    const myEvent = [],
      otherEvent = [];
    response.forEach((event) => {
      // Adjust for different definitions of myEvent
      (event.owner.id == user._id ? myEvent : otherEvent).push(event);
    });
    console.log(myEvent);
    // can be used to only display personal events
    setGroup(myEvent.concat(otherEvent));
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
              <option value="filter-houses">All Events</option>
              <option value="filter-houses">MyEvents</option>
              <option value="filter-floor">Registered</option>
              <option value="filter-CCA">New</option>
            </select>
          </div>
          <div className="list-of-people-component">
            <div className="list-of-people">
              <ul>
                {group.map((event) => {
                  event.eventIMG = event.eventIMG || defaultEvent;
                  return (
                    <li key={event._id}>
                      <a onClick={onSelectEvent(event)}>
                        <img src={event.eventIMG} />
                        {event.name}
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

EventList.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  setTarget: PropTypes.func.isRequired,
};

export default EventList;
