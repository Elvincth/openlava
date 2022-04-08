import React, { useState } from "react"
import DetailCard from "~/components/DetailCard"
import DetailsIcon from "~/components/svg/DetailsIcon"
import Eth from "~/components/svg/Eth"
import { MenuIcon } from "~/components/svg/MenuIcon"
import Property from "~/components/svg/Property"

const detail = () => {
    const items = [
        {
            title: "Description",
            svg: <MenuIcon />,
            owner: "Ethereum",
            description:
                <p>
                    Created by
                    L4artiste
                    The moon has always been symbolic and apparent in Arab culture. From holidays to music, to literature, to superstitions, the moon has manifested itself in many of the inner-workings of our daily life.
                </p>,
            expand: false,
        },
        {
            title: "Property",
            svg: <Property />,
            owner: "Property",
            description:

                <div className="bg-blue-100 border-4 rounded-xl border-blue-400 text-center w-60 h-24">
                    <h1 className="text-blue-500 p-2">ARTIST</h1>
                    <p className="pt">Bosco</p>
                </div>
            ,
            expand: false,
        },
        {
            title: "Detail",
            svg: <DetailsIcon />,
            owner: "Property",
            description:
                <div className=" flex flex-col w-full">
                    <div className="flex flex-row justify-between">
                        <div>Contract Address</div>
                        <div className="text-blue-500">0x6e4d...2b45</div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div>Token ID</div>
                        <div className="text-blue-500">1</div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div>Token Standard</div>
                        <div>ERC-1155</div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div>Blockchain</div>
                        <div>Ethereum</div>
                    </div>
                </div>,
            expand: false,
        }
    ]
    return (
        <section className="flex flex-col w-full h-screen">
            <div className="flex flex-row w-full h-screen justify-center pt-10">
                <div className="flex flex-col max-w-[550px]">
                    <div className="border border-gray-100 rounded-2xl">
                        <div className="w-full p-4">
                            <Eth />
                        </div>
                        <img className="rounded-b-2xl" src="https://static.boredpanda.com/blog/wp-content/uploads/2020/05/Illustrators-create-artwork-in-aid-of-health-workers-5eb48aea538d2__880.jpg" />
                    </div>
                    <div className=" pb-20">
                        <div className="flex flex-col mt-8 border rounded-xl">
                            {items.map((item, i) => {
                                return (
                                    <DetailCard
                                        title={item.title}
                                        owner={item.owner}
                                        description={item.description}
                                        svg={item.svg}
                                        expand={item.expand}
                                        key={i}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col pl-6">
                    <h1 className="text-3xl font-semibold pt-12">Name</h1>
                    <div className="flex flex-row pt-10">
                        <div>
                            owned by <span className="text-orange-500">owner</span>
                        </div>
                    </div>
                    <div className="p-8 w-full bg-gray-50 pr-80 border-2 rounded-2xl pb-12">
                        <h1 className=" font-normal text-xl pb-2">Price</h1>
                        <div className="flex flex-row items-center">
                            <div className="pb-1">
                                <Eth />
                            </div>
                            <h1 className="text-4xl font-semibold px-2">0.5</h1>
                            <h1 className="text-xl font-normal">($1,646.45)</h1>
                        </div>

                        <a href="#_" className="relative rounded-2xl px-40 py-5 overflow-hidden group bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-orange-400 transition-all ease-out duration-300">
                            <button className="pt-8">
                                <span className="relative text-xl">Make offer</span>
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default detail