import React from "react";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client.init({
        cliendId:
          "474102694745-ca05q19059jaa83t5qb6vqi5q4umoma7.apps.googleusercontent.com",
        scope: [""],
      });
    });
  }
}
