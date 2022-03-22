// import React from "react";
// import UserStore from "./UserContext";
// const Context = React.createContext();

// export class GoogleStore extends React.Component {
//   static contextType = UserStore;
//   constructor(props) {
//     super(props);
//     this.auth = React.createRef();
//   }
//   componentDidMount() {
//     this.getAuth();
//   }
//   async getAuth() {
//     window.gapi.load("client:auth2", () => {
//       window.gapi.client
//         .init({
//           clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
//           scope: "profile",
//         })
//         .then(() => {
//           this.auth.current = window.gapi.auth2.getAuthInstance();
//           console.log("auth instanct", window.gapi.auth2.getAuthInstance());
//           this.auth.current.isSignedIn.listen(this.signedInListen);
//           if (this.auth.current.isSignedIn.get()) this.loginGoogleUser();
//         })
//         .catch(error => {
//           console.log(error);
//         });
//     });
//   }

//   loginGoogleUser = async () => {
//     try {
//       const options = {
//         method: "POST",
//         body: JSON.stringify({
//           token: this.auth.current?.currentUser.get().getAuthResponse().id_token,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       console.log("options", options);
//       const res = await fetch(
//         `${process.env.REACT_APP_SERVER_API}/auth/google`,
//         options
//       );
//       const data = await res.json();
//       this.context.onUserLogin(data);
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   onSignin = () => {
//     if (this.auth.current?.isSignedIn.get()) this.auth.current.signOut();
//     this.auth.current?.signIn();
//   };

//   onSignout = () => {
//     this.auth.current.signOut();
//   };

//   render() {
//     return (
//       <Context.Provider
//         value={{
//           onSignin: this.onSignin,
//           onSignout: this.onSignout,
//           auth: this.auth,
//         }}
//       >
//         {this.props.children}
//       </Context.Provider>
//     );
//   }
//   signedInListen = isSignedIn => {
//     if (isSignedIn) {
//       this.loginGoogleUser();
//       return;
//     }
//     this.context.onUserLogout();
//   };
// }

// export default Context;
