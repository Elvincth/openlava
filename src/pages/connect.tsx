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
  const [haveMetaMask, setHaveMetaMask] = useState(false); // create state for handling is there a MetaMask address 
  const [isLoading, setIsLoading] = useState(false); // create state for handling the loading progress
  const [haveAcc, setHaveAcc] = useState(true); // create state for handling is there an account

  //connected state
  const [connected, setConnected] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setHaveMetaMask(metaMaskInstalled()); // set the MetaMask status state
  }, []);

  // Detect if the user have metamask
  const metaMaskInstalled = () => { 
    // check if the ethereum not undefined, means there is MetaMask installed
    if (typeof window.ethereum !== "undefined") {
      return true;
    }

    return false; // else return false means there is no MetaMask installed
  };

  // handling connection
  const connect = async () => {
    try {
      setIsLoading(true); // set loading state to true for handling the loading

      // connect to contract setup
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        accountAddress,
        Account.abi,
        signer
      ) as contract;

      const address = await signer.getAddress(); // set the address by using the address of that specific signer

      setConnected(true); // set connect state to true means is connected

      //Check if user created account before
      const haveAccount = await contract.isExists();

      console.log("haveAccount", haveAccount);

      setHaveAcc(haveAccount); // set have account status

      if (haveAccount) { // if there is a account
        login(address); // put the address to the login function for makin the login
      } else {
        setIsLoading(false); // else the loading state would be stop
      }
    } catch (e) { // error handling, set all the status to false
      alert("Error: " + e);
      setConnected(false);
      setIsLoading(false);
    }
  };

  const login = (address: string) => { // login function
    localStorage.setItem("address", address); // pass the address and set the account for login 

    window.dispatchEvent(new Event("storage"));

    console.log("set item address", address);
    router.push("/profile"); // link to the profile page for displaying the user information
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
