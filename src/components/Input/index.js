import React from "react";
import "./style.css";
function InputComponent({
  id,
  name,
  type,
  value,
  placeholder,
  style,
  onInput,
  maxLength,
  accept,
  required,
}) {
  return (
    <input
      name={name}
      type={type}
      maxLength={maxLength}
      id={id}
      value={value}
      placeholder={placeholder}
      onInput={onInput}
      accept={accept}
      style={{ ...style }}
      required={required}
      className="custom-input"
    />
  );
}

export default InputComponent;
