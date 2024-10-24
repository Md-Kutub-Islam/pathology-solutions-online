import React, { useEffect, useState } from "react";
import { FaRupeeSign, FaPercent, FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearCart,
  fetchUserCart,
  removeFromCart,
} from "../../../features/comman-features/cartSlice";
import { MdOutlineDelete } from "react-icons/md";
import {
  checkout,
  verifyPayment,
} from "../../../features/comman-features/paymentSlice";
import { addOrder } from "../../../features/comman-features/orderSlice";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isUserVerified, isUserLogin, userInfo } = useSelector(
    (state) => state.userAuth
  );
  const { orderData, status, error } = useSelector((state) => state.payment);
  const { singleCart } = useSelector((state) => state.cart);
  const totalTestPrice =
    singleCart &&
    singleCart?.items
      ?.map((item) => {
        return item?.test?.price;
      })
      .reduce((acc, curr) => acc + curr, 0);
  const gstPrice = (2 / 100) * totalTestPrice + 2;
  const [dependency, setDependency] = useState(0);
  const [isEnter, setIsEnter] = useState(false);

  const handleDelete = (testId) => {
    if (!testId) return;
    setDependency(Math.random());
    dispatch(removeFromCart({ testId }));
  };

  const handlePlaceOrder = () => {
    let orderItems = [];

    singleCart?.items?.forEach((data) => {
      orderItems.push({
        testId: data?.test?._id,
        labId: data?.lab?._id,
      });
    });

    const userId = userInfo?._id;

    if (!orderItems.length || !userId) return;

    // Dispatch the order with the merged structure
    dispatch(addOrder({ orderItems, userId }));
    setIsEnter(true);
  };

  const handlePayment = () => {
    const amount = totalTestPrice + 6 + gstPrice;
    dispatch(checkout({ amount }));
  };

  const handlePaymentVerify = (data) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Razorpay key
      amount: data.amount,
      currency: data.currency,
      name: "Pathology Solution Online+",
      description: "Test Mode",
      order_id: data.id,
      handler: (response) => {
        console.log("Payment Response:", response.razorpay_order_id);
        // Dispatch action to verify payment
        dispatch(
          verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          })
        );
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  useEffect(() => {
    if (isUserVerified && isUserLogin) {
      dispatch(fetchUserCart());
    }
  }, [dependency]);

  useEffect(() => {
    if (status === "succeeded" && orderData) {
      handlePaymentVerify(orderData.data.orderInfo);
      dispatch(clearCart());
      navigate("/user/home");
    }
  }, [status, orderData]);

  return (
    <div className="h-screen w-full flex justify-center bg-custom-green">
      <div className="h-fit w-11/12 p-5 md:w-8/12 lg:w-7/12 mt-10 rounded-lg bg-custom-light flex flex-col items-center ">
        {singleCart &&
          singleCart.items.map((data) => (
            <div
              key={data.test._id}
              className="w-11/12 md:w-10/12 lg:w-10/12 flex flex-col gap-4 mb-4 border border-custom-light-green p-2 rounded-lg"
            >
              <div className="flex items-center justify-between w-full">
                <div className="w-11/12 text-wrap">
                  <h1 className="text-base font-bold">{data?.lab?.labname}</h1>
                  <span className="text-sm">{data?.lab?.description}</span>
                </div>
                <MdOutlineDelete
                  className="text-custom-green text-2xl cursor-pointer"
                  onClick={() => handleDelete(data.test._id)}
                />
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
          {singleCart && singleCart.items.length > 0 ? (
            <div>
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

                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-wrap w-7/12">To Pay</span>
                    <div className="flex items-center text-sm font-bold">
                      <FaRupeeSign className="text-custom-green" />
                      <span>{totalTestPrice + 6 + gstPrice}</span>
                    </div>
                  </div>

                  <div>
                    {!isEnter ? (
                      <div
                        className="w-full py-2 rounded-lg bg-custom-green flex items-center justify-center gap-1 text-sm font-bold cursor-pointer mt-5"
                        onClick={handlePlaceOrder}
                      >
                        <div className="flex items-center text-sm font-bold">
                          <FaRupeeSign className="text-custom-light" />
                          <span>{totalTestPrice + 6 + gstPrice}</span>
                        </div>{" "}
                        <span>Place Order</span>
                      </div>
                    ) : (
                      <div
                        className="w-full py-2 rounded-lg bg-custom-green flex items-center justify-center gap-1 text-sm font-bold cursor-pointer mt-5"
                        onClick={handlePayment}
                      >
                        <span>Payment</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
