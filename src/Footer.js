import React from "react";
import "./Footer.css";
import facebookIcon from "./images/white-facebook-icon.png";
// import instagramIcon from "./images/white-instagram-icon.png";


function Footer() {
  return (
    <div className="footer">
      <div className="footer__socialLinks">
        <img className="socialLink" src={facebookIcon} alt="Facebook Logo" />
        <img className="socialLink" src={facebookIcon} alt="Instagram Logo" />
        <img className="socialLink" src={facebookIcon} alt="Twitter Logo" />
        <img className="socialLink" src={facebookIcon} alt="Youtube Logo" />
      </div>
      <div className="footer__links">
        <h3>Audio Description</h3>
        <h3>Help Center</h3>
        <h3>Gift Cards</h3>
        <h3>Media Center</h3>
        <h3>Investor Relations</h3>
        <h3>Jobs</h3>
        <h3>Terms of Use</h3>
        <h3>Privacy</h3>
        <h3>Legal Notices</h3>
        <h3>Cookie Preferences</h3>
        <h3>Corporate Information</h3>
        <h3>Contact Us</h3>
      </div>

      <h3 className="footer__copyrightLink">1997-2022 Netflix, Inc.</h3>
    </div>
  );
}

export default Footer;
