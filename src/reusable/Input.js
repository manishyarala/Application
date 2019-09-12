import React from "react";
import PropTypes from "prop-types";
import { errorColor } from "../styles";

const errorStyle = {
  color: errorColor,
  fontWeight: "bold"
};

const inputErrorStyle = {
  border: "solid 1px " + errorColor
};

function Input(props) {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <br />
      <input
        style={props.error ? inputErrorStyle : null}
        id={props.id}
        name={props.name}
        type={props.type}
        onChange={props.onChange}
        value={props.value}
      ></input>
      <br />
      {props.error && <p style={errorStyle}>{props.error}</p>}
    </div>
  );
}

//prop types run on browser
Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "email", "phone", "number"]),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string
};

export default Input;
