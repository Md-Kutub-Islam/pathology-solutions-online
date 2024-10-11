import React, { useEffect, useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { GoHorizontalRule } from "react-icons/go";
import InputBox from "../../InputBox";
import Button from "../../Button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneAdmin } from "../../../features/admin-features/adminAuthSlice";
import Labdetails from "./Labdetails";
import { getAllCategory } from "../../../features/comman-features/categorySlice";
import CategoryCard from "./CategoryCard";

function LabHome() {
  const [searchData, setSearchData] = useState("");
  const { adminId } = useParams();
  const { isUserVerified, isUserLogin } = useSelector(
    (state) => state.userAuth
  );
  const { adminData } = useSelector((state) => state.adminAuth);
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUserVerified && isUserLogin) {
      dispatch(getOneAdmin({ adminId }));
      dispatch(getAllCategory({ adminId }));
    }
  }, [adminId]);

  const handleOnChange = () => {};
  return (
    <div className=" h-fit w-full bg-custom-green flex flex-col items-center gap-10 pt-7">
      <div>
        <h6 className=" text-xs md:text-sm lg:text-sm font-normal">
          Home / Location / Lab Name
        </h6>

        <Labdetails adminData={adminData} />
      </div>

      <div className=" flex items-center flex-col">
        <h1 className=" font-bold text-xl">All Test Category</h1>

        <div className="flex items-center justify-center mt-7 w-0 bg-custom-light px-44 h-10 pt-5 rounded-lg md:w-full lg:w-full">
          <FaSearch className="relative md:left-64 lg:left-72 bottom-3 text-custom-green" />
          <InputBox
            type="search"
            placeholder="Search For All Tests"
            value={searchData}
            onChange={handleOnChange}
            className={` border-transparent h-10 min-w-72 md:min-w-72 lg:min-w-80 text-center `}
          />
        </div>

        <div className="flex items-center relative right-32 md:right-72 lg:right-72 top-7">
          <FaFilter className="relative left-7 text-custom-green" />
          <Button children="Filter" className={`font-semibold`} />
        </div>

        <GoHorizontalRule className=" text-custom-light-green bg-custom-light-green w-11/12 h-px mt-20" />
      </div>

      <CategoryCard categories={categories} />
    </div>
  );
}

export default LabHome;