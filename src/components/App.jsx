import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import UserContext from "contexts/UserContext";
import Login from "./auth/Login";
import "stylesheets/Main.css";
import Logout from "./auth/Logout";
import LocalLogin from "./auth/LocalLogin";
import Signup from "./auth/Signup";
import Container from "./elements/Container";

const App = () => {
  console.log("render");
  const { isLoggedIn } = useContext(UserContext);
  // console.log(userContext);
  const loggedIn = (
    <Routes>
      <Route
        path="/"
        element={
          <main>
            <p>Logged In</p>
            <Logout />
          </main>
        }
      />
    </Routes>
  );

  const notLoggedIn = (
    <Routes>
      <Route path="/" element={<Container classNames={"login-options"} />}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<LocalLogin />} />
        <Route path="/signup" element={<Signup />}></Route>
      </Route>
    </Routes>
  );
  return isLoggedIn() ? loggedIn : notLoggedIn;
};

export default App;
