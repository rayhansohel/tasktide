/* eslint-disable react/prop-types */
// src/components/SocialLogin.js
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";


const SocialLogin = ({ onSuccess }) => {
  const { signInWithGoogle } = useContext(AuthContext);

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result;
        const userInfo = {
          name: user?.displayName,
          email: user?.email,
          role: "user"
        };
        axios.post("/users", userInfo);
        toast.success("Login with Google successful!");
        onSuccess();
      })
      .catch(() => {
        toast.error("Google sign-in failed. Try again!");
      });
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        type="button"
        className="btn btn-sm bg-base-100 border-base-300 hover:bg-base-300 shadow-none"
      >
        <FcGoogle className="text-lg" />
        <span>Continue with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
