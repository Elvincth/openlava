/* eslint-disable @next/next/no-img-element */
import React from "react";

const Header = () => {
  return (
    <div className="py-[15px] pl-[100px] pr-[100px] shadow-md flex items-center">
      {/* Logo */}
      <div className="pr-[40px]">
        <img
          src="https://res.cloudinary.com/dwhlxdb6r/image/upload/v1645081723/OpenlavaIcon/Group_261_d5vzwq.png"
          alt=""
        />
      </div>

      {/* Search Bar */}
      <div className="relative bg-white mt-[12px] border-[1px] border-[#C5C5C5] rounded-[9px]">
        {/* search logo */}
        <div className="absolute left-0 mt-[11px] ml-[11px] mr-[11px] bg-white bg-transparent">
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
            className="w-[30rem] h-10 ml-[40px] bg-transparent outline-none"
          />
        </div>
      </div>

      {/* menu bar */}
      <div className="ml-auto font-bold text-[#636363] text-[20px] flex">
          <div className="nav"><a href="#" className="link link-underline link-underline-black focus:underline underline-offset-[29px] decoration-[5px] decoration-[#FF6B00]">Home</a></div>
          <div className="nav"><a href="#" className="link link-underline link-underline-black focus:underline underline-offset-[29px] decoration-[5px] decoration-[#FF6B00]">Create</a></div>
          <div className="nav"><a href="#" className="link link-underline link-underline-black focus:underline underline-offset-[29px] decoration-[5px] decoration-[#FF6B00]">Profile</a></div>
          <div className="nav"><a href="#" className="link link-underline link-underline-black focus:underline underline-offset-[29px] decoration-[5px] decoration-[#FF6B00]">Wallet</a></div>
      </div>
    </div>
  );
};

export default Header;

