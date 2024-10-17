import React from "react";
import { FaRupeeSign, FaPercent, FaArrowRight } from "react-icons/fa";

function Cart() {
  return (
    <div className="h-screen w-full flex justify-center bg-custom-green">
      <div className="h-fit w-11/12 p-5 md:w-8/12 lg:w-7/12 mt-10 rounded-lg bg-custom-light flex flex-col items-center ">
        <div className="w-11/12 md:w-10/12 lg:w-10/12 flex flex-col gap-4">
          <div>
            <h1 className="text-base font-bold">Lab Full Name</h1>
            <span className="text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. 
            </span>
          </div>
          <hr className=" border border-custom-light-green" />
          <div className="flex items-center justify-between border border-custom-light-green p-4 rounded-lg">
            <div className="flex flex-col">
              <span className=" text-base font-bold">Test Name</span>
              <span className="text-sm">Lorem Ipsum is simply..... </span>
            </div>
            <div className="flex items-center text-sm font-semibold">
              <FaRupeeSign className="text-custom-green" />
              <span>155</span>
            </div>
          </div>
        </div>

        <div className="w-11/12 md:w-10/12 lg:w-10/12 mt-4">
          <div className="flex items-center justify-between bg-custom-green px-2 py-2 mb-4 rounded-lg">
            <div className="flex items-center text-sm font-bold gap-2">
              <FaPercent />
              <span>APPLY COUPON</span>
            </div>
            <FaArrowRight />
          </div>

          <div>
            <span className="font-bold">Bills details </span>

            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start font-semibold">
                <span>Total Test </span>
                <span>Platform fee</span>
                <span className="text-wrap w-9/12">
                  GST and Restaurant Charges
                </span>
              </div>

              <div className="flex flex-col items-end gap-3 mb-4">
                <div className="flex items-center text-sm font-semibold">
                  <FaRupeeSign className="text-custom-green" />
                  <span>155</span>
                </div>
                <div className="flex items-center text-sm font-semibold">
                  <FaRupeeSign className="text-custom-green" />
                  <span>6</span>
                </div>
                <div className="flex items-center text-sm font-semibold">
                  <FaRupeeSign className="text-custom-green" />
                  <span>0.1</span>
                </div>
              </div>
            </div>

            <hr className=" border border-custom-light-green my-4" />

            <div className="flex items-center justify-between">
              <span className="font-bold text-wrap w-7/12">To Pay</span>
              <div className="flex items-center text-sm font-bold">
                <FaRupeeSign className="text-custom-green" />
                <span>161.1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
