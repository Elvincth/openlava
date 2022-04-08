/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import DetailCard from "~/components/DetailCard";
import DetailsIcon from "~/components/svg/DetailsIcon";
import Eth from "~/components/svg/Eth";
import { MenuIcon } from "~/components/svg/MenuIcon";
import Property from "~/components/svg/Property";

const detail = () => {
  const items = [
    {
      title: "Description",
      svg: <MenuIcon />,
      owner: "Ethereum",
      description: (
        <p>
          Created by L4artiste The moon has always been symbolic and apparent in
          Arab culture. From holidays to music, to literature, to superstitions,
          the moon has manifested itself in many of the inner-workings of our
          daily life.
        </p>
      ),
      expand: false,
    },
    {
      title: "Property",
      svg: <Property />,
      owner: "Property",
      description: (
        <div className="h-24 text-center bg-blue-100 border-4 border-blue-400 rounded-xl w-60">
          <h1 className="p-2 text-blue-500">ARTIST</h1>
          <p className="pt">Bosco</p>
        </div>
      ),
      expand: false,
    },
    {
      title: "Detail",
      svg: <DetailsIcon />,
      owner: "Property",
      description: (
        <div className="flex flex-col w-full ">
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
        </div>
      ),
      expand: false,
    },
  ];
  return (
    <section className="flex flex-col w-full h-screen">
      <div className="flex flex-row justify-center w-full h-screen pt-10">
        <div className="flex flex-col max-w-[550px]">
          <div className="border border-gray-100 rounded-2xl">
            <div className="w-full p-4">
              <Eth />
            </div>
            <img
              className="rounded-b-2xl"
              src="https://static.boredpanda.com/blog/wp-content/uploads/2020/05/Illustrators-create-artwork-in-aid-of-health-workers-5eb48aea538d2__880.jpg"
            />
          </div>
          <div className="pb-20 ">
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
          <h1 className="pt-12 text-3xl font-semibold">Name</h1>
          <div className="flex flex-row pt-10">
            <div>
              owned by <span className="text-orange-500">owner</span>
            </div>
          </div>
          <div className="w-full p-8 pb-12 border-2 bg-gray-50 pr-80 rounded-2xl">
            <h1 className="pb-2 text-xl font-normal ">Price</h1>
            <div className="flex flex-row items-center">
              <div className="pb-1">
                <Eth />
              </div>
              <h1 className="px-2 text-4xl font-semibold">0.5</h1>
              <h1 className="text-xl font-normal">($1,646.45)</h1>
            </div>

            <a
              href="#_"
              className="relative px-40 py-5 overflow-hidden text-white transition-all duration-300 ease-out bg-orange-500 rounded-2xl group hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 hover:ring-2 hover:ring-offset-2 hover:ring-orange-400"
            >
              <button className="pt-8">
                <span className="relative text-xl">Make offer</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default detail;
