import React from "react";
import PropTypes from "prop-types";
import { errorMessage, inputError } from "../styles";

function Select({ label, error, value, onChange, id, options }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        name="role"
        onChange={onChange}
        style={error ? inputError : null}
      >
        {options &&
          options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      {error && (
        <p role="alert" style={errorMessage}>
          {error}
        </p>
      )}
    </div>
  );
}

//prop types run on browser
Select.propTypes = {
  /** HTML ID assigned to the input */
  id: PropTypes.string.isRequired,

  /** Label Value */
  label: PropTypes.string.isRequired,

  /** Name to assign to component */
  name: PropTypes.string.isRequired,

  /** onChange action */
  onChange: PropTypes.func.isRequired,

  /** Value assigned to the input */
  value: PropTypes.string.isRequired,

  /**Error to display below the component */
  error: PropTypes.string,

  /** Array of options*/
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Select;
