import React from "react";
import { ClipLoader } from "react-spinners";

function Loading() {
  return (
    <div className=" bg-custom-green h-screen w-full">
      <div className="absolute top-1/2 left-1/2">
        <ClipLoader loading={true} color="black" />
      </div>
    </div>
  );
}

export default Loading;
