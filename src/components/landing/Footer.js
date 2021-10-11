import React from "react";
import { Link } from "react-router-dom";
import "../../stylesheets/Footer.css";

// Have a way to contact
// Copyright, Ts&Cs, PrivacyPolicy
//

const Footer = () => {
  return (
    <div className={"footer"}>
      <div className={"privacy-policy"}>
        <Link className={"footer-link"}>Privacy Policy</Link>
      </div>
      <div className={"terms-conditions"}>
        <Link className={"footer-link"}>Terms and Conditions</Link>
      </div>
      <div className={"copyright"}>
        <Link className={"footer-link"}>Copyright 2021 Far Out Photography</Link>
      </div>
    </div>
  );
};

export default Footer;
