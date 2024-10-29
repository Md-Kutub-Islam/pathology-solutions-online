import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaBitbucket } from "react-icons/fa6";
import logo from "../../assets/image.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserCart } from "../../features/comman-features/cartSlice";
import { logout } from "../../features/user-features/userAuthSlice";
import Button from "../Button";

function Header({ userData }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const { singleCart, carts } = useSelector((state) => state.cart);
  console.log(
    "cart",
    singleCart?.items?.length > 0 && singleCart?.items?.length
  );

  const [isClick, setIsClick] = useState(false);

  const handleOnclick = () => {
    setIsClick(true);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/user/register");
  };

  useEffect(() => {
    dispatch(fetchUserCart());
  }, [carts && carts?.owner === userData?._id && carts?.items?.length]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`w-full bg-custom-light flex items-center fixed z-50 ${
        isClick
          ? "justify-center h-96 duration-700"
          : "justify-between h-28 duration-300"
      } md:px-5 lg:px-16`}
    >
      {!isClick && (
        <Link to={`/user/home`}>
          <div className="cursor-pointer">
            <img
              src={logo}
              alt="Logo"
              className="h-14 md:h-20 lg:h-20 w-full"
            />
          </div>
        </Link>
      )}

      {width > 770 ? (
        <div className="flex items-center w-3/4 justify-end gap-5 md:gap-10 lg:gap-16">
          {/* Search box */}
          <Link to={`/user/search`}>
            <div className="flex items-center border border-custom-green rounded-lg justify-center gap-3 px-3 lg:px-5 py-1">
              <span className="text-sm">Search for pathology lab</span>
              <FaSearch className="text-custom-green" />
            </div>
          </Link>

          {/* User Profile */}
          <Link to={`/user/profile`}>
            <div className="flex items-center gap-1 cursor-pointer">
              <FaUser className="text-lg" />
              <span className="text-base font-medium">
                {userData && userData?.name.slice(0, 5)}...
              </span>
            </div>
          </Link>

          {/* Cart */}
          <Link to={`/user/cart`}>
            <div className="flex items-center gap-1 cursor-pointer">
              <FaBitbucket className="text-lg" />
              <span
                className={`text-base font-medium ${
                  singleCart && singleCart.items?.length > 0
                    ? "relative right-1 top-2 text-custom-green"
                    : ""
                }`}
              >
                {singleCart && singleCart?.items?.length > 0
                  ? singleCart?.items?.length
                  : "Cart"}
              </span>
            </div>
          </Link>
        </div>
      ) : (
        <div>
          {!isClick ? (
            <GiHamburgerMenu
              className="w-10 h-6 cursor-pointer"
              onClick={handleOnclick}
            />
          ) : (
            <div className="w-full flex flex-col items-center gap-5 bg-custom-light">
              <RxCross1
                className="text-custom-green text-2xl cursor-pointer"
                onClick={() => setIsClick(false)}
              />

              {/* Mobile Search Box */}
              <Link to={`/user/search`} onClick={() => setIsClick(false)}>
                <div className="flex items-center w-full border border-custom-green rounded-lg justify-center gap-3 px-10 py-2">
                  <span className="text-sm">Search for pathology lab</span>
                  <FaSearch className="text-custom-green" />
                </div>
              </Link>

              {/* Mobile User Profile */}
              <Link to={`/user/profile`} onClick={() => setIsClick(false)}>
                <div className="flex items-center gap-1 cursor-pointer">
                  <FaUser className="text-lg" />
                  <span className="text-base font-medium">
                    {userData && userData?.name}
                  </span>
                </div>
              </Link>

              {/* Mobile Cart */}
              <Link to={`/user/cart`} onClick={() => setIsClick(false)}>
                <div className="flex items-center gap-1 cursor-pointer">
                  <FaBitbucket className="text-lg" />
                  <span
                    className={`text-base font-medium ${
                      singleCart && singleCart.items?.length > 0
                        ? "relative right-1 top-2 text-custom-green"
                        : ""
                    }`}
                  >
                    {singleCart && singleCart?.items?.length > 0
                      ? singleCart?.items?.length
                      : "Cart"}
                  </span>
                </div>
              </Link>

              <Button
                className=" border  text-xs mt-5 font-semibold border-custom-light-green hover:scale-90 duration-700 lg:block md:block"
                py="py-2"
                px="px-8"
                children="Logout"
                onClick={handleLogout}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
