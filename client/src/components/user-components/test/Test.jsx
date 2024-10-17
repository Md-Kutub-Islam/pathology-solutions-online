import React, { useEffect } from "react";
import Labdetails from "../lab-home/Labdetails";
import { Link, useParams } from "react-router-dom";
import { FaFilter, FaSearch } from "react-icons/fa";
import Button from "../../Button";
import { GoHorizontalRule } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import { getOneAdmin } from "../../../features/admin-features/adminAuthSlice";
import { getTestByCategory } from "../../../features/comman-features/testSlice";
import TestCard from "./TestCard";

function Test() {
  const { adminId, categoryId } = useParams();
  const dispatch = useDispatch();
  const { isUserVerified, isUserLogin } = useSelector(
    (state) => state.userAuth
  );
  const { adminData } = useSelector((state) => state.adminAuth);
  const { tests } = useSelector((state) => state.test);

  useEffect(() => {
    if (isUserVerified && isUserLogin) {
      dispatch(getOneAdmin({ adminId }));
      dispatch(getTestByCategory({ categoryId }));
    }
  }, [adminId, categoryId]);

  console.log("test:", tests && tests);

  return (
    <div className=" h-fit w-full bg-custom-green flex flex-col items-center gap-10 pt-7">
      <div>
        <h6 className=" text-xs md:text-sm lg:text-sm font-normal">
          Home / Location / Test
        </h6>

        <Labdetails adminData={adminData} />
      </div>

      <div className=" flex items-center flex-col">
        <h1 className=" font-bold text-xl">{tests && tests[0]?.name}</h1>

        <Link to={`/user/search/test`}>
          <div className="flex items-center justify-center gap-5 mt-7 bg-custom-light px-20 md:px-44 lg:px-44 h-10 rounded-lg w-full md:w-full lg:w-full">
            <span className="text-xs w-full">{`Search For All Tests`}</span>
            <FaSearch className="text-custom-green" />
          </div>
        </Link>

        <div className="flex items-center relative right-32 md:right-72 lg:right-72 top-7">
          <FaFilter className="relative left-7 text-custom-green" />
          <Button children="Filter" className={`font-semibold`} />
        </div>

        <GoHorizontalRule className=" text-custom-light-green bg-custom-light-green w-11/12 h-px mt-20" />
      </div>

      <TestCard tests={tests && tests} />
    </div>
  );
}

export default Test;
