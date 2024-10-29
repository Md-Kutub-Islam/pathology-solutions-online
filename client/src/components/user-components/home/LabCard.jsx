import React from "react";
import testIMG2 from "../../../assets/Electrolyte Panel.jpg";
import { FaStarHalfAlt } from "react-icons/fa";

function LabCard({ adminData }) {
  const { labname, addressDetails } = adminData;
  const address = `${addressDetails?.address}, ${addressDetails?.city}, ${addressDetails?.pincode}`;
  return (
    <div className="w-full h-64 py-5 px-2 rounded-lg flex flex-col items-center justify-center gap-2 bg-custom-light hover:bg-transparent hover:border-2 hover:border-custom-light-green transition hover:scale-90 duration-700 ">
      <div>
        <img className="w-48 h-28 rounded-lg" src={testIMG2} alt="Lab Image" />
      </div>
      <div className="lg:w-48 w-full">
        <span className="lg:text-lg md:text-base font-semibold text-wrap">
          {labname}
        </span>
        <div className="flex items-center gap-2">
          <FaStarHalfAlt className="text-custom-green" />
          <span>3.5</span>
        </div>
        <span className="text-sm">{address && address.slice(0, 20)}...</span>
      </div>
    </div>
  );
}

export default LabCard;
