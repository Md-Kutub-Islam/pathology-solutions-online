import React from "react";
import { FaStarHalfAlt, FaChevronCircleRight } from "react-icons/fa";
import { GoHorizontalRule } from "react-icons/go";

function Labdetails({ adminData }) {
  return (
    <div className=" w-full md:min-w-[600px] lg:min-w-[800px] bg-custom-light p-10 rounded-lg mt-5 flex flex-col items-start gap-2">
      <h1 className=" font-semibold text-lg">
        {adminData && adminData.labname}
      </h1>
      <div className="flex items-center gap-2">
        <FaStarHalfAlt className="text-custom-green" />
        <span>3.5</span>
        <span className=" font-semibold">{`(446 rating)`}</span>
      </div>
      <span className=" text-wrap font-medium text-lg w-11/12">
        {adminData && adminData.description}
      </span>

      <span className=" text-wrap font-bold text-sm w-11/12">
        {`${adminData && adminData.addressDetails.address}, ${
          adminData && adminData.addressDetails.city
        }, ${adminData && adminData.addressDetails.pincode}`}
      </span>
      <GoHorizontalRule className=" text-custom-light-green bg-custom-light-green w-11/12 h-px" />
      <div className="flex items-center gap-2">
        <FaChevronCircleRight />
        <span className=" font-bold">Get report within 6 hours</span>
      </div>
    </div>
  );
}

export default Labdetails;
