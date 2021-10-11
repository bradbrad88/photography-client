import React, { useState } from "react";
import "../../stylesheets/ThrowingCard.css";

const ThrowingCard = ({ active, className }) => {
  // const [active, setActive] = useState(false);
  return (
    <div className={`throwing-card-platform ${className}`}>
      <div
        className={`throwing-card-face ${className}`}
        // onClick={() => setActive(!active)}
      >
        <img
          src="https://far-out-photography-local.s3.ap-southeast-2.amazonaws.com/1632489422889.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default ThrowingCard;
