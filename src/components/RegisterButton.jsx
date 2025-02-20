import { FaRegPenToSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
const RegisterButton = () => {

  
  return (
    <div>
      <Link
        to="/register"
        data-tooltip-id="login-tooltip"
        data-tooltip-content="Login"
        className="btn btn-sm btn-neutral flex items-center justify-center"
      >
        <FaRegPenToSquare className="text-lg" />
        <span>Register</span>
      </Link>
    </div>
  );
};

export default RegisterButton;