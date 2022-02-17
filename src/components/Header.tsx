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
    <header>
      {/* Desktop */}
      <div className="header hidden 2xl:py-[13px] 2xl:pl-[40px] 2xl:pr-[40px] 2xl:shadow-md 2xl:flex 2xl:items-center">
        {/* Logo */}
        <div className="pr-[40px] flex justify-center items-center">
          <svg
            width="45"
            height="45"
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M45 22.5C45 34.9264 34.9264 45 22.5 45C10.0736 45 0 34.9264 0 22.5C0 10.0736 10.0736 0 22.5 0C34.9264 0 45 10.0736 45 22.5Z"
              fill="#FF6B00"
            />
            <path
              d="M19.4449 11L24.3152 11C24.8083 11 25.2762 11.3594 25.5831 11.9823L28.3805 17.6524L27.7163 18.9701C27.2233 19.9444 26.1919 19.9444 25.6988 18.9701C25.1554 17.892 24.3504 17.2691 23.48 17.2451C22.6146 17.1253 21.7895 17.8042 21.226 18.8503L19.6361 21.7892C19.1431 22.6996 18.167 22.6996 17.6739 21.7892L15.4048 17.5885L18.172 11.9823C18.484 11.3594 18.9468 11 19.4449 11ZM9.32703 29.9111L14.3986 19.633L16.4564 23.4424C17.0098 24.4646 17.8148 25.0556 18.66 25.0556C19.5053 25.0556 20.3103 24.4726 20.8637 23.4424L22.4536 20.5035C22.7002 20.0483 23.0574 19.7847 23.4347 19.7847L23.4549 19.7847C23.8423 19.8007 24.1995 20.0802 24.441 20.5594C25.5529 22.7556 27.8673 22.7556 28.9742 20.5594L29.3968 19.7128L34.4331 29.9111C35.2331 31.5962 34.4734 34 33.1451 34L10.61 34C9.28678 34 8.52706 31.5962 9.32703 29.9111Z"
              fill="white"
            />
          </svg>
          <div className="px-2 logotext font-bold text-[24px] text-black">OpenLava</div>
        </div>

        {/* Search Bar */}
        <form className="group relative">
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
            className="w-[22rem] sm:w-[50rem] focus:ring-2 focus:ring-[#FF6B00] focus:outline-none appearance-none text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
          />
        </form>

        {/* menu bar */}
        <div className="ml-auto font-semibold text-[#636363] text-[17px] flex">
          <div className="nav">
            <a
              href="#"
              className="link link-underline link-underline-black focus:underline underline-offset-[22px] decoration-[5px] decoration-[#FF6B00]"
            >
              Home
            </a>
          </div>
          <div className="nav">
            <a
              href="#"
              className="link link-underline link-underline-black focus:underline underline-offset-[22px] decoration-[5px] decoration-[#FF6B00]"
            >
              Create
            </a>
          </div>
          <div className="nav">
            <a
              href="#"
              className="link link-underline link-underline-black focus:underline underline-offset-[22px] decoration-[5px] decoration-[#FF6B00]"
            >
              Profile
            </a>
          </div>
          <div className="nav">
            <a
              href="#"
              className="link link-underline link-underline-black focus:underline underline-offset-[22px] decoration-[5px] decoration-[#FF6B00]"
            >
              Wallet
            </a>
          </div>
        </div>
      </div>

      {/* Smaller than 1600px */}
      <div className="2xl:hidden visible mobileHeader shadow-md flex flex-col justify-center items-center py-4">
        {/* Logo */}
        <div className="flex justify-center items-center">
          <svg
            width="45"
            height="45"
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M45 22.5C45 34.9264 34.9264 45 22.5 45C10.0736 45 0 34.9264 0 22.5C0 10.0736 10.0736 0 22.5 0C34.9264 0 45 10.0736 45 22.5Z"
              fill="#FF6B00"
            />
            <path
              d="M19.4449 11L24.3152 11C24.8083 11 25.2762 11.3594 25.5831 11.9823L28.3805 17.6524L27.7163 18.9701C27.2233 19.9444 26.1919 19.9444 25.6988 18.9701C25.1554 17.892 24.3504 17.2691 23.48 17.2451C22.6146 17.1253 21.7895 17.8042 21.226 18.8503L19.6361 21.7892C19.1431 22.6996 18.167 22.6996 17.6739 21.7892L15.4048 17.5885L18.172 11.9823C18.484 11.3594 18.9468 11 19.4449 11ZM9.32703 29.9111L14.3986 19.633L16.4564 23.4424C17.0098 24.4646 17.8148 25.0556 18.66 25.0556C19.5053 25.0556 20.3103 24.4726 20.8637 23.4424L22.4536 20.5035C22.7002 20.0483 23.0574 19.7847 23.4347 19.7847L23.4549 19.7847C23.8423 19.8007 24.1995 20.0802 24.441 20.5594C25.5529 22.7556 27.8673 22.7556 28.9742 20.5594L29.3968 19.7128L34.4331 29.9111C35.2331 31.5962 34.4734 34 33.1451 34L10.61 34C9.28678 34 8.52706 31.5962 9.32703 29.9111Z"
              fill="white"
            />
          </svg>
          <div className="px-2 logotext font-bold text-[24px] text-black">OpenLava</div>
        </div>

        {/* burger */}
        <div className="mt-[25px]">
          <button onClick={handleClick}>
            {bugerOpen == true && (
              <img
                src="https://res.cloudinary.com/dwhlxdb6r/image/upload/v1645106214/OpenlavaIcon/Vector_ppxppt.png"
                alt=""
                className="w-[20px] bg-transparent"
              />
            )}
            {bugerOpen == false && (
              <img
                src="https://res.cloudinary.com/dwhlxdb6r/image/upload/v1645109313/OpenlavaIcon/Group_mup83d.png"
                alt=""
                className="w-[20px] bg-transparent"
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

        <form className="group relative mt-[17px]">
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
      </div>
    </header>
  );
};

export default Header;
