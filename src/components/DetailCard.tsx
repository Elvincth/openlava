
import React, { DetailedHTMLProps, ImgHTMLAttributes, ReactElement, useEffect, useState } from 'react'
import clsx from "clsx";

const DetailCard = ({
    title,
    svg,
    owner,
    description,
    expand,
}: {
    title: string,
    svg: ReactElement
    owner: string;
    description: ReactElement;
    expand: boolean;
}) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(expand)
    }, [expand])

    return (
        <section className={"flex flex-col"}>
            <div className={"flex flex-row p-8 items-center justify-between"}>
                <div className='flex'>
                    <div className="pr-4">{svg}</div>
                    <p className=" text-black text-2xl font-semibold">{title}</p>
                </div>
                <div className='flex'>
                    <button className={clsx("text-black rotate duration-200", { "rotate-180 duration-200": open })} onClick={() => setOpen(!open)}>
                        <svg width="30" height="30" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_219_7357)">
                                <path d="M199.404 63.993L188 53.5L99.702 138.5L11.5 53.5L0 63.993L99.702 163.695L199.404 63.993Z" fill="black" />
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
            <div className={clsx("flex flex-col border-t border-b p-12 text-xl font-medium bg-slate-50 h-full duration-200", { "h-0 p-0 overflow-hidden duration-400": open })}>
                <div className={clsx({ "hidden duration-75": open })}>
                    <p className="text-gray-400 pb-2">Created by <a className="text-blue-600">{owner}</a></p>
                    <p>{description}</p>
                </div>
            </div>
        </section>
    );
}

export default DetailCard