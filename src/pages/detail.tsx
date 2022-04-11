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
import clsx from "clsx";

type Nft = {
  price: string;
  itemId: number;
  seller: string;
  owner: string;
  image: string;
  name: string;
  description: string;
};

const Detail = () => {
  const router = useRouter();
  const [itemId, setItemId] = useState(router.query.id);
  const [nft, setNft] = useState<contract>();
  const expand = false;
  const expand2 = false;
  useEffect(() => { fetch() }, []);
  useEffect(() => {
    if (router.isReady) {
      console.log(Number(id));
      init();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  //get the nft by id

  const buy = async () => {
    if (nft) {
      try {
        /* needs the user to sign the transaction, so will use Web3Provider and sign it */
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          openLavaAddress,
          OpenLava.abi,
          signer
        ) as contract;

        /* user will be prompted to pay the asking process to complete the transaction */
        const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
        const transaction = await contract.buyToken(nft.itemId, {
          value: price,
        });

        await transaction.wait();

        alert("Transaction complete");

        //Go to the profile page
        router.push("/profile");
      } catch (e) {
        //@ts-ignore
        alert("error", e.message);
      }
    }
  };

  //create fetch function
  const init = async () => {
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
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  useEffect(() => {
    setOpen(expand);
  }, [expand]);

  useEffect(() => {
    setOpen2(expand2);
  }, [expand2]);

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
      <div className="flex flex-col max-w-[370px]">
        <div className="border border-gray-100 rounded-2xl">
          <div className="w-full p-3">
            <Eth />
          </div>

          <img
            className="object-cover w-full h-[420px]]"
            src={nft?.image.replace("ipfs://", "https://nftstorage.link/ipfs/")}
            alt=""
          />
        </div>
        <div className="pb-20 ">
          <div className="flex flex-col mt-8 border rounded-xl overflow-hidden !important">
            <section className={"flex flex-col"}>
              <div
                role="button"
                onClick={() => setOpen(!open)}
                className={"flex flex-row p-5 items-center justify-between"}
              >
                <div className="flex">
                  {/* <div className="pr-4">{svg}</div> */}
                  <p className="text-lg font-semibold text-black ">title</p>
                </div>
                <div className="flex">
                  <button
                    className={clsx("text-black rotate duration-200", {
                      "rotate-180 duration-200": open,
                    })}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 200 200"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_219_7357)">
                        <path
                          d="M199.404 63.993L188 53.5L99.702 138.5L11.5 53.5L0 63.993L99.702 163.695L199.404 63.993Z"
                          fill="#04111d80"
                        />
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
              <div
                className={clsx(
                  "flex flex-col border-t p-5 text-base font-medium bg-slate-50 h-full duration-200",
                  { "h-0 !p-0 overflow-hidden duration-400": open }
                )}
              >
                <div className={clsx({ "hidden duration-75": open })}>
                  <p className="pb-2 text-gray-400">
                    Created by <a className="text-blue-600">owner</a>
                  </p>
                  <p>description</p>
                </div>
              </div>
            </section>
            <section className={"flex flex-col"}>
              <div
                role="button"
                onClick={() => setOpen2(!open2)}
                className={"flex flex-row p-5 items-center justify-between"}
              >
                <div className="flex">
                  {/* <div className="pr-4">{svg}</div> */}
                  <p className="text-lg font-semibold text-black ">title</p>
                </div>
                <div className="flex">
                  <button
                    className={clsx("text-black rotate duration-200", {
                      "rotate-180 duration-200": open2,
                    })}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 200 200"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_219_7357)">
                        <path
                          d="M199.404 63.993L188 53.5L99.702 138.5L11.5 53.5L0 63.993L99.702 163.695L199.404 63.993Z"
                          fill="#04111d80"
                        />
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
              <div
                className={clsx(
                  "flex flex-col border-t p-5 text-base font-medium bg-slate-50 h-full duration-200",
                  { "h-0 !p-0 overflow-hidden duration-400": open2 }
                )}
              >
                <div className={clsx({ "hidden duration-75": open2 })}>
                  <p className="pb-2 text-gray-400">
                    Created by <a className="text-blue-600">owner</a>
                  </p>
                  <p>description</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="flex flex-col ml-8">
        <h1 className="pt-12 text-3xl font-semibold">{nft?.name}</h1>

        <div className="flex flex-row py-10">
          <span className="mr-1 text-gray-600">Owned by</span>{" "}
          <span className="text-orange-500">{nft?.owner}</span>
        </div>

        <div className="max-w-full px-6 py-5 w-[500px] border bg-gray-50 rounded-2xl">
          <h1 className="pb-2 text-xl font-normal ">Price</h1>
          <div className="flex flex-row items-center">
            <div className="pb-1">
              <Eth />
            </div>
            <h1 className="px-2 text-3xl font-semibold">{nft?.price}</h1>
            {/* <h1 className="text-lg font-normal">($1,646.45)</h1> */}
          </div>

          <div className="mt-5">
            <button
              disabled={!nft}
              onClick={buy}
              type="submit"
              className="w-full disabled:bg-gray-300 text-white bg-orange-500 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail;
