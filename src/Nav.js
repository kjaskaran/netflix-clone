import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Nav.css";
import NavOption from "./NavOption";
import { useNavigate } from "react-router-dom";

function Nav() {
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <div className={`nav ${show && `nav__black`}`}>
      <div className="nav__contents">
        <img
          onClick={() => navigate("/")}
          className="nav__logo"
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt="Netflix logo"
        />
        <NavOption title="Home" />
        <NavOption title="TV Shows" />
        <NavOption title="Movies" />
        <NavOption title="New & Popular" />
        <NavOption title="My List" />
        <NavOption title="Browse by Languages" />

        <img
          onClick={() => navigate("/profile")}
          className="nav__avatar"
          src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/e70b1333850498.56ba69ac32ae3.png"
          alt="Avatar"
        />
      </div>
    </div>
  );
}

export default Nav;
