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
      <div className="header hidden 2xl:py-[20px] 2xl:pl-[100px] 2xl:pr-[100px] 2xl:shadow-md 2xl:flex 2xl:items-center">
        {/* Logo */}
        <div className="pr-[40px]">
          <img
            src="https://res.cloudinary.com/dwhlxdb6r/image/upload/v1645081723/OpenlavaIcon/Group_261_d5vzwq.png"
            alt=""
            className="w-max"
          />
        </div>

        {/* Search Bar */}
        <form className="group relative mt-[10px]">
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-[#FF6B00]"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search OpenLava"
            className="w-[22rem] sm:w-[35rem] focus:ring-2 focus:ring-[#FF6B00] focus:outline-none appearance-none text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
          />
        </form>

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
          <div className="transition-all max-h-0 z-10">
            <div className="flex flex-col justify-center items-center font-bold text-[#636363] text-[20px] pt-2 shadow-sm bg-white">
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
      </div>
    </div>
  );
};

export default Header;
