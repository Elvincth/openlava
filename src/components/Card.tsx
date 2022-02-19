/* eslint-disable @next/next/no-img-element */
import Like from './svg/Like'
import React, { useState } from "react";

const Card = ({
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
        <div className='flex flex-col bg-white rounded-3xl p-3 max-w-[350px] max-h-[526px] shadow-xl'>
            <img src={imageSrc} alt='' />
            <h1 className='font-bold text-lg pt-1 pl-1'>
                {title}
            </h1>
            <div className='flex flex-row pt-1'>
                <div className='max-w-[50px]'>
                    <img src={iconSrc} alt='' />
                </div>
                <div className='flex flex-col pl-1'>
                    <h1 className='font-bold text-xl'>{Name}</h1>
                    <h2 className='font-medium text-base text-gray-500'>{Position}</h2>
                </div>
                {/* padding the heart to the right side */}
                <div className='ml-auto self-center pr-2'>
                    <Like />
                </div>
            </div>
        </div>
    )
}

export default Card