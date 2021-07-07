import React from "react";
import { useHistory } from "react-router-dom";
const Context = React.createContext();

export class UserStore extends React.Component {
  state = {
    token: localStorage.getItem("token"),
    isAdmin: localStorage.getItem("isAdmin"),
    profile: null,
  };

  async componentDidMount() {
    // await fetch("http://localhost:5000/auth", {
    //   headers: { authorization: this.state.token },
    // });
  }

  onUserLogin = user => {
    if (user.error) return this.setState({ error: user.error });
    localStorage.setItem("token", user.token);
    localStorage.setItem("isAdmin", user.profile.admin);
    this.setState({ token: user.token, profile: user.profile });
  };
  onUserLogout = () => {
    this.setState({ authenticated: null, error: null, profile: null });
    localStorage.removeItem("token");
  };
  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          onUserLogin: this.onUserLogin,
          onUserLogout: this.onUserLogout,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
