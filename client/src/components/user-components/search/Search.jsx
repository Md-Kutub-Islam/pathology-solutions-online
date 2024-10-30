import React, { useEffect, useRef, useState } from "react";
import InputBox from "../../InputBox";
import { FaSearch } from "react-icons/fa";
import SearchList from "./SearchList";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Search() {
  const [searchData, setSearchData] = useState("");
  const [placeholder, setPlaceholder] = useState("Search for pathology lab");
  const [urlPath, setUrlPath] = useState("search/search-lab");
  const location = useLocation();
  const limit = 12;
  const [searchListData, setSearchListData] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const refs = useRef();

  const fetchData = async (searchData) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL_BASEURL}/${urlPath}/${limit}`,
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

  const handleOnFocus = () => {
    setIsFocused(true);
    refs.current.focus();
  };

  useEffect(() => {
    if (location.pathname === "/user/search/test") {
      setPlaceholder("Search for All Test");
      setUrlPath("search/search-category");
    }
    handleOnFocus();
  }, []);

  useEffect(() => {
    if (searchData.length > 2) {
      fetchData(searchData);
    }
  }, [searchData]);

  return (
    <div className="min-h-screen w-full bg-custom-green flex flex-col items-center pt-7">
      <div className="w-full md:w-8/12 lg:w-7/12 mt-24">
        <div className="flex w-full h-9 bg-custom-light rounded-md mb-5">
          <InputBox
            ref={refs}
            type="text"
            placeholder={placeholder}
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            onFocus={handleOnFocus}
            onBlur={() => setIsFocused(false)}
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
              id={data._id}
              name={data.labname || data.name}
              description={data.description}
              lab={data.owner}
            />
          ))}
      </div>
    </div>
  );
}

export default Search;
