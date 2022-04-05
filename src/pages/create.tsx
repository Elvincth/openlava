import React from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import OpenLava from "artifacts/contracts/OpenLava.sol/OpenLava.json";
import { openLavaAddress } from "blockchain.config";
import { OpenLava as contract } from "typechain-types";

const create = () => {
  // const init = async () => {
  //   const web3Modal = new Web3Modal();
  //   const connection = await web3Modal.connect();
  //   const provider = new ethers.providers.Web3Provider(connection);
  //   const signer = provider.getSigner();

  //   /* next, create the item */
  //   const price = ethers.utils.parseUnits("1", "ether");

  //   let contract = new ethers.Contract(
  //     openLavaAddress,
  //     OpenLava.abi,
  //     signer
  //   ) as contract;

  //   let transaction = await contract.createToken("https://poly.com", price);

  //   await transaction.wait();

  //   alert("Created");
  // };

  // init();

  return (
    <div>
      {/* top */}
      <div className="mx-[20px] my-[50px] lg:mx-[10rem] lg:my-[5rem]">
        <div className="text-[35px] lg:text-4xl text-black font-bold">
          Create Item
        </div>

        <form>
          <div className="mt-[30px] text-[14px] lg:text-sm text-[#727A81] lg:mt-[49px]">
            <span className="text-[#F93A3A]">* </span>Requested fields
          </div>
          <div className="mt-[30px] text-[18px] lg:text-xl text-black lg:mt-[16px] font-bold">
            Image, Video, Audio or 3D Model
            <span className="text-[#F93A3A]"> *</span>
          </div>
          <div className="text-[14px] mt-[30px] lg:text-base text-[#727A81] lg:mt-[17px]">
            File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
            GLB, GLTF. Max size: 100 MB
          </div>

          {/* field */}
          <div className="mt-6">
            <label htmlFor="" className="text-lg font-bold text-black">
              Name <span className="text-red-500">* </span>
            </label>
            <div className="mt-2">
              <input
                required
                name="item name"
                className="block w-full px-3 py-2 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-orange-500 focus:ring-orange-500 sm:text-sm focus:ring-1 invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 disabled:shadow-none"
                placeholder="Item name"
              />
            </div>
          </div>

          <div className="mt-10">
            <label htmlFor="" className="text-lg font-bold text-black">
              External link
            </label>
            <div className="mt-2">
              <input
                name="item name"
                className="block w-full px-3 py-2 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-orange-500 focus:ring-orange-500 sm:text-sm focus:ring-1 invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 disabled:shadow-none"
                placeholder="Item external link"
              />
            </div>
          </div>

          <div className="mt-10">
            <label htmlFor="" className="text-lg font-bold text-black">
              Description
            </label>
            <div className="mt-2">
              <textarea
                placeholder="Item description"
                className="min-h-[200px] block w-full px-3 py-2 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-orange-500 focus:ring-orange-500 sm:text-sm focus:ring-1 invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 disabled:shadow-none"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default create;
