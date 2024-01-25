import React from "react";
import "./style.css";
function InputComponent({ type, state, setState, placeholder }) {
  return (
    <input
      type={type}
      value={state}
      onChange={(e) => setState(e.target.value)}
      placeholder={placeholder}
      className="custom-input"
    />
  );
}

export default InputComponent;