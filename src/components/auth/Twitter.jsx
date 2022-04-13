import { useEffect } from "react";

const left = 10;
const top = 10;
const width = window.screen.width / 2;
const height = window.screen.height / 2;

const Twitter = () => {
  useEffect(() => {
    const func = e => {
      console.log("MESSAGE EVENT OCCURRED");
    };
    window.addEventListener("message", func);
    return () => {
      window.removeEventListener("message", func);
    };
  }, []);
  const onClick = () => {
    const popup = openPopup();
    popup.location = "http://localhost:3000/guck";
    popup.postMessage("Hi", "http://localhost:3000");
  };
  const openPopup = () => {
    return window.open(
      "",
      "",
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, popup=yes, width=${width}, height=${height}, top=${top}, left=${left}`
    );
  };
  return <button onClick={onClick}>Twitter</button>;
};

export default Twitter;
