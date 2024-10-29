import React, { useEffect } from "react";
import userProfile from "../../../assets/ai-avatar-crop.png";
import imge from "../../../assets/Electrolyte Panel.jpg";
import Button from "../../Button";
import { FaRupeeSign } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout, user } from "../../../features/user-features/userAuthSlice";
import { getAllorders } from "../../../features/comman-features/orderSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isUserVerified, isUserLogin, userData } = useSelector(
    (state) => state.userAuth
  );
  const { orders, loading } = useSelector((state) => state.order);

  const confirmedOrder =
    orders && orders?.filter((order) => order.status === "CONFIRMED");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/user/register");
  };

  useEffect(() => {
    if (isUserVerified && isUserLogin) {
      dispatch(user());
      dispatch(getAllorders());
    }
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <div className="min-h-screen w-full bg-custom-green flex flex-col items-center ">
      <div className="w-11/12 md:w-9/12 lg:w-8/12 mt-36">
        <div className="flex items-start gap-5 p-10 justify-center bg-custom-light rounded-3xl mb-5">
          <div className="h-16 w-16 flex flex-col items-center gap-2 md:h-32 md:w-32 lg:h-32 lg:w-32">
            <img src={userProfile} alt="img" className="rounded-full " />
            <Button
              className="block  text-xs border border-custom-light-green hover:scale-90 duration-700"
              px="px-3"
              py="py-0"
              children="Edit"
            />
          </div>
          <div className="flex flex-col items-start text-xs md:text-base lg:text-base font-bold">
            <span>{userData && userData?.username}</span>
            <span>{userData && userData?.email}</span>
            <span>
              Test Book: {confirmedOrder ? confirmedOrder.length : "0"}
            </span>
            <span className=" font-normal w-full text-wrap md:w-11/12 lg:w-11/12">
              {userData && userData?.useraddress[0]?.street},{" "}
              {userData && userData?.useraddress[0]?.city},{" "}
              {userData && userData?.useraddress[0]?.pincode},{" "}
              {userData && userData?.useraddress[0]?.state}
            </span>
          </div>
          <Button
            className="hidden border text-xs font-semibold border-custom-green hover:scale-90 duration-700 lg:block md:block"
            py="py-1"
            px="px-5"
            children="Logout"
            onClick={handleLogout}
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

        {confirmedOrder && confirmedOrder.length > 0 ? (
          confirmedOrder?.map((order) => (
            <div
              key={order._id}
              className="w-11/12 flex flex-col items-center m-auto gap-3 border border-custom-light-green p-5 mb-5 rounded-xl hover:scale-90 duration-700"
            >
              {order.items?.map((item, index) => (
                <div
                  key={index}
                  className="h-full w-full flex items-center justify-between pb-2 lg:gap-32 "
                >
                  <div className="flex flex-col gap-1 w-11/12 text-wrap cursor-pointer text-xs md:text-base lg:text-base">
                    <span className="font-bold">{item?.test?.testname}</span>
                    <span className="font-medium w-11/12 text-wrap">
                      {item?.test?.description}
                    </span>
                    <div className="flex items-center">
                      <FaRupeeSign className="text-custom-light" />
                      <span className="font-bold">{item?.test?.price}</span>
                    </div>
                    <span className="font-medium">Test No: 20</span>
                    <span className="font-bold">
                      {item?.labDetails?.labname}
                    </span>
                    <span className="font-medium w-11/12 text-wrap">
                      {item?.labDetails?.address?.street},{" "}
                      {item?.labDetails?.address?.city},{" "}
                      {item?.labDetails?.address?.pincode},{" "}
                      {item?.labDetails?.address?.state}
                    </span>
                    <span className="font-bold">20 Oct 2024 11: 40</span>
                  </div>

                  <img
                    src={imge}
                    alt="img"
                    className="h-16 w-16 md:h-20 md:w-20 lg:h-32 lg:w-32 rounded-lg"
                  />
                </div>
              ))}
            </div>
          ))
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
}

export default Profile;
