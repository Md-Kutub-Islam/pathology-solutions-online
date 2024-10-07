import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import { useSelector } from "react-redux";

function UserLayOut() {
  const location = useLocation();
  const { userData } = useSelector((state) => state.userAuth);
  console.log("userData", userData);

  return (
    <div>
      {location.pathname !== "/user/register" &&
        location.pathname !== "/user/login" && <Header userData={userData} />}
      <div>
        <Outlet />
      </div>
      {/* {location.pathname !== "/user/register" &&
        location.pathname !== "/user/login" && <div>Footer</div>} */}
    </div>
  );
}

export default UserLayOut;
