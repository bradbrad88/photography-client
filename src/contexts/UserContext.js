import { onCompositionStart } from "draft-js/lib/DraftEditorEditHandler";
import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
const Context = React.createContext();

const UserProvider = ({ children }) => {
  const [profile, setProfileState] = useState({});
  const setProfile = data => {
    console.log(data);
    const { id, givenName, familyName, email, imageUrl } = data;
    console.log("Given Name", givenName);
    setProfileState({ id, givenName, familyName, email, imageUrl });
  };
  const logout = () => {
    setProfileState({});
    const options = {
      method: "POST",
    };
    fetch(process.env.REACT_APP_SERVER_API + "/logout", options);
  };
  const isLoggedIn = () => {
    return profile.id ? true : false;
  };
  console.log("USER CONTEXT", profile);
  return (
    <Context.Provider value={{ setProfile, profile, logout }}>
      {children}
    </Context.Provider>
  );
};
// export { UserProvider };

// class UserStore extends React.Component {
// state = {
//   token: localStorage.getItem("token"),
//   isAdmin: localStorage.getItem("isAdmin"),
//   profile: null,
//   method: null,
// };
// async componentDidMount() {
//   console.log("userContext state", this.state);
// }
// onUserLogin = user => {
//   if (user.error) return this.setState({ error: user.error });
//   localStorage.setItem("token", user.token);
//   localStorage.setItem("isAdmin", user.profile.admin);
//   console.log("User", user);
//   this.setState({
//     token: user.token,
//     profile: user.profile,
//     isAdmin: user.profile.admin,
//     method: user.method,
//   });
// };
// onUserLogout = () => {
//   this.setState({
//     authenticated: null,
//     error: null,
//     profile: null,
//     isAdmin: null,
//     token: null,
//   });
//   localStorage.removeItem("token");
//   localStorage.removeItem("isAdmin");
// };
// render() {
//   console.log("UserContext", this.state);
//   return (
//     <Context.Provider
//       value={{
//         ...this.state,
//         onUserLogin: this.onUserLogin,
//         onUserLogout: this.onUserLogout,
//       }}
//     >
//       {this.props.children}
//     </Context.Provider>
//   );
// }
// }

export default Context;

export { UserProvider };
