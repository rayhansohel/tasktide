import { RiLoginCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <div>
      <Link
        to="/login"
        data-tooltip-id="login-tooltip"
        data-tooltip-content="Login"
        className="btn btn-sm btn-accent flex items-center justify-center"
      >
        <RiLoginCircleLine className="text-lg" />
        <span>Login</span>
      </Link>
    </div>
  );
};

export default LoginButton;
