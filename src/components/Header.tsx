/* eslint-disable @next/next/no-img-element */
import React from "react";

const Header = () => {
  return (
    <header className="p-6 shadow-md flex items-center">
      {/* Logo */}
      <div className="pl-[74px] pr-[40px]">
        <img
          src="https://res.cloudinary.com/dwhlxdb6r/image/upload/v1645081723/OpenlavaIcon/Group_261_d5vzwq.png"
          alt=""
        />
      </div>

      {/* Search Bar */}
      <div className="relative bg-white mt-[12px] border-[1px] border-[#C5C5C5] rounded-[9px]">
        {/* search logo */}
        <div className="absolute left-0 mt-[11px] ml-[11px] mr-[11px] bg-white">
          <img
            src="https://res.cloudinary.com/dwhlxdb6r/image/upload/v1645082197/OpenlavaIcon/Vector_lahfkt.png"
            alt=""
            className="w-full"
          />
        </div>

        {/* search form */}
        <div className="">
          <input
            type="text"
            placeholder="Search OpenLava"
            className="w-96 h-10 ml-[40px] bg-transparent focus:shadow focus:outline-none"
          />
        </div>
      </div>

      {/* menu bar */}
      <div className="ml-auto">Menu Bar</div>
    </header>
  );
};

export default Header;
