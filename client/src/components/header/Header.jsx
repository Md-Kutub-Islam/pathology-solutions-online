import React, { useState } from "react";
import InputBox from "../InputBox";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaBitbucket } from "react-icons/fa6";
import logo from "../../assets/image.png";

function Header({ userData }) {
  const [searchData, setSearchData] = useState("");

  const handleOnChange = () => {};
  return (
    <div className="h-28 w-full bg-custom-light flex items-center justify-between lg:px-28">
      <Link to={`/user/home`}>
        <div className=" cursor-pointer">
          <img src={logo} alt="Logo" />
        </div>
      </Link>

      <div className="flex items-center justify-center md:gap-10 lg:gap-16">
        {/* Seaech box */}
        <Link to={`/user/search`}>
          <div className="flex items-center mt-7">
            <InputBox
              type="search"
              placeholder="Search for pathology lab"
              value={searchData}
              onChange={handleOnChange}
              className={`border-custom-green h-9 md:min-w-72 lg:min-w-72`}
            />
            <FaSearch className="relative right-7 bottom-3 text-custom-green" />
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
        <div className="flex items-center gap-1 cursor-pointer">
          <FaBitbucket className=" text-lg" />
          <span className=" text-base font-medium">Cart</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
