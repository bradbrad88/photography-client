import { useNavigate, Link } from "react-router-dom";
import Google from "./Google";
import Facebook from "./Facebook";
import { menu } from "assets/svgButtons";
import "stylesheets/Auth.scss";

const Login = () => {
  const navigate = useNavigate();

  const onLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <h2>Login Options</h2>
      <Link to={"/signup"}>
        <p>New Account</p>
      </Link>
      <button onClick={onLogin} className="auth local">
        {menu(20)}
        Login with Email
      </button>
      <Google />
      <Facebook />
    </>
  );
};

export default Login;
