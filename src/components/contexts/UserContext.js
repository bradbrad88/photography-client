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
    console.log("userContext state", this.state);
  }

  onUserLogin = user => {
    if (user.error) return this.setState({ error: user.error });
    localStorage.setItem("token", user.token);
    localStorage.setItem("isAdmin", user.profile.admin);
    console.log("User", user);
    this.setState({
      token: user.token,
      profile: user.profile,
      isAdmin: user.profile.admin,
    });
  };
  onUserLogout = () => {
    this.setState({
      authenticated: null,
      error: null,
      profile: null,
      isAdmin: null,
      token: null,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
  };
  render() {
    console.log("UserContext", this.state);
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
