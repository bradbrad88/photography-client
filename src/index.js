import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { UserProvider } from "./contexts/UserContext";

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.querySelector("#root")
);
