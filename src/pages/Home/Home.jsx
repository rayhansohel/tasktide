import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/tasktide-logo.png";
import MobileMockupDark from "../../assets/mobile-mockup-dark.png";
import LaptopMockupDark from "../../assets/laptop-mockup-dark.png";
import HeroMockupDark from "../../assets/hero-mockup-dark.png";
import MobileMockupLight from "../../assets/mobile-mockup-light.png";
import LaptopMockupLight from "../../assets/laptop-mockup-light.png";
import HeroMockupLight from "../../assets/hero-mockup-light.png";
import { Helmet } from "react-helmet-async";
import { useState, useEffect, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ThemeContext from "../../context/ThemeContext";

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGetStartedClick = () => {
    if (user) {
      navigate("/task");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-198px)] items-center justify-between md:gap-4">
      <Helmet>
        <title>TaskTide</title>
      </Helmet>
      <div className="hidden h-[calc(100vh-198px)] ps-6 xl:flex flex-col justify-end items-end">
        <img
          src= {theme === "dark" ? MobileMockupDark : MobileMockupLight}
          alt="Mobile Mockup"
          className="h-full w-auto object-contain"
        />
      </div>
      <div className="flex flex-col gap-4 px-4 md:px-10 2xl:px-20 py-10 flex-1 w-full">
        {/* Brand Logo */}
        <div>
          <Link to="/">
            <div>
              <img src={Logo} alt="Logo" className="w-60" />
            </div>
          </Link>
        </div>
        <h1 className="text-xl md:text-3xl text-primary">
          To-Do List & Task Management <br /> for Smart People
        </h1>
        <p className="opacity-70">
          Effortlessly manage tasks with real-time updates, seamless drag-and-drop functionality, and a user-friendly interface for enhanced productivity.
        </p>
        <div className="mt-6">
          <button onClick={handleGetStartedClick} className="btn btn-sm btn-accent">
            Get Started
          </button>
        </div>
      </div>
      <div className="h-[calc(100vh-300px)] hidden xl:flex">
        <img
          src= {theme === "dark" ? LaptopMockupDark : LaptopMockupLight}
          alt="Laptop Mockup"
          className="w-auto h-full object-contain"
        />
      </div>
      <div className="flex xl:hidden xl:w-0 lg:h-[calc(100vh-300px)] -mt-10 md:-mt-24 lg:mt-0 w-full lg:w-1/2 justify-end items-end">
        <img
          src= {theme === "dark" ? HeroMockupDark : HeroMockupLight}
          alt="Hero Mockup"
          className="max-w-80 sm:max-w-96 md:max-w-2xl lg:w-auto lg:h-full object-contain"
        />
      </div>
    </div>
  );
};

export default Home;
