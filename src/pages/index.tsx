/* eslint-disable @next/next/no-img-element */
import Card from "~/components/Card";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { openLavaAddress } from "blockchain.config";
import OpenLava from "artifacts/contracts/OpenLava.sol/OpenLava.json";

const Home = () => {
  const [nfts, setNfts] = useState<any[]>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = new ethers.Contract(
      openLavaAddress,
      OpenLava.abi,
      provider
    );

    const data = await contract.getMarketItems();

    console.log(data);

    const items = await Promise.all(
      data.map(async (i: any) => {
        //    const tokenUri = await contract.tokenURI(i.tokenId);
        // const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          itemId: i.itemId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          // image: meta.data.image,
          // name: meta.data.name,
          // description: meta.data.description,
        };
        return item;
      })
    );

    setNfts(items);
    setLoadingState("loaded");
  }

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
  if (loadingState === "loaded" && !nfts.length)
    return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>;

  return (
    <div className="flex flex-col w-full h-screen">
      <section className="flex flex-col lg:px-40 w-full lg:min-h-[580px] bg-cover  lg:mb-20 bg-[url('https://res.cloudinary.com/dasq4goqg/image/upload/v1645114580/Rectangle_461_amalkp.png')]">
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
              <button className=" mr-6 inline-flex items-center justify-center w-full px-12 text-base font-bold leading-6 text-white bg-[#FF6B00] border rounded-xl md:w-auto hover:bg-white hover:text-[#FF6B00] duration-300 hover:border-[#FF6B00]">
                Create
              </button>
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

      <div className="items-center col-span-3 pt-8 pb-8 text-4xl font-bold text-center lg:pt-6">
        Art
      </div>
      {/* map the data2 */}
      <section className="grid self-center grid-cols-1 gap-20 pb-20 lg:grid-cols-3 md:grid-cols-2">
        <div className="overflow-hidden transition duration-500 transform bg-white shadow-lg cursor-pointer w-80 rounded-xl hover:shadow-xl hover:scale-105">
          <img
            src="https://images.unsplash.com/photo-1577982787983-e07c6730f2d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=859&q=80"
            alt=""
          />
          <div className="p-5">
            <h1 className="text-2xl font-bold">El poder de la lampara</h1>
            <p className="mt-2 text-lg font-semibold text-gray-600">
              by John Smith
            </p>
            <p className="mt-1 text-gray-500">
              Lorem ipsum carrots, enhanced undergraduate developer, but they do
              occaecat time and vitality, Lorem ipsum carrots, enhanced
              undergraduate developer, but they do occaecat time and vitality
            </p>
            <img className="w-4" src="eth.svg" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
