import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";

function UserLayOut() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/user/register" &&
        location.pathname !== "/user/login" && <Header />}
      <div>
        <Outlet />
      </div>
      {/* {location.pathname !== "/user/register" &&
        location.pathname !== "/user/login" && <div>Footer</div>} */}
    </div>
  );
}

export default UserLayOut;
