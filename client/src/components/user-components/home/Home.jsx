import React, { useEffect } from "react";
import testIMG1 from "../../../assets/Prothrombin Time.jpg";
import testIMG2 from "../../../assets/Electrolyte Panel.jpg";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import Button from "../../Button";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdmins } from "../../../features/admin-features/adminAuthSlice";
import { getAlltests } from "../../../features/comman-features/testSlice";

function Home() {
  const dispatch = useDispatch();
  const { isUserVerified, isUserLogin } = useSelector(
    (state) => state.userAuth
  );
  const { allAdminData } = useSelector((state) => state.adminAuth);
  const { tests } = useSelector((state) => state.test);
  console.log("test:", tests);

  useEffect(() => {
    if (isUserVerified && isUserLogin) {
      dispatch(getAllAdmins());
      dispatch(getAlltests());
    }
  }, []);

  // console.log("allAdminData:", allAdminData);

  return (
    <div className=" w-full pt-10 bg-custom-green min-h-screen">
      <div className="flex flex-col gap-10">
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
                    className="h-32 w-32 rounded-full object-cover"
                    src={ele.mainImage.url}
                    alt="testImage"
                  />
                  <span className=" text-wrap">{ele.testname}</span>
                </div>
              ))}
          </div>
        </div>

        <hr className=" border-custom-light" />

        <div className="w-5/6 m-auto">
          <div className="flex items-center justify-between">
            <h1 className=" font-semibold">Top Pathology Lab in Asansol.</h1>
            <div className="flex items-center">
              <FaFilter className="relative left-7 text-custom-green" />
              <Button children="Filter" className={`font-semibold`} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 mt-10 w-full md:grid-cols-4 lg:grid-cols-4 mb-10">
            {allAdminData && allAdminData.length > 0 ? (
              allAdminData.map((ele) => (
                <div
                  key={ele._id}
                  className="w-full py-5 px-2 rounded-lg flex flex-col items-center justify-center gap-2 bg-custom-light hover:bg-transparent hover:border-2 hover:border-custom-light transition duration-500 ease-in-out"
                >
                  <div>
                    <img
                      className="w-48 h-28 rounded-lg"
                      src={testIMG2}
                      alt="Lab Image"
                    />
                  </div>
                  <div className="w-48">
                    <span className="text-lg font-semibold text-wrap">
                      {ele.labname}
                    </span>
                    <div className="flex items-center gap-2">
                      <FaStarHalfAlt className="text-custom-green" />
                      <span>3.5</span>
                    </div>
                    <span>Full Lab address...</span>
                  </div>
                </div>
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
