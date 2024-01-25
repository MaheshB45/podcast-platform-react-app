import React from "react";
import "./style.css";
function Button({ text, onClick }) {
  return (
    <div className="custom-button" onClick={() => onClick()}>
      {text}
    </div>
  );
}

export default Button;