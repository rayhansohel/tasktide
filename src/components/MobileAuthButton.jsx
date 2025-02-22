import { useEffect, useRef, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import ProfilePlaceholder from "../assets/profile-placeholder.png";
import { BiLogOutCircle } from "react-icons/bi";
import UserCard from "./UserCard";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import { GrHomeRounded } from "react-icons/gr";
import { Link } from "react-router-dom";

const MobileAuthButton = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || "User",
          email: currentUser.email,
          profilePicture: currentUser.photoURL || ProfilePlaceholder,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setShowDropdown(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  return (
    <div className="relative">
      {user ? (
        <div className="flex items-center gap-4" ref={dropdownRef}>
          <img
            src={user.profilePicture}
            alt="User Profile"
            className="w-8 h-8 rounded-full cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          />

          {/* Dropdown Menu */}
          {showDropdown && (
            <div
              className="absolute -right-4 top-14 bg-base-200 border border-base-300 rounded-xl p-4 flex flex-col gap-4"
              style={{ minWidth: "max-content" }}
            >
              <div className="flex justify-between items-center w-full p-4 bg-base-300 rounded-lg">
                <UserCard />
              </div>
              <Link to="/">
                <button className="btn btn-sm btn-accent w-full">
                  <GrHomeRounded /> Homepage
                </button>
              </Link>
              <button
                className="w-full btn btn-sm btn-neutral flex justify-center items-center"
                onClick={handleLogout}
              >
                <BiLogOutCircle className="text-lg" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-4">
          <LoginButton />
          <RegisterButton />
        </div>
      )}
    </div>
  );
};

export default MobileAuthButton;
