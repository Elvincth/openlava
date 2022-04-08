/* eslint-disable @next/next/no-img-element */
import Card from "~/components/Card";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { openLavaAddress } from "blockchain.config";
import OpenLava from "artifacts/contracts/OpenLava.sol/OpenLava.json";

const NFTCard = ({
  src,
  name,
  description,
}: {
  src: string;
  name: string;
  description: string;
}) => (
  <div className="overflow-hidden transition duration-500 transform bg-white shadow-lg cursor-pointer w-80 rounded-xl hover:shadow-xl hover:scale-105">
    <img
      src={src}
      className="object-cover h-[280px] w-[280px] mx-auto"
      alt={name}
    />
    <div className="p-5">
      <h1 className="text-2xl font-bold">{name}</h1>
      <p className="mt-2 text-lg font-semibold text-gray-600">by John Smith</p>
      <p className="mt-1 text-gray-500">{description}</p>

      <div className="flex items-center mt-2">
        <img className="w-3" src="eth.svg" alt="" />
        <span className="ml-1">0.05</span>
      </div>
    </div>
  </div>
);
const Profile = () => {
  const [nfts, setNfts] = useState<any[]>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    loadNFTs();
  }, []);

  const loadNFTs = async () => {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = new ethers.Contract(
      openLavaAddress,
      OpenLava.abi,
      provider
    );

    const data = await contract.getOwnedNfts();

    console.log(data);

    try {
      const items = await Promise.all(
        data.map(async (i: any) => {
          const tokenUri = await contract.tokenURI(i.itemId); //Where the cid is stored

          console.log(tokenUri);

          let metaData = await axios.get(
            `https://nftstorage.link/ipfs/${tokenUri}/metadata.json`
          );

          let { description, image, name } = metaData.data;

          console.log(metaData);

          let price = ethers.utils.formatUnits(i.price.toString(), "ether");
          let item = {
            price,
            itemId: i.itemId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image,
            name,
            description,
          };
          return item;
        })
      );

      setNfts(items);
      setLoadingState("loaded");
    } catch (error) {}

    if (loadingState === "loaded" && !nfts.length)
      return <h1 className="px-20 py-10 text-3xl">No assets Owned</h1>;
  };

  return (
    <section className="grid self-center grid-cols-1 gap-20 pb-20 xl:grid-cols-3 md:grid-cols-2">
      {nfts.map((nft: any, i) => (
        <NFTCard
          key={i}
          src={nft.image.replace("ipfs://", "https://nftstorage.link/ipfs/")}
          name={nft.name}
          description={nft.description}
        />
      ))}
    </section>
  );
};

export default Profile;
