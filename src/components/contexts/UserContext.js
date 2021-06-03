import React, { useContext } from "react";

const Context = React.createContext();

export class UserStore extends React.Component {
  state = {
    authenticated: localStorage.getItem("token"),
    error: null,
    profile: null,
  };
  async componentDidMount() {
    // await fetch("http://localhost:5000/auth", {
    //   headers: { authorization: this.state.authenticated },
    // });
  }

  onUserLogin = user => {
    if (user.error) return this.setState({ error: user.error });
    localStorage.setItem("token", user.token);
    this.setState({ authenticated: user.token, profile: user.profile });
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
