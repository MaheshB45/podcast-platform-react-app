import React from "react";
import "./style.css";
const Button = ({id,text,callback,type}) => {
  return (
      <>
        <button className="custom-button" type={type} id={id} onClick={callback}>{text}</button>  
      </>
  );
}

export default Button;