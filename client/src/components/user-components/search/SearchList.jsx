import React from "react";
import img from "../../../assets/Prothrombin Time.jpg";

function SearchList({ id, name, description }) {
  return (
    <div
      key={id}
      className="w-full flex items-center justify-center border border-custom-light-green p-2 mb-1 rounded-lg hover:bg-custom-light duration-700"
    >
      <div className=" flex flex-col items-start gap-1">
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
  );
}

export default SearchList;
