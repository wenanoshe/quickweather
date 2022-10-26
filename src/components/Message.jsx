import React from "react";
import "./Message.css";
import NotFound from "../assets/lost-svgrepo-com.svg";

export default function Message({ msg, bgColor, children }) {
  return (
    <div className="msg">
      <img className="msg__img" src={NotFound} name="lost" />
      <p className="msg__stm">{msg}</p>
      {children}
    </div>
  );
}
