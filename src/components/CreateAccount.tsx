import React, { useEffect, useState } from "react";
import { ContractFactory, ethers } from "ethers";
import { Account as contract } from "typechain-types";
import Web3Modal from "web3modal";
import { accountAddress } from "blockchain.config";
import Account from "artifacts/contracts/Account.sol/Account.json";
import { useRouter } from "next/router";
import LoadingOverlay from "./LoadingOverlay";

const CreateAccount = () => {
  const [name, setName] = useState("");
  //isCreating
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const createUser = async (e: any) => {
    setIsCreating(true); // is creating status
    e.preventDefault();
    try {
      // connect to contract
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
      console.log(address);
      console.log(name);
      let createUser = await contract.createUser(name);
      await createUser.wait();

      login(address);
    } catch (e) {
      //@ts-ignore
      alert("Error: " + e.message);
      setIsCreating(false);
    }
  };

  const login = (address: string) => {
    localStorage.setItem("address", address); // get address to localStorage

    window.dispatchEvent(new Event("storage"));

    console.log("set item address", address);
    router.push("/profile");
  };
  return (
    <>
      {isCreating && (
        <LoadingOverlay
          title="Please accept the transaction"
          message="It is a one time fee for creating an account"
        />
      )}
      <h1 className="text-[35px] lg:text-4xl text-black font-bold">
        Create an username.
      </h1>

      <form>
        <div className="mt-6">
          <label htmlFor="" className="text-lg font-bold text-black">
            Username <span className="text-red-500">* </span>
          </label>
          <div className="mt-2">
            <input
              required
              name="Username"
              className="block w-full px-3 py-2 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-orange-500 focus:ring-orange-500 sm:text-sm focus:ring-1 invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 disabled:shadow-none"
              placeholder="Username"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="mt-5">
          <button
            disabled={name.length < 1}
            type="submit"
            onClick={createUser}
            className="disabled:bg-gray-300 text-white bg-orange-500 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none"
          >
            Done
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateAccount;
