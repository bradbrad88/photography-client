import React from "react";
import UserStore from "./UserContext";
const Context = React.createContext();

export class GoogleStore extends React.Component {
  static contextType = UserStore;
  state = { googleProfile: null, googleTokenId: null };

  componentDidMount() {
    this.getAuth();
    // const auth = await window.gapi.auth2.getAuthInstance();
    // this.setState({ googleAuthInstance: auth });
    // if (auth) auth.isSignedIn.listen(this.signedInListen);
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
          this.googleProfileState();
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  googleProfileState = () => {
    this.setState({
      googleProfile: this.auth?.currentUser.get().getBasicProfile(),
      googleTokenId: this.auth?.currentUser.get().getAuthResponse().id_token,
    });
    if (this.state.googleTokenId) return this.loginGoogleUser();
  };
  loginGoogleUser = async () => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ token: this.state.googleTokenId }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch("http://localhost:5000/auth/google", options);
      const data = await res.json();
      console.log("right here", data);
      this.context.onUserLogin(data);

      // refreshTokenSetup(googleResponse);
    } catch (error) {
      console.error(error.message);
    }
  };

  onSignin = props => {
    this.auth.signIn();
  };

  onSignout = () => {
    console.log("yep");
    this.auth.signOut();
    this.context.onUserLogout();
  };

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          onSignin: this.onSignin,
          onSignout: this.onSignout,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
  signedInListen = isSignedIn => {
    this.googleProfileState();
    if (this.state.googleTokenId) this.loginGoogleUser();
  };
}

export default Context;
