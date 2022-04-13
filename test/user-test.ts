import { expect } from "chai";
import { ethers } from "hardhat";

//typescript https://yuichiroaoki.medium.com/testing-erc20-smart-contracts-in-typescript-hardhat-9ad20eb40502

describe("Account", () => {
  it("Should create user and list it username by it wallet address", async () => {
    //Deploy the contract
    const Account = await ethers.getContractFactory("Account");
    const account = await Account.deploy();
    await account.deployed();

    //Create a fake account for testing
    const [_, myAccount, account2] = await ethers.getSigners();
    await account.connect(myAccount).createUser("Fake User");
    // console.log(myAddress);

    const address = await myAccount.getAddress();

    let user = await account.connect(myAccount).getUserByWalletAddress(address);

    expect(user.username).to.equal("Fake User");

    // console.log("user", user);

    // const account2Addr = await account2.getAddress();

    // await account.connect(account2).createUser("Fake User");
  });
});
