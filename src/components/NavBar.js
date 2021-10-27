import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartImg from "../images/download-cart.png";
function NavBar({ onClick, itemNo }) {
  const [showMobileNav, setShowMobileNav] = useState(false);
  return (
    <div className="px-6 md:px-12 lg:px-12 2xl:px-12 py-2 mb-16 bg-gray-50 border-solid border-t-2 border-b-2 border-gray-100 w-full sticky top-0 left-0 ">
      <div className="flex justify-between content-center items-center">
        <div className=" justify-between items-center space-x-6 hidden sm:hidden xs:hidden md:hidden lg:flex 2xl:flex ">
          <img
            src="https://store.luminskin.com/_next/static/images/logo-20c2cb1d9d2bb6d2139d0e5cec3103bd.png"
            alt="Lumin Logo"
            className="h-12 mr-8"
          />
          <Link to="/">Shop</Link>
          <Link to="/">Learn</Link>
        </div>
        <div
          className="m:block lg:hidden 2xl:hidden block cursor-pointer"
          onClick={() => setShowMobileNav(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18px"
            viewBox="0 0 24 24"
            width="18px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </div>
        <div className="flex justify-between space-x-6">
          <Link to="/">Account</Link>
          <div onClick={onClick} className="relative flex">
            <img src={CartImg} alt="" className="h-6" />
            <span className="absolute -top-2.5 -right-3 text-sm">{itemNo}</span>
          </div>
        </div>
      </div>
      <div
        className={
          showMobileNav
            ? "bg-lumin-transparent z-10 absolute h-full-vh w-full top-0 left-0 backdrop-filter blur-sm transition duration-1000 delay-300 ease-in "
            : "w-0  hidden"
        }
      >
        <div className="bg-cart h-full fixed scroll overflow-y-scroll left-0 2xl:w-5/12 lg:w-5/12 md:w-1/2 sm:w-2/3 xs:w-full p-8 transition-opacity ease-in">
          <div
            onClick={() => setShowMobileNav(!showMobileNav)}
            className="cursor-pointer float-right h-7 w-7 rounded-full bg-gray-100 border border-block border-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              ``
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </div>
          <div className="flex justify-between  space-y-6 mt-12 flex-wrap sm:w-full md:w-1/2 w-1/2 flex-col text-left">
            <img
              src="https://store.luminskin.com/_next/static/images/logo-20c2cb1d9d2bb6d2139d0e5cec3103bd.png"
              alt="Lumin Logo"
              className="h-15"
            />
            <Link to="/" className="hover:underline transition duration-500 delay-200 ease-in-out">Shop</Link>
            <Link to="/" className="hover:underline transition duration-500 delay-200 ease-in-out">Learn</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
