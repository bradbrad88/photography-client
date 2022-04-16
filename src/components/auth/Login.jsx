import { useNavigate, Link } from "react-router-dom";
import Google from "./Google";
import Facebook from "./Facebook";
import Button from "components/elements/Button";
import { email } from "assets/svgButtons";
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
      {/* <button onClick={onLogin} className="auth local">
        {menu(20)}
        Login with Email
      </button> */}
      <Button
        onClick={onLogin}
        className="auth local"
        icon={email}
        iconSize={30}
        text={"Login with Email"}
      />
      <Google />
      <Facebook />
    </>
  );
};

export default Login;
