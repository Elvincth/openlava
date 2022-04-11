/* eslint-disable @next/next/no-img-element */
import Card from "~/components/Card";
import { OpenLava as contract } from "typechain-types";
import { ethers } from "ethers";
import { MouseEventHandler, useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { openLavaAddress } from "blockchain.config";
import OpenLava from "artifacts/contracts/OpenLava.sol/OpenLava.json";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import ListedNfts from "~/components/ListedNfts";
import CollectedNfts from "~/components/CollectedNfts";

const NFTCard = ({
  src,
  name,
  description,
  owner,
}: {
  src: string;
  name: string;
  description: string;
  // price: string;
  owner: string;
}) => (
  <div className="overflow-hidden transition duration-500 transform bg-white shadow-lg cursor-pointer w-80 rounded-xl hover:shadow-xl hover:scale-105">
    <img
      src={src}
      className="object-cover h-[250px] w-80  mx-auto rounded-t-xl"
      alt={name}
    />
    <div className="p-5 ">
      <h2 className="text-2xl font-bold truncate">{name}</h2>
      <p className="mt-2 text-lg font-semibold text-gray-600 truncate">
        by {owner}
      </p>
      <p className="mt-1 text-gray-500 truncate">{description}</p>

      {/* <div className="flex items-center mt-2">
        ETH
        <span className="ml-1">{price}</span>
      </div> */}
    </div>
  </div>
);

type Nft = {
  // price: string;
  itemId: number;
  seller: string;
  owner: string;
  image: string;
  name: string;
  description: string;
};

const Profile = () => {
  const [nfts, setNfts] = useState<Array<Nft>>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [address, setAddress] = useState("");
  const [activeTab, setActiveTab] = useState("collectedNfts");

  const collectedNftsHandle = () => {
    // update the state to tab1
    setActiveTab("collectedNfts");
  };
  const listedNftsHandle = () => {
    // update the state to tab2
    setActiveTab("listedNfts");
  };

  useEffect(() => {
    fetchItems();
    userInfo();
  }, []);

  const fetchItems = async () => {
    setNfts([]);

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

    const data = await contract.getOwnedNfts();

    console.log(data);

    try {
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const tokenUri = await contract.tokenURI(item.itemId); //Where the cid is stored

        let metaData = await axios.get(
          `https://nftstorage.link/ipfs/${tokenUri}/metadata.json`
        );

        let { description, image, name } = metaData.data;

        console.log(metaData);

        let price = ethers.utils.formatUnits(item.price.toString(), "ether");

        let nft: Nft = {
          itemId: item.itemId.toNumber(),
          seller: item.seller,
          owner: item.owner,
          image,
          name,
          description,
          // price,
        };

        setNfts((prev) => [...prev, nft]);
      }

      setIsLoaded(true);
    } catch (e) {
      alert(
        "Error loading nft. Please check if you have started the blockchain server, or did you deploy the contract? "
      );
      console.log(e);
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

  return (
    <div className="mb-[5rem] flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center mb-[12px]">
        <div>
          <img
            className="w-screen"
            src="https://res.cloudinary.com/dwhlxdb6r/image/upload/v1649446908/Rectangle_461_amalkp_1_u2vxf9.png"
            alt="User image"
          />
        </div>

        <div className="overflow-hidden mt-[-6rem] mb-[5px] hidden md:block">
          <Jazzicon diameter={150} seed={jsNumberForAddress(address)} />
        </div>

        <div className="overflow-hidden mt-[-3rem] mb-[5px] block md:hidden">
          <Jazzicon diameter={100} seed={jsNumberForAddress(address)} />
        </div>

        <div className="flex items-center h-[45px] border rounded-[50px] my-5">
          <span className="px-[15px] text-gray-400">{address}</span>
        </div>
      </div>

      <div className="mt-[3rem]">
        {/* Tab nav */}
        <ul className="flex text-center">
          <li
            role="button"
            className={activeTab === "collectedNfts" ? "active" : ""}
            onClick={collectedNftsHandle}
          >
            <span
              className={`px-[4rem] text-gray-500 items-center col-span-3 pt-8 pb-[2rem] text-2xl font-semibold text-center lg:text-1xl lg:pt-6 ${
                activeTab === "collectedNfts"
                  ? "text-[#FF6B00] underline underline-offset-[11px] decoration-[5px]"
                  : "text-gray-500"
              }`}
            >
              Collected
            </span>
          </li>
          <li
            role="button"
            className={activeTab === "listedNfts" ? "active" : ""}
            onClick={listedNftsHandle}
          >
            <span
              className={`px-[4rem] text-gray-500 items-center col-span-3 pt-8 pb-[2rem] text-2xl font-semibold text-center lg:text-1xl lg:pt-6 ${
                activeTab === "listedNfts"
                  ? "text-[#FF6B00] underline underline-offset-[11px] decoration-[5px]"
                  : "text-gray-500"
              }`}
            >
              Listed
            </span>
          </li>
        </ul>
      </div>

      <div className="w-full">
        <hr className="mt-[10px]"></hr>
        <div className={activeTab === "collectedNfts" ? "" : "hidden"}>
          <CollectedNfts handleClose={undefined} content={""} />
        </div>
        <div className={activeTab === "collectedNfts" ? "hidden" : ""}>
          <ListedNfts />
        </div>
      </div>
    </div>
  );
};

export default Profile;
