import React from "react";
import "../../stylesheets/Contact.css";

const Contact = () => {
  return (
    <div className={"contact-form-container"}>
      <form className={"contact-form"}>
        <div className={"contact-header"}>
          <h2>Let me know how I can help!</h2>
        </div>
        <fieldset>
          <input className={"contact-input"} placeholder={"First Name*"}></input>
        </fieldset>
        <fieldset>
          <input className={"contact-input"} placeholder={"Last Name*"}></input>
        </fieldset>
        <fieldset>
          <input className={"contact-input"} placeholder={"Your Email*"}></input>
        </fieldset>
        {/* either or both required */}
        <fieldset>
          <input className={"contact-input"} placeholder={"Phone Number*"}></input>
        </fieldset>
        <fieldset>
          <textarea
            className={"contact-input area"}
            placeholder={"How Can I Help You? Dates of events can be helpful :)"}
          ></textarea>
        </fieldset>
      </form>
    </div>
  );
};

export default Contact;
