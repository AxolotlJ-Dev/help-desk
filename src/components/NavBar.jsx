"use client";

import Link from "next/link";
import React, { useState } from "react";

const NavBar = ({ com }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const NavLinks = [
    {
      name: "dashboard",
      path: "/",
    },
    {
      name: "tables",
      path: "/Tables",
    },
    {
      name: "new",
      path: "/NewTask",
    },
    {
      name: "About",
      path: "http://iccreativa.com/",
    },
  ];

  return (
    <div>
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-50 bg-black opacity-50"
        ></div>
      )}

      <div className="relative min-h-screen md:flex">
        {/* mobile menu bar */}
        <div className="bg-gray-800 text-gray-100 flex justify-between md:hidden">

          {/* logo */}
          <Link href="/" className="block p-4 text-white font-bold">
            img
          </Link>

          {/* mobile menu button */}
          <button
            className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700"
            onClick={toggleSidebar}
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* sidebar */}
        <div
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-80"
          } bg-white shadow-2xl fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-lg transition-transform duration-300 :relative md:translate-x-0 border border-gray-300`}
        >
          {/* title */}
          <div className="relative">
            <Link className="py-6 px-8 text-center" href="#/">
              <h6 className="block antialiased tracking-normal font-sans text-base font-bold leading-relaxed text-blue-gray-900">
                ICC
              </h6>
            </Link>
          </div>

          {/* nav */}
          <nav className="m-4">
            {NavLinks.map((link, index) => {
              return (
                <ul key={index} onClick={toggleSidebar}>
                  <Link
                    href={link.path}
                    className="mb-5 block py-2.5 px-4 transition duration-200 rounded-xl bg-white text-gray-700 hover:bg-gray-200 border border-blue-gray-100 shadow-sm"
                  >
                    <li>{link.name}</li>
                  </Link>
                </ul>
              );
            })}
          </nav>
        </div>

        {/* content */}
        <div className="flex-1 text-2md font-bold p-4 md:ml-80">{com}</div>
      </div>
    </div>
  );
};

export default NavBar;
