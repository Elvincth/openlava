/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

const Header = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [bugerOpen, setBugerOpen] = useState(true);
  const handleClick = () => {
    setShowOptions(!showOptions);
    setBugerOpen(!bugerOpen);
  };
  return (
    <div>
      {/* Desktop */}
      <div className="header hidden 2xl:py-[15px] 2xl:pl-[100px] 2xl:pr-[100px] 2xl:shadow-md 2xl:flex 2xl:items-center">
        {/* Logo */}
        <div className="pr-[40px]">
          <img
            src="https://res.cloudinary.com/dwhlxdb6r/image/upload/v1645081723/OpenlavaIcon/Group_261_d5vzwq.png"
            alt=""
            className="w-max"
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
          <div className="nav">
            <a
              href="#"
              className="link link-underline link-underline-black focus:underline underline-offset-[29px] decoration-[5px] decoration-[#FF6B00]"
            >
              Home
            </a>
          </div>
          <div className="nav">
            <a
              href="#"
              className="link link-underline link-underline-black focus:underline underline-offset-[29px] decoration-[5px] decoration-[#FF6B00]"
            >
              Create
            </a>
          </div>
          <div className="nav">
            <a
              href="#"
              className="link link-underline link-underline-black focus:underline underline-offset-[29px] decoration-[5px] decoration-[#FF6B00]"
            >
              Profile
            </a>
          </div>
          <div className="nav">
            <a
              href="#"
              className="link link-underline link-underline-black focus:underline underline-offset-[29px] decoration-[5px] decoration-[#FF6B00]"
            >
              Wallet
            </a>
          </div>
        </div>
      </div>

      {/* Smaller than 1600px */}
      <div className="2xl:hidden visible mobileHeader shadow-md flex flex-col justify-center items-center py-4">
        {/* Logo */}
        <div className="m-auto">
          <img
            src="https://res.cloudinary.com/dwhlxdb6r/image/upload/v1645081723/OpenlavaIcon/Group_261_d5vzwq.png"
            alt=""
            className="w-[17rem]"
          />
        </div>

        {/* burger */}
        <div className="mt-[25px]">
          <button onClick={handleClick}>
            {bugerOpen == true && (
              <img
                src="https://res.cloudinary.com/dwhlxdb6r/image/upload/v1645106214/OpenlavaIcon/Vector_ppxppt.png"
                alt=""
                className="w-[25px] bg-transparent"
              />
            )}
            {bugerOpen == false && (
              <img
                src="https://res.cloudinary.com/dwhlxdb6r/image/upload/v1645109313/OpenlavaIcon/Group_mup83d.png"
                alt=""
                className="w-[25px] bg-transparent"
              />
            )}
          </button>
        </div>

        {/* menu content */}
        {showOptions && (
          <div className="menu transition duration-200">
            <div className="flex flex-col justify-center items-center font-bold text-[#636363] text-[20px] pt-2">
              <div className="w-screen py-3 flex justify-center hover:bg-gray-50 shadow-sm">
                <a href="#">Home</a>
              </div>
              <div className="w-screen py-3 flex justify-center hover:bg-gray-50 shadow-sm">
                <a href="#">Create</a>
              </div>
              <div className="w-screen py-3 flex justify-center hover:bg-gray-50 shadow-sm">
                <a href="#">Profile</a>
              </div>
              <div className="w-screen py-3 flex justify-center hover:bg-gray-50 shadow-sm">
                <a href="#">Wallet</a>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        {bugerOpen == true && (
          <div className="mt-[10px]">
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
                  className="w-[20rem] sm:w-[30rem] h-10 ml-[40px] bg-transparent outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
