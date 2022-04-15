/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import DetailsIcon from "~/components/svg/DetailsIcon";
import Eth from "~/components/svg/Eth";
import { MenuIcon } from "~/components/svg/MenuIcon";
import { useRouter } from "next/router";
import { contracts, OpenLava as contract } from "typechain-types";
import { ethers } from "ethers";
import { openLavaAddress } from "blockchain.config";
import OpenLava from "artifacts/contracts/OpenLava.sol/OpenLava.json";
import Web3Modal from "web3modal";
import axios from "axios";
import clsx from "clsx";
import { addressToUsername } from "utils/addressToUsername";

// nft card structure
type Nft = {
  price: string;
  itemId: number;
  seller: string;
  owner: string;
  ownerAddr: string;
  sellerAddr: string;
  image: string;
  name: string;
  description: string;
  reserved: boolean;
};

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [nft, setNft] = useState<Nft>(); // create state for storing all nfts
  const [open, setOpen] = useState(false); // create state for handling is the card open
  const [open2, setOpen2] = useState(false); //

  useEffect(() => {
    if (router.isReady) {
      console.log(Number(id));
      init();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  // handling buy
  const buy = async () => {
    //Check if user login
    if (localStorage.getItem("address") === null) {
      alert("Please login to buy");
      return;
    }

    if (nft) {
      try {
        // user sign the transaction using Web3Provider
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          openLavaAddress,
          OpenLava.abi,
          signer
        ) as contract;

        // to finalize the purchase, the user will be asked to pay the asking process
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

    const item = await contract.getNftById(Number(id)); // set item by using the id of nft

    const tokenUri = await contract.tokenURI(item.itemId); // where the cid is stored

    let metaData = await axios.get(
      // linking the meta data by using ipfs
      `https://cloudflare-ipfs.com/ipfs/${tokenUri}/metadata.json`
    );

    let { description, image, name } = metaData.data; // set description, image and name by calling metaData
    let { itemId, seller, owner, reserved } = item; // set the information variable from item

    console.log(metaData);

    let price = ethers.utils.formatUnits(item.price.toString(), "ether"); // price to ether

    let ownerAddr = owner; // set owner address by passing owner
    let sellerAddr = seller; // set ownerseller address by passing owner

    owner = await addressToUsername(owner); // get owner username by address

    seller = await addressToUsername(seller); // get seller username by address

    let nft: Nft = {
      itemId: itemId.toNumber(),
      seller,
      sellerAddr,
      owner,
      ownerAddr,
      image,
      name,
      description,
      price,
      reserved,
    };

    console.log(nft);

    setNft(nft);
  };

  return (
    <section className="container flex flex-row justify-center pt-10">
      <div className="flex flex-col max-w-[420px]">
        <div className="border border-gray-100 rounded-2xl">
          <div className="w-full p-3 border-b border-gray-100">
            <Eth />
          </div>

          {nft ? (
            <img
              className="object-cover w-[420px] max-w-full h-[420px] rounded-b-2xl"
              src={nft?.image.replace(
                "ipfs://",
                "https://cloudflare-ipfs.com/ipfs/"
              )}
              alt=""
            />
          ) : (
            <div className="animate-pulse max-w-full w-[420px] h-[420px] bg-slate-200 rounded-b-2xl" />
          )}
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
                  <p className="text-lg font-semibold text-black ">
                    Description
                  </p>
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
                  <p>{nft?.description}</p>
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
                  <p className="text-lg font-semibold text-black ">Details</p>
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
                  {nft?.owner != "OpenLava" && (
                    <p className="pb-2 text-gray-400">
                      Owned by{" "}
                      <span className="text-blue-600">{nft?.owner}</span>
                    </p>
                  )}
                  <p className="pb-2 overflow-hidden text-gray-400 truncate">
                    Owner Address{" "}
                    <span className="text-blue-600 ">
                      {" "}
                      {nft?.owner == "OpenLava"
                        ? nft.sellerAddr
                        : nft?.ownerAddr}
                    </span>
                  </p>
                  {!nft?.reserved && (
                    <p className="pb-2 text-gray-400">
                      Sold by{" "}
                      <span className="text-blue-600">{nft?.seller}</span>
                    </p>
                  )}
                  {!nft?.reserved && (
                    <p className="pb-2 overflow-hidden text-gray-400 truncate">
                      Sold Address{" "}
                      <span className="text-blue-600 "> {nft?.sellerAddr}</span>
                    </p>
                  )}
                  <p className="pb-2 overflow-hidden text-gray-400 truncate">
                    Token Standard{" "}
                    <span className="text-blue-600 ">ERC-721 </span>
                  </p>
                  <p className="pb-2 overflow-hidden text-gray-400 truncate">
                    Contract Address{" "}
                    <span className="text-blue-600 "> {openLavaAddress}</span>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="flex flex-col ml-10">
        <h1 className="pt-12 text-3xl font-semibold">{nft?.name}</h1>

        {nft?.seller && (
          <div className="flex flex-row pt-2 pb-10">
            <span className="mr-1 text-gray-600">Sold by</span>{" "}
            <span className="text-orange-500">{nft?.seller}</span>
          </div>
        )}

        {!nft?.seller && <div className="mt-3" />}

        <div className="max-w-full px-6 py-5 w-[500px] border bg-gray-50 rounded-2xl">
          <h1 className="pb-2 text-xl font-normal ">Price</h1>
          <div className="flex flex-row items-center">
            <div className="pb-1">
              <Eth />
            </div>
            <h1 className="px-2 text-3xl font-semibold">{nft?.price}</h1>
            {/* <h1 className="text-lg font-normal">($1,646.45)</h1> */}
          </div>

          {!nft?.reserved && (
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
          )}
        </div>
      </div>
    </section>
  );
};

export default Detail;
