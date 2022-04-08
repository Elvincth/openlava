/* eslint-disable @next/next/no-img-element */
import Card from "~/components/Card";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { openLavaAddress } from "blockchain.config";
import OpenLava from "artifacts/contracts/OpenLava.sol/OpenLava.json";
import Link from "next/link";

const NFTCard = ({
  src,
  name,
  description,
  price,
}: {
  src: string;
  name: string;
  description: string;
  price: string;
}) => (
  <div className="overflow-hidden transition duration-500 transform bg-white shadow-lg cursor-pointer w-80 rounded-xl hover:shadow-xl hover:scale-105">
    <img
      src={src}
      className="object-cover h-[280px] w-80  mx-auto rounded-t-xl"
      alt={name}
    />
    <div className="p-5">
      <h1 className="text-2xl font-bold">{name}</h1>
      <p className="mt-2 text-lg font-semibold text-gray-600">by John Smith</p>
      <p className="mt-1 text-gray-500">{description}</p>

      <div className="flex items-center mt-2">
        ETH
        <span className="ml-1">{price}</span>
      </div>
    </div>
  </div>
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

const Home = () => {
  const [nfts, setNfts] = useState<Array<Nft>>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadNFTs();
  }, []);

  const loadNFTs = async () => {
    //List all unsold items
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = new ethers.Contract(
      openLavaAddress,
      OpenLava.abi,
      provider
    );

    const data = await contract.getMarketItems();

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
          price,
        };

        setNfts((prev) => [...prev, nft]);
      }

      setIsLoaded(true);
    } catch (e) {
      alert("Error getting nft!");
      console.log(e);
    }
  };

  async function buyNft(nft: any) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(openLavaAddress, OpenLava.abi, signer);

    /* user will be prompted to pay the asking process to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price,
    });
    await transaction.wait();
    loadNFTs();
  }

  if (isLoaded && nfts.length > 0) {
    return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>;
  }

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
                <button className=" mr-6 inline-flex items-center justify-center w-full px-12 text-base font-bold leading-6 text-white bg-[#FF6B00] border rounded-xl md:w-auto hover:bg-white hover:text-[#FF6B00] duration-300 hover:border-[#FF6B00]">
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
        Art
      </div>

      <section className="grid flex-wrap self-center grid-cols-1 gap-20 pb-20 xl:grid-cols-3 md:grid-cols-2 ">
        {nfts.map((nft: any, i) => (
          <NFTCard
            key={i}
            src={nft.image.replace("ipfs://", "https://nftstorage.link/ipfs/")}
            name={nft.name}
            description={nft.description}
            price={nft.price}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
