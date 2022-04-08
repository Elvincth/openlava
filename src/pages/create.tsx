import React, { createRef, useEffect, useState } from "react";
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
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import LoadingOverlay from "~/components/LoadingOverlay";
import { useRouter } from "next/router";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType
);

const Create = () => {
  const router = useRouter();
  const filePondEl = createRef<any>();
  const [metaData, setMetaData] = useState({
    name: "",
    description: "",
    dataUrl: "",
  });
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState<Array<Object>>([]);
  const [disabled, setDisabled] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  //Form validation
  useEffect(() => {
    if (
      metaData.name.length > 0 &&
      metaData.description.length > 0 &&
      image.length > 0 &&
      price > 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [image, metaData, price]);

  const base64ToBlob = async (dataUrl: string) => {
    let res = await fetch(dataUrl);
    let blob = await res.blob();
    return blob;
  };

  const uploadToIPFS = async () => {
    //Get the image

    // if (!image[0]) {
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
    // }

    console.log("image[0]", image[0]);

    //@ts-ignore
    let dataUrl = await image[0].getFileEncodeDataURL();

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

    setMessage("Uploading to IPFS");

    //Upload the NFT to IPFS
    let token = await nftStorage.store({
      name: metaData.name,
      description: metaData.description,
      image: blob,
    });

    return token;
  };

  const onSubmit = async (e: any) => {
    setMessage("This may take a few seconds");
    setTitle("Creating NFT...");

    setIsCreating(true);

    e.preventDefault();

    //First upload the image to IPFS
    let data = await uploadToIPFS();

    console.log("uploaded to ipfs", data);

    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      setTitle("Please confirm the transaction");
      setMessage("");

      /* next, create the item */
      const askingPrice = ethers.utils.parseUnits(price.toString(), "ether");

      console.log(price.toString(), askingPrice);

      let contract = new ethers.Contract(
        openLavaAddress,
        OpenLava.abi,
        signer
      ) as contract;

      //@ts-ignore
      let transaction = await contract.createToken(data.ipnft, askingPrice);

      await transaction.wait();

      setIsCreating(false);

      alert("Created");

      router.push("/");
    } catch (e) {
      alert(
        //@ts-ignore
        "Error while creating the NFT" + e.message
      );

      setIsCreating(false);
    }
  };

  return (
    <div>
      {isCreating && <LoadingOverlay title={title} message={message} />}
      <div className="container mt-8 lg:my-[4.5rem]">
        <h1 className="text-[35px] lg:text-4xl text-black font-bold">
          Create Item
        </h1>

        <form>
          <div className="mt-[30px] text-[14px] lg:text-sm text-[#727A81] lg:mt-[49px]">
            <span className="text-[#F93A3A]">* </span>Requested fields
          </div>

          <div>
            <div className="mt-[30px] text-[18px] lg:text-xl text-black lg:mt-[16px] font-bold">
              Image, Video or Audio Files
              <span className="text-[#F93A3A]"> *</span>
            </div>

            <div className="text-[14px] mt-[30px] lg:text-base text-[#727A81] lg:mt-[17px]">
              File types supported: JPG, PNG, GIF, SVG. Max size: 100 MB
            </div>

            <FilePond
              /*
             // @ts-ignore */
              required
              ref={filePondEl}
              className="mt-4"
              maxFileSize="100MB"
              allowMultiple={false}
              acceptedFileTypes={["image/*"]}
              name="files"
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              onaddfilestart={() => setIsProcessing(true)}
              onaddfile={() => setIsProcessing(false)}
              onupdatefiles={(image: Array<Object>) => setImage(image)}
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
                min={0.0e1}
                name="price"
                className="block w-full px-3 py-2 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-orange-500 focus:ring-orange-500 sm:text-sm focus:ring-1 invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 disabled:shadow-none"
                placeholder="Price"
                onChange={(e) => {
                  setPrice(Number(e.target.value));
                }}
              />
            </div>
          </div>

          <div className="mt-10">
            <label htmlFor="" className="text-lg font-bold text-black">
              Description <span className="text-red-500">* </span>
            </label>
            <div className="mt-2">
              <textarea
                required
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
              disabled={disabled || isProcessing}
              onClick={onSubmit}
              type="submit"
              className="disabled:bg-gray-300 text-white bg-orange-500 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none"
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
