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
import router, { useRouter } from "next/router";
import ResellPrice from "~/components/resellPrice";

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
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
  // children: React.ReactNode;
}

const NFTCard = (item: NFTCardProps) => (
  <div className="overflow-hidden transition duration-500 transform bg-white shadow-lg cursor-pointer w-80 rounded-xl hover:shadow-xl hover:scale-105">
    <img
      src={item.image.replace("ipfs://", "https://nftstorage.link/ipfs/")}
      className="object-cover h-[250px] w-80  mx-auto rounded-t-xl"
      alt={item.name}
    />
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

      <div onClick={item.onClick} className="mt-2 ml-[-3px]">
        <button
          type="submit"
          className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none"
        >
          Resell
        </button>
      </div>
    </div>
  </div>
);

const CollectedNfts = (props: {
  handleClose: React.MouseEventHandler<HTMLSpanElement> | undefined;
  content: React.ReactChild;
}) => {
  const [nfts, setNfts] = useState<Array<Nft>>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [currentNft, setCurrentNft] = useState<Nft | null>(null);

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
          price,
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

  const resell = async (nft: Nft | null) => {
    console.log("Resell nft", nft);

    if (!price || !nft) return;
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const priceFormatted = ethers.utils.parseUnits(price.toString(), "ether");
    let contract = new ethers.Contract(openLavaAddress, OpenLava.abi, signer);
    let transaction = await contract.resellToken(nft.itemId, priceFormatted);
    await transaction.wait();

    router.push("/");
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

  const togglePopup = () => {
    setIsOpen(!isOpen);
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
                  <div className="w-full p-[50px]">
                    {/* renew price */}

                    <div className="flex flex-col items-center justfify-center">
                      <div>
                        <label
                          htmlFor=""
                          className="text-[20px] font-bold text-black"
                        >
                          Input New Price{" "}
                          <span className="text-red-500">* </span>
                        </label>
                      </div>

                      <div className="mt-[2rem]">
                        <input
                          required
                          step="any"
                          type="number"
                          min={0.0e1}
                          name="price"
                          className="block w-full px-3 py-2 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-orange-500 focus:ring-orange-500 sm:text-sm focus:ring-1 invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 disabled:shadow-none"
                          placeholder="Price"
                          onChange={(e) => {
                            setPrice(Number(e.target.value));
                          }}
                        />
                      </div>

                      <div className="mt-[2rem]">
                        <button
                          onClick={() => resell(currentNft)}
                          type="submit"
                          className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none"
                        >
                          Confirm Resell
                        </button>
                      </div>
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
