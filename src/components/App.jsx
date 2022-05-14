import { useEffect } from "react";
import { Routes, Route, useNavigate, useSearchParams } from "react-router-dom";
import userContext from "contexts/UserContext";
import View from "./View";
import Dashboard from "./dashboard/Dashboard";
import Login from "./auth/Login";
import MagicLogin from "./auth/MagicLogin";
import Verify from "./auth/Verify";
import Gallery from "./gallery/Gallery";
import Profile from "./profile/Profile";
import Container from "./elements/Container";
import "stylesheets/Main.scss";

const App = () => {
  const { isLoggedIn, profile, checkActiveSession } = userContext();
  const nav = useNavigate();
  const [query] = useSearchParams();
  const token = query.get("token");
  useEffect(() => {
    if (isLoggedIn() && !profile.verified) nav("/verify");
  }, [nav, isLoggedIn, profile?.verified]);
  useEffect(() => {
    if (token)
      (async () => {
        try {
          await fetch(process.env.REACT_APP_SERVER_API + "/auth/magic?token=" + token, {
            credentials: "include",
          });
          checkActiveSession();
        } catch (error) {}
      })();
  }, [token, checkActiveSession]);

  const loggedIn = () => (
    <Routes>
      <Route path="/" element={<View />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="gallery/*" element={<Gallery />} />
        <Route path="/blog" element={<div>Blog</div>} />
        <Route path="/blog/new" element={<div>New Blog</div>} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );

  const notLoggedIn = () => (
    <>
      <h1>React Photography {process.env.REACT_APP_SERVER_API}</h1>
      <Routes>
        <Route path="/" element={<Container classNames={"main-auth"} />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<MagicLogin />} />
          <Route path={"/verify"} element={<Verify />} />
        </Route>
      </Routes>
    </>
  );
  return isLoggedIn() ? loggedIn() : notLoggedIn();
};

export default App;
