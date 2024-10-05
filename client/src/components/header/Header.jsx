import React, { useState } from "react";
import InputBox from "../InputBox";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaBitbucket } from "react-icons/fa6";
import logo from "../../assets/image.png";

function Header() {
  const [searchData, setSearchData] = useState("");

  const handleOnChange = () => {};
  return (
    <div className="h-28 w-full bg-custom-light flex items-center justify-between lg:px-28">
      <div>
        <img src={logo} alt="Logo" />
      </div>

      <div className="flex items-center justify-center md:gap-10 lg:gap-16">
        {/* Seaech box */}
        <div className="flex items-center mt-7">
          <FaSearch className="relative md:left-64 lg:left-72 bottom-3 text-custom-green" />
          <InputBox
            type="search"
            placeholder="Search for pathology lab and tests "
            value={searchData}
            onChange={handleOnChange}
            className={`border-custom-green h-10 md:min-w-72 lg:min-w-80`}
          />
        </div>

        {/* User */}
        <div className="flex items-center gap-2">
          <FaUser />
          <span className=" text-base">UserName....</span>
        </div>

        {/* Cart */}
        <div className="flex items-center gap-2">
          <FaBitbucket />
          <span className=" text-base">Cart</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
