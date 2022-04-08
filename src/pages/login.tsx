/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

function Login() {
  // const { activateBrowserWallet, account } = useEthers();
  // const etherBalance = useEtherBalance(account);
  const [haveMetaMask, setHaveMetaMask] = useState(false);

  useEffect(() => {}, []);

  //Detect if the user have metamask
  const metaMaskInstalled = () => {
    if (typeof window.ethereum !== "undefined") {
      return false;
    }

    return true;
  };

  const connect = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      console.log(address);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className="container  mt-8 lg:my-[4.5rem]">
      <h1 className="text-[35px] lg:text-4xl text-black font-bold">
        Connect your wallet.
      </h1>

      <h2 className="mt-3 ">
        Connect with one of our available wallet providers.
      </h2>

      <p>Please install MetaMask</p>

      <div
        onClick={connect}
        role="button"
        className="p-[16px] flex items-center h-[58px] border rounded-lg my-5 hover:shadow-md transition-shadow"
      >
        <img
          width={24}
          height={24}
          src="https://res.cloudinary.com/dasq4goqg/image/upload/v1649428489/metamask-alternative_zh8kkr.webp"
          alt=""
        />
        <span className="ml-3 font-bold">MetaMask</span>
      </div>
    </div>
  );
}

export default Login;
