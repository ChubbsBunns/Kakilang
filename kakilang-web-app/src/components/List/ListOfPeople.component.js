import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";

/** Import Components & CSS **/
import "./ListOfPeople.component.css";
import { staticGroup } from "../staticVariables";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

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
  const onSelectPerson = (targetUser) => async () => {
    const convoID = await getConvoAsync(targetUser._id);
    targetUser.convoID = convoID;
    setTarget(targetUser);
    const targetHandle = targetUser?.name?.split(" ")[0];
    navigate(targetHandle + "/profile");
  };

  /** Get Convo between two people **/
  const getConvoAsync = async (targetID) => {
    const response = await axios
      .get(server + "/message/user/" + user._id + "/" + targetID)
      .then((res) => {
        return res.data.convoID;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
    return response;
  };

  /** Get the list of people from server */
  const getGroupAsync = async () => {
    const response = await axios
      .get(server + "/users")
      .then((res) => {
        return res.data.users;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
    const index = response.findIndex(({ _id }) => {
      return _id == user._id;
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
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Filter
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="House"
                  control={<Radio />}
                  label="House"
                />
                <FormControlLabel
                  value="Floor"
                  control={<Radio />}
                  label="Floor"
                />
                <FormControlLabel
                  value="CCA"
                  sx={{}}
                  control={<Radio />}
                  label="CCA"
                />
                <FormControlLabel value="All" control={<Radio />} label="All" />
              </RadioGroup>
            </FormControl>
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
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

ListOfPeople.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }),
  setTarget: PropTypes.func.isRequired,
};

export default ListOfPeople;
