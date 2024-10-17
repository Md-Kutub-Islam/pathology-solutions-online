import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaBitbucket } from "react-icons/fa6";
import logo from "../../assets/image.png";

function Header({ userData }) {
  return (
    <div className="h-28 w-full bg-custom-light flex items-center justify-between lg:px-16">
      <Link to={`/user/home`}>
        <div className=" cursor-pointer">
          <img src={logo} alt="Logo" />
        </div>
      </Link>

      <div className="flex items-center w-1/2 justify-center md:gap-10 lg:gap-16">
        {/* Seaech box */}
        <Link to={`/user/search`}>
          <div className="flex items-center w-full border border-custom-green rounded-lg justify-center gap-10 py-1 px-2">
            <span className="text-sm">Search for pathology lab</span>
            <FaSearch className="text-custom-green" />{" "}
          </div>
        </Link>

        {/* User */}
        <div className="flex items-center gap-1 cursor-pointer">
          <FaUser className=" text-lg" />
          <span className=" text-base font-medium">
            {userData.name.slice(0, 5)}...
          </span>
        </div>

        {/* Cart */}
        <Link to={`/user/cart`}>
          <div className="flex items-center gap-1 cursor-pointer">
            <FaBitbucket className=" text-lg" />
            <span className=" text-base font-medium">Cart</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
