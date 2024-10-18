import React, { useEffect } from "react";
import { FaRupeeSign, FaPercent, FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCart } from "../../../features/comman-features/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const { isUserVerified, isUserLogin } = useSelector(
    (state) => state.userAuth
  );
  const { singleCart } = useSelector((state) => state.cart);
  const totalTestPrice =
    singleCart &&
    singleCart?.items
      ?.map((item) => {
        return item?.test?.price;
      })
      .reduce((acc, curr) => acc + curr, 0);
  const gstPrice = (2 / 100) * totalTestPrice + 2;

  useEffect(() => {
    if (isUserVerified && isUserLogin) {
      dispatch(fetchUserCart());
    }
  }, []);
  return (
    <div className="h-screen w-full flex justify-center bg-custom-green">
      <div className="h-fit w-11/12 p-5 md:w-8/12 lg:w-7/12 mt-10 rounded-lg bg-custom-light flex flex-col items-center ">
        {singleCart &&
          singleCart.items.map((data) => (
            <div
              key={data.test._id}
              className="w-11/12 md:w-10/12 lg:w-10/12 flex flex-col gap-4 mb-4 border border-custom-light-green p-2 rounded-lg"
            >
              <div>
                <h1 className="text-base font-bold">{data?.lab?.labname}</h1>
                <span className="text-sm">{data?.lab?.description}</span>
              </div>
              <hr className=" border border-custom-light-green" />
              <div className="flex items-center justify-between border border-custom-light-green p-4 rounded-lg">
                <div className="flex flex-col">
                  <span className=" text-xs text-wrap md:text-base lg:text-base font-bold">
                    {data?.test?.name}
                  </span>
                  <span className="text-sm">Lorem Ipsum is simply..... </span>
                </div>
                <div className="flex items-center text-sm font-semibold">
                  <FaRupeeSign className="text-custom-green" />
                  <span>{data?.test?.price}</span>
                </div>
              </div>
            </div>
          ))}

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
                  <span>{totalTestPrice}</span>
                </div>
                <div className="flex items-center text-sm font-semibold">
                  <FaRupeeSign className="text-custom-green" />
                  <span>6</span>
                </div>
                <div className="flex items-center text-sm font-semibold">
                  <FaRupeeSign className="text-custom-green" />
                  <span>{gstPrice}</span>
                </div>
              </div>
            </div>

            <hr className=" border border-custom-light-green my-4" />

            <div className="flex items-center justify-between">
              <span className="font-bold text-wrap w-7/12">To Pay</span>
              <div className="flex items-center text-sm font-bold">
                <FaRupeeSign className="text-custom-green" />
                <span>{totalTestPrice + 6 + gstPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
