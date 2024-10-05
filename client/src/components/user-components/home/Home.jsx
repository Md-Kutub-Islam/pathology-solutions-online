import React from "react";
import testIMG1 from "../../../assets/Prothrombin Time.jpg";
import testIMG2 from "../../../assets/Electrolyte Panel.jpg";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import Button from "../../Button";

function Home() {
  return (
    <div className=" w-full pt-10 bg-custom-green min-h-screen">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col w-5/6 m-auto">
          <h1 className=" font-semibold">
            Your Health, Our Priority – Book, Test, Download.
          </h1>

          <div className=" flex items-center justify-center gap-10 mt-10 ">
            {[1, 2, 3, 4, 5, 6].map((ele, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  className="h-32 w-32 rounded-full object-cover"
                  src={testIMG1}
                  alt="testImage"
                />
                <span>Test Name</span>
              </div>
            ))}
          </div>
        </div>

        <hr className=" border-custom-light" />

        <div className="w-4/5 m-auto">
          <div className="flex items-center justify-between">
            <h1 className=" font-semibold">Top Pathology Lab in Asansol.</h1>
            <div className="flex items-center">
              <FaFilter className="relative left-7 text-custom-green" />
              <Button children="Filter" className={`font-semibold`} />
            </div>
          </div>

          <div className="flex items-center justify-center md:flex-wrap gap-5 mt-10">
            {[1, 2, 3, 4].map((ele, index) => (
              <div
                key={index}
                className="w-1/4 py-5 px-2 rounded-lg bg-custom-light flex flex-col items-center justify-center gap-2"
              >
                <div>
                  <img
                    className="w-48 h-28 rounded-lg"
                    src={testIMG2}
                    alt="Lab Image"
                  />
                </div>
                <div className="lg:mr-16">
                  <span className="text-lg font-semibold">Lab Name</span>
                  <div className="flex items-center gap-2">
                    <FaStarHalfAlt className="text-custom-green" />
                    <span>3.5</span>
                  </div>
                  <span>Full Lab address...</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
