import React from "react";
import "./NavOption.css";

function NavOption({ title, onClick }) {
  return (
    <div className="nav__option" onClick={onClick}>
      <h3 className="navOption__title">{title}</h3>
    </div>
  );
}

export default NavOption;
