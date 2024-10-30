import React from "react";
import img from "../../../assets/Prothrombin Time.jpg";
import { Link } from "react-router-dom";

function SearchList({ id, name, description, lab }) {
  console.log(id);

  return (
    <Link to={lab ? `/user/test/${lab}/${id}` : `/user/lab-home/${id}`}>
      <div
        key={id}
        className="w-full flex items-center justify-center gap-5 border border-custom-light-green p-2 mb-1 rounded-lg md:gap-10 lg:gap-10 hover:bg-custom-light duration-700"
      >
        <div className=" flex flex-col items-start gap-1 ">
          <h1 className=" font-bold text-sm">{name}</h1>
          <span className="w-11/12 text-wrap font-semibold text-xs">
            {description}
          </span>
        </div>
        <div>
          <img
            src={img}
            alt="img"
            className="w-16 h-12 md:h-16 lg:h-16 rounded-lg"
          />
        </div>
      </div>
    </Link>
  );
}

export default SearchList;
