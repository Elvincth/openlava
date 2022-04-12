import { ethers } from "ethers";
import { Account as contract } from "typechain-types";
import { accountAddress } from "blockchain.config";
import { openLavaAddress } from "blockchain.config";
import Account from "artifacts/contracts/Account.sol/Account.json";

export const addressToUsername = async (addr: string) => {
  const provider = new ethers.providers.JsonRpcProvider();
  const contract = new ethers.Contract(
    accountAddress,
    Account.abi,
    provider
  ) as contract;

  console.log("addr", addr);

  let userData = await contract.getUserByWalletAddress(addr);

  console.log("userData", userData);

  if (openLavaAddress == addr) {
    return "OpenLava";
  }

  return userData.username;
};
