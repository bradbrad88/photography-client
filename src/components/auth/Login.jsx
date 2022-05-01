import { useNavigate } from "react-router-dom";
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
    <div className="frame">
      <div className="login-options">
        <h2>Login Options</h2>
        <p>New Or Returning User?</p>
        <p>Use the links below either way</p>
        <Button
          onClick={onLogin}
          className="auth local"
          icon={email}
          iconSize={30}
          text={"Sign in with Email"}
        />
        <Google />
        <Facebook />
      </div>
    </div>
  );
};

export default Login;
