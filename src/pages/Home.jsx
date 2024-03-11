import React from "react";
import NavBar from "../components/NavBar";

import logo from "../images/logo.png";

const Home = () => {
  return (
    <div>
      <NavBar />
      <div className="flex-1 text-2md font-bold p-4 md:ml-80 h-screen justify-center items-center flex  ">
        <img
          className="max-h-80 px-5 h-auto max-w-full"
          src={logo}
          alt="Logo"
        />
      </div>
    </div>
  );
};

export default Home;
