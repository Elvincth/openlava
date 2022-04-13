/* eslint-disable @next/next/no-img-element */
import { OpenLava as contract } from "typechain-types";
import { ethers } from "ethers";
import { MouseEventHandler, useEffect, useState } from "react";
import axios from "axios";
import { openLavaAddress } from "blockchain.config";
import OpenLava from "artifacts/contracts/OpenLava.sol/OpenLava.json";
import Link from "next/link";
import { addressToUsername } from "utils/addressToUsername";

const NFTCard = ({ // nft card structure
  src,
  name,
  itemId,
  description,
  price,
  owner,
}: {
  src: string;
  name: string;
  description: string;
  price: string;
  owner: string;
  itemId: number;
}) => ( // styling each card
  <Link href={{ pathname: "/detail", query: { id: itemId } }} passHref>
    <div className="overflow-hidden transition duration-500 transform bg-white shadow-lg cursor-pointer w-80 rounded-xl hover:shadow-xl hover:scale-105">
      <img
        src={src}
        className="object-cover h-[280px] w-80  mx-auto rounded-t-xl"
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

type Nft = { // nft content
  price: string;
  itemId: number;
  seller: string;
  owner: string;
  image: string;
  name: string;
  description: string;
};

const Home = () => {
  const [nfts, setNfts] = useState<Array<Nft>>([]); // create state for storing each nft
  const [isLoaded, setIsLoaded] = useState(false); // create state for handling is the status loading

  useEffect(() => {
    fetchItems();
  }, []);

  //List all unsold items
  const fetchItems = async () => {
    setNfts([]);

    // connect to contract
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = new ethers.Contract(
      openLavaAddress,
      OpenLava.abi,
      provider
    ) as contract;

    const data = await contract.getMarketItems(); // call getMarketItems for storing all unsold data to data

    console.log(data);

    try {
      // listing the data
      for (let i = 0; i < data.length; i++) {
        const item = data[i]; // put the specific data into item 
        const tokenUri = await contract.tokenURI(item.itemId); // where the cid is stored

        let metaData = await axios.get( // connect with ipfs and get that item
          `https://cloudflare-ipfs.com/ipfs/${tokenUri}/metadata.json`
        );

        let { description, image, name } = metaData.data; // set description, image and name variable by metaData

        console.log(metaData);

        let price = ethers.utils.formatUnits(item.price.toString(), "ether"); // price to ether

        let { itemId, seller, owner } = item; // set itemId, seller and owner variable by item

        //the nft is held by the contract owner, that mean newly created

        seller = await addressToUsername(seller); // find seller by seller address

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

      setIsLoaded(true); // set load status to true for confirming nfts loaded
    } catch (e) {
      alert("Error" + e);
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <section className="flex flex-col lg:px-40 w-full lg:min-h-[580px] bg-cover lg:mb-10 bg-[url('https://res.cloudinary.com/dasq4goqg/image/upload/v1645114580/Rectangle_461_amalkp.png')]">
        <div className="flex flex-col justify-between h-full lg:flex-row">
          <div className="flex flex-col items-center justify-center pt-20 pb-12 pl-4 text-center lg:items-start lg:px-0 lg:text-left ">
            <h1 className="text-3xl font-bold lg:text-5xl">
              Create Your Own Art
            </h1>
            <br></br>
            <h1 className="lg:text-2xl text-lg font-normal max-w-[300px]">
              OpenLava is the best NFT marketplace
            </h1>
            <div className="flex flex-row mt-8">
              <Link href="/create" passHref>
                <button className=" mr-6 inline-flex items-center justify-center w-full px-12 text-base font-bold leading-6 text-white bg-[#FF6B00] border rounded-xl md:w-auto hover:bg-orange-600  duration-300 hover:border-[#FF6B00]">
                  Create
                </button>
              </Link>
              <button className="inline-flex items-center justify-center w-full px-12 py-1.5 text-base font-bold leading-6 text-[#FF6B00] bg-white border border-[#FF6B00] rounded-xl md:w-auto hover:bg-[#FF6B00] hover:text-white duration-300">
                Search
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center h-full">
            <div className=" max-w-[520px] lg:p-8">{}</div>
          </div>
        </div>
      </section>

      <div className="items-center col-span-3 pt-8 pb-8 text-2xl font-bold text-center lg:text-4xl lg:pt-6">
        For Sale
      </div>

      {isLoaded && nfts.length <= 0 && (
        <h1 className="px-20 py-10 text-xl text-center">Currently no items</h1>
      )}

      <section className="grid flex-wrap self-center grid-cols-1 gap-20 pb-20 xl:grid-cols-3 md:grid-cols-2 ">
        {nfts.map((nft, i) => (
          <NFTCard
            key={i}
            src={nft.image.replace(
              "ipfs://",
              "https://cloudflare-ipfs.com/ipfs/"
            )}
            name={nft.name}
            description={nft.description}
            price={nft.price}
            owner={nft.owner}
            itemId={nft.itemId}
          />
        ))}
        {!isLoaded && (
          <div className="mx-auto border rounded-md shadow w-80">
            <div className="flex space-x-4 animate-pulse">
              <div className="flex-1 space-y-6">
                <div className="h-[280px] w-80 bg-slate-200 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4 px-[20px] pb-[20px]">
                    <div className="h-[1rem] bg-slate-200 rounded col-span-2"></div>
                    <div className="h-[1rem] bg-slate-200 rounded col-span-2"></div>
                    <div className="h-[1rem] bg-slate-200 rounded col-span-2"></div>
                    <div className="h-[1rem] bg-slate-200 rounded col-span-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
