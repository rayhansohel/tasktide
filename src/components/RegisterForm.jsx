// src/components/RegisterForm.js
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import SocialLogin from "./SocialLogin";
import Logo from "../assets/tasktide-logo.png";
import useAxiosPublic from "../hooks/useAxiosPublic";

const RegisterForm = () => {
  const axiosPublic = useAxiosPublic();
  const { registerWithEmailPassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleGoogleSignInSuccess = () => {
    navigate(from, { replace: true });
  };

  const validatePassword = (password) => {
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const minLength = password.length >= 6;

    if (!uppercase.test(password)) {
      return "Password must have at least one uppercase letter!";
    }
    if (!lowercase.test(password)) {
      return "Password must have at least one lowercase letter!";
    }
    if (!minLength) {
      return "Password must be at least 6 characters long!";
    }
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address!";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const displayName = form.get("displayName");
    const email = form.get("email");
    const photoURL = form.get("photoURL") || "";
    const password = form.get("password");

    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }

    setEmailError("");

    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    setPasswordError("");
    toast.dismiss();

    try {
      await registerWithEmailPassword(email, password, displayName, photoURL);
      const userInfo = {
        name: displayName,
        email: email,
        role: "user",
      };
      axiosPublic.post("/users", userInfo);
      toast.success("Registration successful!");
      navigate(from, { replace: true });
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        toast.error("Email is already in use. Try a different one.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 p-4 bg-base-200 border border-base-300 rounded-box">
      <div className="my-8">
        <Link to="/">
          <div>
            <img src={Logo} alt="Logo" className="w-40" />
          </div>
        </Link>
      </div>
      <SocialLogin onSuccess={handleGoogleSignInSuccess} />
      <div className="flex w-full flex-col px-9 mt-4 -mb-4">
        <div className="divider">OR</div>
      </div>
      <form onSubmit={handleSubmit} className="card-body w-full space-y-2">
        <div className="form-control">
          <input
            type="text"
            name="displayName"
            placeholder="Your Name"
            className="input input-sm input-bordered text-xs font-semibold focus:outline-none border-none rounded-md bg-base-300"
            required
          />
        </div>
        <div className="form-control">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="input input-sm input-bordered text-xs font-semibold focus:outline-none border-none rounded-md bg-base-300"
            required
          />
          {emailError && (
            <div className="text-error mt-2 ml-4">{emailError}</div>
          )}
        </div>
        <div className="form-control relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="input input-sm input-bordered text-xs font-semibold focus:outline-none border-none rounded-md bg-base-300"
            required
          />
          <span
            className="absolute right-2 top-[7px] cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <AiFillEyeInvisible size={20} />
            ) : (
              <AiFillEye size={20} />
            )}
          </span>
          {passwordError && (
            <div className=" text-error mt-2 ml-4">{passwordError}</div>
          )}
        </div>
        <div className="form-control">
          <input
            type="text"
            name="photoURL"
            placeholder="Profile Picture URL"
            className="input input-sm input-bordered text-xs font-semibold focus:outline-none border-none rounded-md bg-base-300"
          />
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-sm btn-accent">
            Register
          </button>
        </div>
        <div className=" text-center">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-neutral">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
