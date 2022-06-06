import React from "react";
import PropTypes from "prop-types";

/**
 * People Box
 *
 *
 *
 * @component
 */
function PeopleBox({ onSelectPerson, group }) {
  //console.log(group);
  return (
    <>
      {group.map((person) => {
        return (
          <button onClick={onSelectPerson} value={person} key={person}>
            {person}
          </button>
        );
      })}
    </>
  );
}

PeopleBox.propTypes = {
  group: PropTypes.array,
  onSelectPerson: PropTypes.func,
};

export default PeopleBox;
