import React from "react";
import "./AnimateTextIn.css";
const AnimateTextIn = ({ text, letterDelay, initialDelay, className }) => {
  const randTranslate = () => {
    let negative;
    negative = Math.random() < 0.5 ? -1 : 1;
    const x = negative * (Math.floor(Math.random() * 151) + 80);
    negative = Math.random() < 0.5 ? -1 : 1;
    const y = negative * (Math.floor(Math.random() * 151) + 80);
    return `translate(${x}px, ${y}px) rotate(360deg) rotateY(180deg)`;
  };

  const renderText = () => {
    return Array.from(text).map((letter, idx) => (
      <span
        key={idx}
        style={{
          transform: randTranslate(),
          animationDelay: `${idx * letterDelay + initialDelay}s`,
        }}
        className={"animate-text-in"}
      >
        {letter}
      </span>
    ));
  };

  return <div className={className}>{renderText()}</div>;
};

export default AnimateTextIn;
