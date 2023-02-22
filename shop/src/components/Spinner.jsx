import React from "react";
import Spiner from "./loader.svg";
export default function Spinner() {
  return (
    <div
      class=" bg-black bg-opacity-50 flex items-center 
                left-0 right-0 bottom-0 top-0 min-h-screen w-screen 
                justify-center h-full "
    >
      <div>
        <img src={Spiner} alt="loading" className=" h-24 " />
      </div>
    </div>
  );
}
