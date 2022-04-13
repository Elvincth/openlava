/* eslint-disable @next/next/no-img-element */
import Like from "./svg/Like";
import React, { useState } from "react";

const Card = ({ // card structure
  imageSrc,
  title,
  iconSrc,
  Name,
  Position,
}: {
  imageSrc: string;
  title: string;
  iconSrc: string;
  Name: string;
  Position: string;
}) => {
  return (
    <div className="flex flex-col bg-white rounded-3xl p-3 max-w-[350px] lg:max-h-[526px] shadow-xl">
      <img src={imageSrc} alt="" />
      <h1 className="pt-1 pl-1 text-lg font-bold">{title}</h1>
      <div className="flex flex-row pt-1">
        <div className="max-w-[50px]">
          <img src={iconSrc} alt="" />
        </div>
        <div className="flex flex-col pl-1">
          <h1 className="text-xl font-bold">{Name}</h1>
          <h2 className="text-base font-medium text-gray-500">{Position}</h2>
        </div>
        {/* padding the heart to the right side */}
        <div className="self-center pr-2 ml-auto">
          <Like />
        </div>
      </div>
    </div>
  );
};

export default Card;
