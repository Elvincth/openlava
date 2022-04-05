import React, { createRef, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import OpenLava from "artifacts/contracts/OpenLava.sol/OpenLava.json";
import { openLavaAddress } from "blockchain.config";
import { OpenLava as contract } from "typechain-types";
import { FilePond, registerPlugin } from "react-filepond";
import { client as nftStorage, File } from "nftStorage";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import LoadingOverlay from "~/components/LoadingOverlay";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateSize
);

const Create = () => {
  const filePondEl = createRef<any>();
  const [metaData, setMetaData] = useState({
    name: "",
    description: "",
    dataUrl: "",
  });
  const [isCreating, setIsCreating] = useState(false);

  const base64ToBlob = async (dataUrl: string) => {
    let res = await fetch(dataUrl);
    let blob = await res.blob();
    return blob;
  };

  const uploadToIPFS = async () => {
    //Get the image
    let image = filePondEl.current.getFiles()[0];
    let dataUrl = await image.getFileEncodeDataURL();

    //If dataUrl haven't generated yet, wait for it
    if (!dataUrl) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await uploadToIPFS();
    }

    //store dataUrl in metaData
    setMetaData({ ...metaData, dataUrl });
    //print metaData
    console.log(metaData);

    let blob = await base64ToBlob(dataUrl);

    console.log(blob);

    //Upload the NFT to IPFS
    let token = await nftStorage.store({
      name: metaData.name,
      description: metaData.description,
      image: blob,
    });

    return token;
  };

  const onSubmit = async (e: any) => {
    setIsCreating(true);

    e.preventDefault();

    //First upload the image to IPFS
    let data = await uploadToIPFS();

    console.log("uploaded to ipfs", data);

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    /* next, create the item */
    const price = ethers.utils.parseUnits("1", "ether");

    let contract = new ethers.Contract(
      openLavaAddress,
      OpenLava.abi,
      signer
    ) as contract;

    //@ts-ignore
    let transaction = await contract.createToken(data.ipnft, price);

    await transaction.wait();

    setIsCreating(false);

    alert("Created");
  };

  return (
    <div>
      {isCreating && <LoadingOverlay />}
      <div className="mx-[20px] my-[50px] lg:mx-[10rem] lg:my-[4.5rem]">
        <h1 className="text-[35px] lg:text-4xl text-black font-bold">
          Create Item
        </h1>

        <form>
          <div className="mt-[30px] text-[14px] lg:text-sm text-[#727A81] lg:mt-[49px]">
            <span className="text-[#F93A3A]">* </span>Requested fields
          </div>

          <div>
            <div className="mt-[30px] text-[18px] lg:text-xl text-black lg:mt-[16px] font-bold">
              Image, Video, Audio or 3D Model
              <span className="text-[#F93A3A]"> *</span>
            </div>

            <div className="text-[14px] mt-[30px] lg:text-base text-[#727A81] lg:mt-[17px]">
              File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
              OGG, GLB, GLTF. Max size: 100 MB
            </div>

            <FilePond
              /*
             // @ts-ignore */
              ref={filePondEl}
              className="mt-4"
              maxFileSize="100MB"
              allowMultiple={false}
              required
              name="files"
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
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
                onChange={(e) => {
                  setMetaData({ ...metaData, name: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="mt-10">
            <label htmlFor="" className="text-lg font-bold text-black">
              Price <span className="text-red-500">* </span>
            </label>
            <div className="mt-2">
              <input
                required
                step="any"
                type="number"
                name="price"
                className="block w-full px-3 py-2 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-orange-500 focus:ring-orange-500 sm:text-sm focus:ring-1 invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 disabled:shadow-none"
                placeholder="Price"
              />
            </div>
          </div>

          <div className="mt-10">
            <label htmlFor="" className="text-lg font-bold text-black">
              Description <span className="text-red-500">* </span>
            </label>
            <div className="mt-2">
              <textarea
                placeholder="Item description"
                className="min-h-[200px] block w-full px-3 py-2 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-orange-500 focus:ring-orange-500 sm:text-sm focus:ring-1 invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 disabled:shadow-none"
                onChange={(e) => {
                  setMetaData({ ...metaData, description: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="mt-5">
            <button
              onClick={onSubmit}
              type="submit"
              className="text-white bg-orange-500 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
