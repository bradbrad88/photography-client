import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "contexts/UserContext";
import Login from "./auth/Login";
import "stylesheets/Main.css";
import Logout from "./auth/Logout";

const App = () => {
  const { isLoggedIn } = useContext(UserContext);
  // console.log(userContext);
  const loggedIn = (
    <BrowserRouter>
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
    </BrowserRouter>
  );

  const notLoggedIn = (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
  return isLoggedIn() ? loggedIn : notLoggedIn;
};

export default App;
