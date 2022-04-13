import React, { createRef, useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import OpenLava from "artifacts/contracts/OpenLava.sol/OpenLava.json";
import { openLavaAddress } from "blockchain.config";
import { OpenLava as contract } from "typechain-types";
import { FilePond, registerPlugin } from "react-filepond";
import { client as nftStorage } from "nftStorage";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import LoadingOverlay from "~/components/LoadingOverlay";
import { useRouter } from "next/router";
import delay from "delay";

registerPlugin( // for handling NFT creation
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType
);

const Create = () => {
  const router = useRouter();
  const filePondEl = createRef<any>();
  const [metaData, setMetaData] = useState({ // create state for setting the NFT 
    name: "",
    description: "",
    dataUrl: "",
  });
  const [price, setPrice] = useState(0); // create state for setting price
  const [image, setImage] = useState<Array<Object>>([]); // create state for storing the image of the NFT - array type
  const [disabled, setDisabled] = useState(true); // create state for vaildating the form
  const [isCreating, setIsCreating] = useState(false); // create state for handling is the NFT creating 
  const [isCreated, setIsCreated] = useState(false); // create state for handling is the NFT created 
  const [title, setTitle] = useState(""); // create state for storing the title to user
  const [message, setMessage] = useState(""); // create state for storing the message to user 
  const [isProcessing, setIsProcessing] = useState(false); // create state handling is the create processing

  // Form validation
  useEffect(() => {
    if ( // if the name is already filled, the description is already filled and the image is already uploaded
      metaData.name.length > 0 &&
      metaData.description.length > 0 &&
      image.length > 0 &&
      price > 0
    ) {
      setDisabled(false); // set disable become false means the NFT can be created
    } else {
      setDisabled(true); // else set disable become true means the NFT cannot create
    }
  }, [image, metaData, price]);

  // for changing base64 to blob
  const base64ToBlob = async (dataUrl: string) => { 
    let res = await fetch(dataUrl);
    let blob = await res.blob();
    return blob;
  };

  // upload the image into IPFS
  const uploadToIPFS = async () => {
    console.log("image[0]", image[0]);

    //@ts-ignore
    let dataUrl = await image[0].getFileEncodeDataURL(); // set the data url by using the image url

    // if dataUrl haven't generated yet, wait for it
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

  // for handling if the user is clicked the submit button
  const onSubmit = async (e: any) => {
    setMessage("This may take a few seconds"); // set the message to user
    setTitle("Creating NFT..."); // set the title to user

    setIsCreating(true); // set status to true for making the

    e.preventDefault(); 

    //First upload the image to IPFS
    let data = await uploadToIPFS();

    console.log("uploaded to ipfs", data);

    try {
      // make connection
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      setTitle("Please confirm the transaction"); // set the title to user
      setMessage(""); // set the message to null

      //Convert the price to ether
      const askingPrice = ethers.utils.parseUnits(price.toString(), "ether");

      console.log(price.toString(), askingPrice);

      let contract = new ethers.Contract( // linking with the contract
        openLavaAddress,
        OpenLava.abi,
        signer
      ) as contract;

      //@ts-ignore
      let transaction = await contract.createToken(data.ipnft, askingPrice); // call the function of createToken for creating the token

      await transaction.wait();

      setIsCreated(true); // set status to true to makesure the nft is created

      setTitle("Created!"); // set message to user

      await delay(3000);

      router.push("/"); // direct back to home page
    } catch (e) {
      console.log("err", e);
      alert(
        //@ts-ignore
        "Error while creating the NFT" + e.message
      );

      setIsCreating(false);
    }
  };

  return (
    <div>
      {isCreating && (
        <LoadingOverlay
          title={title}
          message={message}
          successful={isCreated}
        />
      )}
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
              Image File
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
