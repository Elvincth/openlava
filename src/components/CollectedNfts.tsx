/* eslint-disable react/no-children-prop */
/* eslint-disable @next/next/no-img-element */
import { OpenLava as contract } from "typechain-types";
import { ethers } from "ethers";
import { Children, MouseEventHandler, useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { openLavaAddress } from "blockchain.config";
import OpenLava from "artifacts/contracts/OpenLava.sol/OpenLava.json";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import ResellPrice from "~/components/resellPrice";
import { addressToUsername } from "utils/addressToUsername";
import LoadingOverlay from "./LoadingOverlay";
import delay from "delay";
import Link from "next/link";

type Nft = {
  price: string;
  tokenUri: string;
  itemId: number;
  seller: string;
  owner: string;
  image: string;
  name: string;
  description: string;
};

interface NFTCardProps extends Nft {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  // children: React.ReactNode;
}

const NFTCard = (item: NFTCardProps) => (
  <div className="overflow-hidden transition duration-500 transform bg-white shadow-lg cursor-pointer w-80 rounded-xl hover:shadow-xl hover:scale-105">
    <Link href={{ pathname: "/detail", query: { id: item.itemId } }} passHref>
      <img
        src={item.image.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/")}
        className="object-cover h-[250px] w-80  mx-auto rounded-t-xl"
        alt={item.name}
      />
    </Link>
    <div className="p-5 ">
      <h2 className="text-2xl font-bold truncate">{item.name}</h2>
      <p className="mt-2 text-lg font-semibold text-gray-600 truncate">
        by {item.owner}
      </p>
      <p className="mt-1 text-gray-500 truncate">{item.description}</p>

      <div className="flex items-center mt-2">
        ETH
        <span className="ml-1">{item.price}</span>
      </div>

      <button
        onClick={item.onClick}
        type="submit"
        className="w-full text-white mt-2 bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none"
      >
        Sell
      </button>
    </div>
  </div>
);

const CollectedNfts = (props: { content: React.ReactChild }) => {
  const [nfts, setNfts] = useState<Array<Nft>>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [currentNft, setCurrentNft] = useState<Nft | null>(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    fetchItems();
    userInfo();
  }, []);

  const fetchItems = async () => {
    setNfts([]);

    // user to sign the transaction by using Web3Provider
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      openLavaAddress,
      OpenLava.abi,
      signer
    ) as contract;

    const data = await contract.getOwnedNfts(); // call function getOwnedNfts for getting all owned item

    console.log(data);

    try {
      // same as the flow in the index.tsx
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const tokenUri = await contract.tokenURI(item.itemId); //Where the cid is stored

        let metaData = await axios.get(
          `https://cloudflare-ipfs.com/ipfs/${tokenUri}/metadata.json`
        );

        let { description, image, name } = metaData.data;

        console.log(metaData);

        let price = ethers.utils.formatUnits(item.price.toString(), "ether");

        let { itemId, seller, owner } = item;

        //the nft is held by the contract owner, that mean newly created

        seller = await addressToUsername(seller);

        if (owner == openLavaAddress) {
          owner = seller;
        } else {
          owner = await addressToUsername(owner);
        }

        let nft: Nft = {
          tokenUri,
          itemId: itemId.toNumber(),
          seller,
          owner,
          image,
          name,
          description,
          price,
        };

        setNfts((prev) => [...prev, nft]);
      }

      setIsLoaded(true);
    } catch (e) {
      alert("Error" + e);
      console.log(e);
    }
  };

  // resell nft
  const resell = async (nft: Nft | null) => {
    try {
      console.log("Resell nft", nft);
      if (!price || !nft) return;

      // displaying message
      setTitle("Listing your nft");
      setMessage("Please wait while we list your nft");
      setIsCreating(true);

      // connect to contract
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const askingPrice = ethers.utils.parseUnits(price.toString(), "ether");
      let contract = new ethers.Contract(openLavaAddress, OpenLava.abi, signer);

      setTitle("Please confirm your transaction");
      setMessage("");

      let transaction = await contract.resellToken(nft.itemId, askingPrice); // make transaction
      await transaction.wait();

      setIsCreated(true); // status created

      setTitle("Listed!");

      await delay(3000);

      const url = new URL(location.href);

      url.searchParams.set("tab", "listedNfts");

      location.assign(url.search);
    } catch (e) {
      console.log(e);
      //@ts-ignore
      alert("Error" + e.message);
      setIsCreating(false);
    }
  };

  const userInfo = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      setAddress(address);
    } catch (e) {
      alert(e);
    }
  };

  // handling setting resell price
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-[5rem]">
      {isCreating && (
        <LoadingOverlay
          title={title}
          message={message}
          successful={isCreated}
        />
      )}

      <div className="flex flex-col mt-[2rem]">
        {isLoaded && nfts.length <= 0 && (
          <h1 className="px-20 py-10 text-xl text-center">
            Currently no items{" "}
          </h1>
        )}

        {isLoaded && nfts.length > 0 && (
          <section className="grid flex-wrap self-center grid-cols-1 gap-20 pb-20 xl:grid-cols-3 md:grid-cols-2 px-[5rem] py-[50px]">
            {nfts.map((nft, i) => (
              <NFTCard
                key={i}
                onClick={() => {
                  togglePopup();
                  setCurrentNft(nft);
                }}
                {...nft}
              />
            ))}
            {isOpen && (
              <ResellPrice
                content={
                  <div className="px-[50px] pb-5  max-w-[500px] w-full">
                    {/* renew price */}

                    <div className="flex flex-col items-center justfify-center">
                      <div>
                        <label
                          htmlFor=""
                          className="text-[20px] font-bold text-black"
                        >
                          Input an asking price{" "}
                          <span className="text-red-500">* </span>
                        </label>
                      </div>

                      <input
                        required
                        step="any"
                        type="number"
                        min={0.0e1}
                        name="price"
                        className="mt-[2rem] block w-full px-3 py-2 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-orange-500 focus:ring-orange-500 sm:text-sm focus:ring-1 invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 disabled:shadow-none"
                        placeholder="Price"
                        onChange={(e) => {
                          setPrice(Number(e.target.value));
                        }}
                      />

                      <button
                        disabled={price <= 0}
                        onClick={(e) => {
                          e.preventDefault();
                          resell(currentNft);
                        }}
                        type="submit"
                        className="mt-[2rem] disabled:bg-gray-300 text-white bg-orange-500 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                }
                handleClose={togglePopup}
              />
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default CollectedNfts;
