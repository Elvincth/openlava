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

const ListedNfts = () => {
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

    const data = await contract.getListedNfts();

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
    <div className="flex flex-col">
      <div className="items-center col-span-3 pt-8 pb-[2rem] text-2xl font-bold text-center lg:text-4xl lg:pt-6">
        Listed
      </div>

      {isLoaded && nfts.length <= 0 && (
        <h1 className="px-20 py-10 text-xl text-center">Currently no items </h1>
      )}

      {isLoaded && nfts.length > 0 && (
        <section className="grid flex-wrap self-center grid-cols-1 gap-20 pb-20 xl:grid-cols-3 md:grid-cols-2 px-[5rem] py-[50px]">
          {nfts.map((nft, i) => (
            <NFTCard
              key={i}
              src={nft.image.replace(
                "ipfs://",
                "https://nftstorage.link/ipfs/"
              )}
              name={nft.name}
              description={nft.description}
              // price={nft.price}
              owner={nft.owner}
            />
          ))}
        </section>
      )}
    </div>
  );
};

export default ListedNfts;