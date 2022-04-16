import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import UserContext from "contexts/UserContext";
import Login from "./auth/Login";
import LocalLogin from "./auth/LocalLogin";
import Signup from "./auth/Signup";
import Container from "./elements/Container";
import Verify from "./auth/Verify";
import View from "./View";
import "stylesheets/Main.scss";
import Dashboard from "./dashboard/Dashboard";
import Gallery from "./gallery/Gallery";
import Profile from "./profile/Profile";

const App = () => {
  const { isLoggedIn, profile } = useContext(UserContext);
  const nav = useNavigate();
  useEffect(() => {
    if (isLoggedIn() && !profile.verified) nav("/verify");
  }, [nav, isLoggedIn, profile.verified]);

  const loggedIn = (
    <Routes>
      <Route path="/" element={<View />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="gallery/*" element={<Gallery />} />
        <Route path="/blog" element={<div>Blog</div>} />
        <Route path="/blog/new" element={<div>New Blog</div>} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path={"/verify"} element={<Verify />} />
    </Routes>
  );

  const notLoggedIn = (
    <>
      <h1>React Photography</h1>
      <Routes>
        <Route path="/" element={<Container classNames={"login-options"} />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<LocalLogin />} />
          <Route path="/signup" element={<Signup />}></Route>
        </Route>
      </Routes>
    </>
  );
  return isLoggedIn() ? loggedIn : notLoggedIn;
};

export default App;
