"use client";

import Link from "next/link";
import React, { useState } from "react";

import { IoHomeSharp } from "react-icons/io5";
import { FaTable } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiLogout } from "react-icons/ci";
import { FaCircleInfo } from "react-icons/fa6";


const NavBar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  function dropdown() {
    document.querySelector("#submenu").classList.toggle("hidden");
    document.querySelector("#arrow").classList.toggle("rotate-0");
  }

  function openSidebar() {
    setSidebarOpen(!isSidebarOpen);
  }

  return (
    <div>
      {/* Overlay */}
      <div className="relative md:flex">
        {/* sidebar */}
        {/* Este es el boton para mostrar o ocultar el nav */}
        <span
          className="absolute text-white text-4xl top-5 right-2 cursor-pointer z-50 md:hidden"
          onClick={openSidebar}
        >
          <RxHamburgerMenu className=" px-2 bg-gray-900 rounded-xl cursor-pointer ml-28 lg:hidden" onClick={openSidebar} />

        </span>
        <div
          className={` sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center lg:block bg-gray-900 z-10 md:block ${
            isSidebarOpen ? "" : "hidden"
          }`}
        >
          <div className="text-gray-100 text-xl">
            <div className="p-2.5 mt-1 flex items-center">
              <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i>
              <h1 className="font-bold text-gray-200 text-[15px] ml-3">ICC</h1>

              <RxHamburgerMenu className="bi bi-x cursor-pointer ml-28 lg:hidden" onClick={openSidebar} />
            </div>
            <div className="my-2 bg-gray-600 h-[1px]"></div>
          </div>
          <Link onClick={openSidebar} href="/">
            <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
              <IoHomeSharp />
              <span className="text-[15px] ml-4 text-gray-200 font-bold">
                Home
              </span>
            </div>
          </Link>
          {/*<Link onClick={openSidebar} href="/NewTask">
             <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
              <FaTable />
              <span className="text-[15px] ml-4 text-gray-200 font-bold">
                Nueva Tarea
              </span>
            </div> 
          </Link>*/}
          <Link onClick={openSidebar} href="/Tables">
            <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
              <FaTasks />
              <span className="text-[15px] ml-4 text-gray-200 font-bold">
                Tareas
              </span>
            </div>
          </Link>
          <div className="my-4 bg-gray-600 h-[1px]"></div>
          <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
            onClick={dropdown}
          >
            <FaCircleInfo />
            <div className="flex justify-between w-full items-center">
              <span className="text-[15px] ml-4 text-gray-200 font-bold">
                Info
              </span>
              <span className="text-sm rotate-180" id="arrow">
                <i className="bi bi-chevron-down"></i>
              </span>
            </div>
          </div>
          <div
            className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold"
            id="submenu"
          >
            <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
              About
            </h1>
            <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
              Contact
            </h1>
            <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
              business
            </h1>
          </div>
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <CiLogout />
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Logout
            </span>
          </div>
        </div>

        {/* content */}
        {/* <div className="flex-1 text-2md font-bold p-4 md:ml-80 "></div> */}
      </div>
    </div>
  );
};

export default NavBar;
