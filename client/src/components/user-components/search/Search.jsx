import React, { useEffect, useState } from "react";
import InputBox from "../../InputBox";
import { FaSearch } from "react-icons/fa";
import SearchList from "./SearchList";
import axios from "axios";

function Search() {
  const [searchData, setSearchData] = useState("");
  const limit = 12;
  const [searchListData, setSearchListData] = useState([]);

  const fetchData = async (searchData) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL_BASEURL}/search/search-lab/${limit}`,
        {
          params: {
            q: searchData, // Attach the query as a URL parameter
          },
        }
      );
      setSearchListData(response.data.data.searchInfo);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    if (searchData.length > 2) {
      fetchData(searchData);
    }
  }, [searchData]);

  console.log("searchData:", searchListData);

  return (
    <div className="h-screen w-full bg-custom-green flex flex-col items-center pt-7">
      <div className="w-full md:w-8/12 lg:w-7/12 ">
        <h6 className=" text-xs md:text-sm lg:text-sm font-normal mb-5">
          Home / Location / Lab Name
        </h6>
        <div className="flex w-full h-9 bg-custom-light rounded-md mb-5">
          <InputBox
            type="text"
            placeholder="Search for pathology lab "
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            className={`h-9 w-full`}
          />
          <FaSearch className=" text-custom-green h-9 mr-4 " />
        </div>
      </div>

      <div className="mb-10">
        {searchListData &&
          searchListData.length > 0 &&
          searchListData.map((data) => (
            <SearchList
              key={data._id}
              name={data.labname}
              description={data.description}
            />
          ))}
      </div>
    </div>
  );
}

export default Search;
