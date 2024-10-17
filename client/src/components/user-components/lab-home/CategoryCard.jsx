import React from "react";
import { Link } from "react-router-dom";

function CategoryCard({ categories, adminId }) {
  return (
    <div className=" mb-10">
      {categories &&
        categories.map((data) => (
          <Link to={`/user/test/${adminId}/${data._id}`}>
            <div
              key={data._id}
              className="w-full flex items-center justify-center border border-custom-light-green p-5 mb-5 rounded-lg hover:bg-custom-light duration-700"
            >
              <div className=" flex flex-col items-start gap-1">
                <h1 className=" font-bold text-base md:text-lg lg:text-lg">
                  {data.name}
                </h1>
                <span className=" font-semibold text-base">{`Total: Tests (5)`}</span>
                <span className="w-11/12 text-wrap font-semibold text-sm">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. 
                </span>
              </div>
              <div>
                <img
                  src={data.image.url}
                  alt="img"
                  className=" md:h-32 lg:h-32 w-36 h-20 rounded-lg"
                />
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default CategoryCard;
