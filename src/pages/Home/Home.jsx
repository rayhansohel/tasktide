import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/tasktide-logo.png";
import LaptopMockup from "../../assets/laptop-mockup.png";
import MobileMockup from "../../assets/mobile-mockup.png";
import HeroMockup from "../../assets/hero-mockup.png";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Home = () => {
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
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-198px)] items-center justify-between gap-4">
      <Helmet>
        <title>TaskTide</title>
      </Helmet>
      <div className="hidden h-[calc(100vh-198px)] ps-6 xl:flex flex-col justify-end items-end">
        <img
          src={MobileMockup}
          alt="Mobile Mockup"
          className="w-80 h-auto object-contain"
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
          src={LaptopMockup}
          alt="Laptop Mockup"
          className="w-auto h-full object-contain"
        />
      </div>
      <div className="flex xl:hidden xl:w-0 lg:h-[calc(100vh-300px)]">
        <img
          src={HeroMockup}
          alt="Hero Mockup"
          className="w-full lg:w-auto lg:h-full object-contain"
        />
      </div>
    </div>
  );
};

export default Home;
