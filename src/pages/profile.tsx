/* eslint-disable @next/next/no-img-element */
import { OpenLava as contract } from "typechain-types";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { openLavaAddress } from "blockchain.config";
import OpenLava from "artifacts/contracts/OpenLava.sol/OpenLava.json";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import ListedNfts from "~/components/ListedNfts";
import CollectedNfts from "~/components/CollectedNfts";
import { addressToUsername } from "utils/addressToUsername";
import { useRouter } from "next/router";

type Nft = { // nft structure
  itemId: number;
  seller: string;
  owner: string;
  image: string;
  name: string;
  description: string;
};

const Profile = () => {
  const router = useRouter();
  const { tab } = router.query;
  const [nfts, setNfts] = useState<Array<Nft>>([]); // create state for storing nfts
  const [isLoaded, setIsLoaded] = useState(false); // create state for handling loading 
  const [address, setAddress] = useState(""); // create state for setting address
  const [activeTab, setActiveTab] = useState("collectedNfts"); // active tab state default collectNfts
  //username state default unnamed
  const [username, setUsername] = useState("unnamed");

  useEffect(() => {
    if (router.isReady && tab) {
      console.log("tab", tab);
      setActiveTab(tab as string);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const collectedNftsHandle = () => { // for handling the collected nft list 
    setActiveTab("collectedNfts");
  };

  const listedNftsHandle = () => { // for handling the listed nft list 
    setActiveTab("listedNfts");
  };

  useEffect(() => {
    init();
    userInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const init = async () => {
    let address = localStorage.getItem("address"); // get the user wallet address

    if (address) {
      let username = await addressToUsername(address); // get username by address
      console.log("username", username);
      setUsername(username); // set username
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

        <h3 className="text-3xl font-bold text-center">{username}</h3>

        <div className="flex items-center h-[40px] border rounded-[50px] mt-2.5 mb-5">
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
          <CollectedNfts content={""} />
        </div>
        <div className={activeTab === "collectedNfts" ? "hidden" : ""}>
          <ListedNfts />
        </div>
      </div>
    </div>
  );
};

export default Profile;
