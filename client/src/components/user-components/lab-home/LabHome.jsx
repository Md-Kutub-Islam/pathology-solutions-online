import React, { useState } from "react";
import {
  FaStarHalfAlt,
  FaChevronCircleRight,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import { GoHorizontalRule } from "react-icons/go";
import InputBox from "../../InputBox";
import Button from "../../Button";
import testIMG1 from "../../../assets/Prothrombin Time.jpg";

function LabHome() {
  const [searchData, setSearchData] = useState("");

  const handleOnChange = () => {};
  return (
    <div className=" h-fit w-full bg-custom-green flex flex-col items-center gap-10 pt-7">
      <div>
        <h6 className=" text-xs md:text-sm lg:text-sm font-normal">
          Home / Location / Lab Name
        </h6>

        <div className=" w-full bg-custom-light p-10 rounded-lg mt-5 flex flex-col items-start gap-2">
          <h1 className=" font-semibold text-lg">Lab Full Name</h1>
          <div className="flex items-center gap-2">
            <FaStarHalfAlt className="text-custom-green" />
            <span>3.5</span>
            <span className=" font-semibold">{`(446 rating)`}</span>
          </div>
          <span className=" text-wrap font-normal text-lg w-11/12">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. 
          </span>
          <GoHorizontalRule className=" text-custom-light-green bg-custom-light-green w-11/12 h-px" />
          <div className="flex items-center gap-2">
            <FaChevronCircleRight />
            <span className=" font-bold">Get report within 6 hours</span>
          </div>
        </div>
      </div>

      <div className=" flex items-center flex-col">
        <h1 className=" font-bold text-xl">All Test Category</h1>

        <div className="flex items-center justify-center mt-7 w-0 bg-custom-light px-44 h-10 pt-5 rounded-lg md:w-full lg:w-full">
          <FaSearch className="relative md:left-64 lg:left-72 bottom-3 text-custom-green" />
          <InputBox
            type="search"
            placeholder="Search For All Tests"
            value={searchData}
            onChange={handleOnChange}
            className={` border-transparent h-10 min-w-72 md:min-w-72 lg:min-w-80 text-center `}
          />
        </div>

        <div className="flex items-center relative right-32 md:right-72 lg:right-72 top-7">
          <FaFilter className="relative left-7 text-custom-green" />
          <Button children="Filter" className={`font-semibold`} />
        </div>

        <GoHorizontalRule className=" text-custom-light-green bg-custom-light-green w-11/12 h-px mt-20" />
      </div>

      <div className=" mb-10">
        {[1, 2, 3, 4, 5, 6].map((ele, index) => (
          <div
            key={index}
            className="w-full flex items-center justify-center border border-custom-light-green p-5 mb-5 rounded-lg hover:bg-custom-light duration-700"
          >
            <div className=" flex flex-col items-start gap-1">
              <h1 className=" font-bold text-base md:text-lg lg:text-lg">
                Test Category Name
              </h1>
              <span className=" font-semibold text-base">{`Total: Tests (5)`}</span>
              <span className="w-11/12 text-wrap font-semibold text-sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. 
              </span>
            </div>
            <div>
              <img
                src={testIMG1}
                alt="img"
                className=" md:h-32 lg:h-32 w-36 h-20 rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LabHome;
