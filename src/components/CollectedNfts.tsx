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

type Nft = {
  // price: string;
  tokenUri: string;
  itemId: number;
  seller: string;
  owner: string;
  image: string;
  name: string;
  description: string;
};

interface NFTCardProps extends Nft {
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
}

const NFTCard = (item: NFTCardProps) => (
  <div
    onClick={item.onClick}
    className="overflow-hidden transition duration-500 transform bg-white shadow-lg cursor-pointer w-80 rounded-xl hover:shadow-xl hover:scale-105"
  >
    <img
      src={item.tokenUri.replace("ipfs://", "https://nftstorage.link/ipfs/")}
      className="object-cover h-[250px] w-80  mx-auto rounded-t-xl"
      alt={item.name}
    />
    <div className="p-5 ">
      <h2 className="text-2xl font-bold truncate">{item.name}</h2>
      <p className="mt-2 text-lg font-semibold text-gray-600 truncate">
        by {item.owner}
      </p>
      <p className="mt-1 text-gray-500 truncate">{item.description}</p>

      {/* <div className="flex items-center mt-2">
        ETH
        <span className="ml-1">{price}</span>
      </div> */}
    </div>
  </div>
);

const CollectedNfts = () => {
  const [nfts, setNfts] = useState<Array<Nft>>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [address, setAddress] = useState("");

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
          tokenUri,
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

  const resell = (nft: Nft) => {
    console.log("Resell nft", nft);
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
    <div className="mb-[5rem]">
      <div className="flex flex-col mt-[2rem]">
        {isLoaded && nfts.length <= 0 && (
          <h1 className="px-20 py-10 text-xl text-center">
            Currently no items{" "}
          </h1>
        )}

        {isLoaded && nfts.length > 0 && (
          <section className="grid flex-wrap self-center grid-cols-1 gap-20 pb-20 xl:grid-cols-3 md:grid-cols-2 px-[5rem] py-[50px]">
            {nfts.map((nft, i) => (
              <NFTCard key={i} onClick={() => resell(nft)} {...nft} />
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default CollectedNfts;
