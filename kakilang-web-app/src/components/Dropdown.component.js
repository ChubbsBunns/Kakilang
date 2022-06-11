import React from "react";
import PropTypes from "prop-types";

/**
 * Dropdown list component
 *
 */
function Dropdown({ label, options, value, onChange }) {
  return (
    <label>
      {label}:
      <select value={value} onChange={onChange}>
        {options.map((option) => {
          return (
            <option value={option.value} key={option.label + label}>
              {option.label}
            </option>
          );
        })}
      </select>
    </label>
  );
}

Dropdown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Dropdown;
