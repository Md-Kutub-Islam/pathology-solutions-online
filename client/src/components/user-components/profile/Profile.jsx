import React from "react";
import userProfile from "../../../assets/ai-avatar-crop.png";
import imge from "../../../assets/Electrolyte Panel.jpg";
import Button from "../../Button";
import { FaRupeeSign } from "react-icons/fa";

function Profile() {
  return (
    <div className="min-h-screen w-full bg-custom-green flex flex-col items-center ">
      <div className="w-11/12 md:w-9/12 lg:w-8/12  mt-10">
        <div className="flex items-start gap-5 p-10 justify-center bg-custom-light rounded-3xl mb-5">
          <div className="h-16 w-16 flex flex-col items-center gap-2 md:h-32 md:w-40 lg:h-32 lg:w-32">
            <img src={userProfile} alt="img" className="rounded-full " />
            <Button
              className="block lg:hidden md:hidden text-xs border border-custom-light-green"
              px="px-3"
              py="py-0"
              children="Edit"
            />
          </div>
          <div className="flex flex-col items-start text-xs md:text-base lg:text-base font-bold">
            <span>User Full Name</span>
            <span>user@gmail.com</span>
            <span>Test Book: (0)</span>
            <span className=" font-normal w-full text-wrap md:w-11/12 lg:w-11/12">
              User address Ipsum is simply dummy text of the printing and
              typesetting . 
            </span>
          </div>
          <Button
            className="hidden border border-custom-green hover:scale-90 duration-700 lg:block md:block"
            py="py-1"
            children="Edit"
          />
        </div>
        <hr />
        <div className="flex flex-wrap lg:flex-nowrap md:flex-nowrap items-center justify-center md:gap-6 gap-1 lg:gap-6 my-5">
          <Button
            children="Book Test Details"
            className="text-xs font-semibold md:text-xs lg:text-base rounded-xl"
          />
          <Button
            children="Complete Test Details"
            className="text-xs font-semibold md:text-xs lg:text-base rounded-xl"
          />
          <Button
            children="Cancel Test Details"
            className="text-xs font-semibold md:text-xs lg:text-base rounded-xl"
          />
        </div>
        <div className="flex items-center border border-custom-light-green p-5 rounded-xl hover:scale-90 duration-700">
          <div className="flex flex-col gap-1 w-11/12 text-wrap cursor-pointer text-xs md:text-base lg:text-base">
            <span className="font-bold">Test Name</span>
            <span className="font-medium">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. 
            </span>
            <div className="flex items-center">
              <FaRupeeSign className="text-custom-light" />
              <span className="font-bold">155</span>
            </div>
            <span className="font-medium">Test No: 20</span>
            <span className="font-bold">Lab Name</span>
            <span className="font-medium">
              Lab address Ipsum is simply dummy text of the printing and
              typesetting . 
            </span>
            <span className="font-bold">20 Oct 2024 11: 40</span>
          </div>

          <img
            src={imge}
            alt="img"
            className="h-20 w-20 lg:h-32 lg:w-32 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
