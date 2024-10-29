import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../Button";
import { FaRupeeSign } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addOrUpdateCart } from "../../../features/comman-features/cartSlice";

function TestCard({ tests }) {
  const dispatch = useDispatch();
  const handleOnClick = (testId) => {
    if (!testId) return;
    dispatch(addOrUpdateCart({ testId }));
    toast.success("Test is added to the cart.");
  };

  return (
    <div>
      {tests &&
        tests.map((data) => (
          <div
            key={data?.testDetails?._id}
            className="group w-full flex items-center justify-center border border-custom-light-green p-5 mb-5 rounded-lg hover:bg-custom-light duration-700"
          >
            <div className=" flex flex-col items-start gap-1">
              <h1 className=" font-bold text-base md:text-lg lg:text-lg">
                {data?.testDetails?.testname}
              </h1>
              <div className="flex items-center">
                <FaRupeeSign />
                <span className=" font-semibold text-base">
                  {data?.testDetails?.price}
                </span>
              </div>
              <span className=" font-bold text-base">{`Total: Tests (5)`}</span>
              <span className="w-11/12 text-wrap font-semibold text-sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. 
              </span>
            </div>
            <div className="flex flex-col items-center relative top-4">
              <img
                src={data?.testDetails?.mainImage?.url}
                alt="img"
                className=" md:h-32 lg:h-32 w-36 h-20 rounded-lg"
              />

              <Button
                children={`ADD`}
                text="text-xs"
                className={`font-bold relative bottom-4  group-hover:bg-custom-green duration-700`}
                onClick={() => handleOnClick(data?.testDetails?._id)}
              />
            </div>
            <ToastContainer
              position="bottom-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </div>
        ))}
    </div>
  );
}

export default TestCard;
