import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Account as contract } from "typechain-types";
import Web3Modal from "web3modal";
import { accountAddress } from "blockchain.config";
import OpenLava from "artifacts/contracts/OpenLava.sol/OpenLava.json";

const CreateAccount = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = new ethers.Contract(
        accountAddress,
        OpenLava.abi,
        provider
      ) as contract;

      

      //const data = await contract.getMarketItems();
    } catch (e) {
      // alert("Error: " + e);
    }
  };

  return (
    <>
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
      </form>
    </>
  );
};

export default CreateAccount;
