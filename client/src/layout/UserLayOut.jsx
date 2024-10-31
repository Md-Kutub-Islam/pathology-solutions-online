import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import { useSelector } from "react-redux";

function UserLayOut() {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.userAuth);

  return (
    <div>
      {location.pathname !== "/user/register" &&
        location.pathname !== "/user/login" &&
        location.pathname !== "/" && <Header userData={userInfo} />}
      <div>
        <Outlet />
      </div>
      {/* {location.pathname !== "/user/register" &&
        location.pathname !== "/user/login" && <div>Footer</div>} */}
    </div>
  );
}

export default UserLayOut;
