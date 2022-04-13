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
import { addressToUsername } from "utils/addressToUsername";
import Link from "next/link";

const NFTCard = ({
  src,
  name,
  description,
  owner,
  price,
  itemId,
}: {
  src: string;
  name: string;
  description: string;
  price: string;
  owner: string;
  itemId: string;
}) => (
  <Link href={{ pathname: "/detail", query: { id: itemId } }} passHref>
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

        <div className="flex items-center mt-2">
          ETH
          <span className="ml-1">{price}</span>
        </div>
      </div>
    </div>
  </Link>
);

type Nft = {
  price: string;
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

    const data = await contract.getListedNfts(); // mainly changing the getListedNfts for listing all listed nft

    console.log(data);

    try {
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
              <NFTCard
                key={i}
                src={nft.image.replace(
                  "ipfs://",
                  "https://cloudflare-ipfs.com/ipfs/"
                )}
                itemId={String(nft.itemId)}
                name={nft.name}
                description={nft.description}
                price={nft.price}
                owner={nft.owner}
              />
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default ListedNfts;
