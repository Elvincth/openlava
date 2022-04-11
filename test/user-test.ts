import { expect } from "chai";
import { ethers } from "hardhat";

//typescript https://yuichiroaoki.medium.com/testing-erc20-smart-contracts-in-typescript-hardhat-9ad20eb40502

describe("Account", function () {
  it("Should create user and list it username by it wallet address", async function () {
    /* deploy the account contract */
    const Account = await ethers.getContractFactory("Account");
    const account = await Account.deploy();
    await account.deployed();
    
  });
});
