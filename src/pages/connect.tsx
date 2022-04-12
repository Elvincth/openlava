/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { Account as contract } from "typechain-types";
import Router, { useRouter } from "next/router";
import LoadingOverlay from "~/components/LoadingOverlay";
import CreateAccount from "~/components/CreateAccount";
import { accountAddress } from "blockchain.config";
import Account from "artifacts/contracts/Account.sol/Account.json";

function Connect() {
  // const { activateBrowserWallet, account } = useEthers();
  // const etherBalance = useEtherBalance(account);
  const [haveMetaMask, setHaveMetaMask] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [haveAcc, setHaveAcc] = useState(true);
  //connected state
  const [connected, setConnected] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setHaveMetaMask(metaMaskInstalled());
  }, []);

  //Detect if the user have metamask
  const metaMaskInstalled = () => {
    if (typeof window.ethereum !== "undefined") {
      return true;
    }

    return false;
  };

  const connect = async () => {
    try {
      setIsLoading(true);
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        accountAddress,
        Account.abi,
        signer
      ) as contract;

      const address = await signer.getAddress();

      setConnected(true);

      //Check if user created account before
      const haveAccount = await contract.isExists();

      console.log("haveAccount", haveAccount);

      setHaveAcc(haveAccount);

      if (haveAccount) {
        login(address);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      alert("Error: " + e);
      setConnected(false);
      setIsLoading(false);
    }
  };

  const login = (address: string) => {
    localStorage.setItem("address", address);

    window.dispatchEvent(new Event("storage"));

    console.log("set item address", address);
    router.push("/profile");
  };

  return (
    <div className="container  mt-8 lg:my-[4.5rem]">
      {isLoading && (
        <LoadingOverlay
          title="Connecting..."
          message={"Please accept the connect"}
        />
      )}

      {!connected && (
        <>
          <h1 className="text-[35px] lg:text-4xl text-black font-bold">
            Connect your wallet.
          </h1>

          <h2 className="mt-3 ">
            Connect with one of our available wallet providers.
          </h2>

          {!haveMetaMask && (
            <p className="my-5 text-lg font-bold">
              Please install MetaMask, you can follow{" "}
              <a
                className="text-blue-500"
                href="https://www.geeksforgeeks.org/how-to-install-and-use-metamask-on-google-chrome/"
              >
                here
              </a>
            </p>
          )}

          <button
            disabled={!haveMetaMask}
            onClick={connect}
            className="disabled:grayscale w-full p-[16px] flex items-center h-[58px] border rounded-lg my-5 hover:shadow-md transition-shadow"
          >
            <img
              width={24}
              height={24}
              src="https://res.cloudinary.com/dasq4goqg/image/upload/v1649428489/metamask-alternative_zh8kkr.webp"
              alt=""
            />
            <span className="ml-3 font-bold">MetaMask</span>
          </button>
        </>
      )}

      {!haveAcc && connected && <CreateAccount />}
    </div>
  );
}

export default Connect;
