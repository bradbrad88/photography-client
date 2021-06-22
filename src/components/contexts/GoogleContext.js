import React from "react";
import UserStore from "./UserContext";
const Context = React.createContext();

export class GoogleStore extends React.Component {
  static contextType = UserStore;

  componentDidMount() {
    this.getAuth();
  }
  async getAuth() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          scope: "profile",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.auth.isSignedIn.listen(this.signedInListen);
          if (this.auth.isSignedIn.get()) this.loginGoogleUser();
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  loginGoogleUser = async () => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          token: this.auth?.currentUser.get().getAuthResponse().id_token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch("http://localhost:5000/auth/google", options);
      const data = await res.json();
      this.context.onUserLogin(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  onSignin = () => {
    if (this.auth.isSignedIn.get()) this.auth.signOut();
    this.auth.signIn();
  };

  onSignout = () => {
    this.auth.signOut();
  };

  render() {
    return (
      <Context.Provider
        value={{
          onSignin: this.onSignin,
          onSignout: this.onSignout,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
  signedInListen = isSignedIn => {
    if (isSignedIn) {
      this.loginGoogleUser();
      return;
    }
    this.context.onUserLogout();
  };
}

export default Context;
