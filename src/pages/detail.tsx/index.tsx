/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import DetailCard from "~/components/DetailCard";
import DetailsIcon from "~/components/svg/DetailsIcon";
import Eth from "~/components/svg/Eth";
import { MenuIcon } from "~/components/svg/MenuIcon";
import { useRouter } from "next/router";
import { OpenLava as contract } from "typechain-types";
import { ethers } from "ethers";
import { openLavaAddress } from "blockchain.config";
import OpenLava from "artifacts/contracts/OpenLava.sol/OpenLava.json";



const Detail = () => {
  const router = useRouter();
  const [itemId, setItemId] = useState(router.query.id);
  const [nft, setNft] = useState<contract>();

  useEffect(() => { fetch() }, []);
  useEffect(() => {
    setItemId(router.query.id);
    console.log(itemId);
  }, []);
  //get the nft by id

  //create fetch function
  const fetch = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = new ethers.Contract(
      openLavaAddress,
      OpenLava.abi,
      provider
    ) as contract;
    const data = await contract.getNftById(1);
    console.log(data);
    console.log(data.itemId);
  }
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
    <section className="container flex flex-row justify-center pt-10">
      <div className="flex flex-col max-w-[530px]">
        <div className="border border-gray-100 rounded-2xl">
          <div className="w-full p-3">
            <Eth />
          </div>
          <img
            alt=""
            className="rounded-b-2xl"
            src="https://static.boredpanda.com/blog/wp-content/uploads/2020/05/Illustrators-create-artwork-in-aid-of-health-workers-5eb48aea538d2__880.jpg"
          />
        </div>
        <div className="pb-20 ">
          <div className="flex flex-col mt-8 border rounded-xl overflow-hidden !important">
            {items.map((item, i) => {
              return (
                <DetailCard
                  title={item.title}
                  owner={item.owner}
                  description={item.description}
                  expand={item.expand}
                  key={i}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col ml-8">
        <h1 className="pt-12 text-3xl font-semibold">hi</h1>

        <div className="flex flex-row py-10">
          <span className="mr-1 text-gray-600">Owned by</span>{" "}
          <span className="text-orange-500">owner</span>
        </div>

        <div className="max-w-full px-6 py-5 w-[500px] border bg-gray-50 rounded-2xl">
          <h1 className="pb-2 text-xl font-normal ">Price</h1>
          <div className="flex flex-row items-center">
            <div className="pb-1">
              <Eth />
            </div>
            <h1 className="px-2 text-3xl font-semibold">0.5</h1>
            <h1 className="text-lg font-normal">($1,646.45)</h1>
          </div>

          <div className="mt-5">
            <button
              type="submit"
              className="w-full disabled:bg-gray-300 text-white bg-orange-500 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail;
