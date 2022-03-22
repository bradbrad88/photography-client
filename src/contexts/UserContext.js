import React from "react";
import { useHistory } from "react-router-dom";
const Context = React.createContext();

const UserProvider = ({ children }) => {
  console.log(children);
  return <Context.Provider value={{ test: "new" }}>{children}</Context.Provider>;
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

export { Context as UserContext };

export default UserProvider;
