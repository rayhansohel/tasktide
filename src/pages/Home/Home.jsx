import { Link } from "react-router-dom";
import Logo from "../../assets/tasktide-logo.png";
import LaptopMockup from "../../assets/laptop-mockup.png";
import MobileMockup from "../../assets/mobile-mockup.png";
import HeroMockup from "../../assets//hero-mockup.png";
import RegisterButton from "../../components/RegisterButton";

const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-198px)] items-center justify-between gap-4">
      <div className="hidden h-[calc(100vh-198px)] ps-6 xl:flex flex-col justify-end items-end">
        <img
          src={MobileMockup}
          alt="Mobile Mockup"
          className="w-80 h-auto  object-contain"
        />
      </div>
      <div className="flex flex-col gap-4 px-4 md:px-10 2xl:px-20 py-10 flex-1">
        {/* Brand Logo */}
        <div>
          <Link to="/">
            <div>
              <img src={Logo} alt="Logo" className="w-60" />
            </div>
          </Link>
        </div>
        <h1 className="text-xl md:text-3xl text-primary">
          To-Do List & Task Management <br></br> for Smart People
        </h1>
        <p className="mt-4 opacity-70">
          Manage your tasks efficiently with real-time updates and a smooth
          drag-and-drop interface.
        </p>
        <div className="mt-6">
          <Link to="/dashboard">
            <button className="btn btn-sm btn-accent">Get Started</button>
          </Link>
        </div>
      </div>
      <div className="h-[calc(100vh-300px)] hidden xl:flex ">
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
