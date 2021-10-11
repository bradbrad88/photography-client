import React, { useState } from "react";
import AnimateTextIn from "../effects/AnimateTextIn";
import ThrowingCard from "./ThrowingCard";
import "../../stylesheets/About.css";
const Welcome = () => {
  const [active, setActive] = useState(false);
  return (
    <div className="welcome" onClick={() => setActive(!active)}>
      <div className={"dart-board"}>
        <ThrowingCard className={"card1"} />
        <ThrowingCard className={"card2"} />
      </div>
      <AnimateTextIn
        text={"Welcome!"}
        letterDelay={0.3}
        initialDelay={0.5}
        className={"title"}
      />
    </div>
  );
};

export default Welcome;
