import React, { useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import Button from "../../Button";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdmins } from "../../../features/admin-features/adminAuthSlice";
import { getAlltests } from "../../../features/comman-features/testSlice";
import LabCard from "./LabCard";
import { Link } from "react-router-dom";
import Loading from "../../Loading";

function Home() {
  const dispatch = useDispatch();
  const { isUserVerified, isUserLogin } = useSelector(
    (state) => state.userAuth
  );
  const { allAdminData, loading } = useSelector((state) => state.adminAuth);
  const { tests } = useSelector((state) => state.test);

  useEffect(() => {
    if (isUserVerified && isUserLogin) {
      dispatch(getAllAdmins());
      dispatch(getAlltests());
    }
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className=" w-full pt-10 bg-custom-green min-h-screen">
      <div className="flex flex-col gap-10 mt-24">
        <div className="flex flex-col w-5/6 m-auto">
          <h1 className=" font-semibold">
            Your Health, Our Priority – Book, Test, Download.
          </h1>

          <div className="flex items-center justify-center gap-10 mt-10 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {tests &&
              tests.length > 0 &&
              tests.map((ele) => (
                <div
                  key={ele._id}
                  className="flex flex-col items-center shrink-0"
                >
                  <img
                    className="h-24 w-24 md:h-32 md:w-32 lg:h-32 lg:w-32 rounded-full object-cover"
                    src={ele?.mainImage?.url}
                    alt="testImage"
                  />
                  <span className="text-wrap text-xs mt-1 md:text-base lg:text-base">
                    {ele.testname}
                  </span>
                </div>
              ))}
          </div>
        </div>

        <hr className="w-5/6 border-custom-light-green m-auto" />

        <div className="w-5/6 m-auto">
          <div className="flex items-center justify-between">
            <h1 className=" font-semibold">Top Pathology Lab in Asansol.</h1>
            <div className="flex items-center">
              <FaFilter className="relative left-7 text-custom-green" />
              <Button children="Filter" className={`font-semibold`} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 mt-10 w-full md:grid-cols-4 lg:grid-cols-4 mb">
            {allAdminData && allAdminData.length > 0 ? (
              allAdminData.map((ele) => (
                <Link key={ele._id} to={`/user/lab-home/${ele._id}`}>
                  <LabCard adminData={ele} />
                </Link>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
