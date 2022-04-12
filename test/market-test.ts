import { expect } from "chai";
import { ethers } from "hardhat";

//typescript https://yuichiroaoki.medium.com/testing-erc20-smart-contracts-in-typescript-hardhat-9ad20eb40502

describe("NFTMarket", () => {
  it("Should create and execute market sales", async () => {
    /* deploy the marketplace */
    const OpenLava = await ethers.getContractFactory("OpenLava");
    const openLava = await OpenLava.deploy();
    await openLava.deployed();

    const price = ethers.utils.parseUnits("1", "ether");

    //Create tokens
    await openLava.createToken("https://www.example.com", price);
    await openLava.createToken("https://www.example2.com", price);

    const [_, buyerAddress] = await ethers.getSigners();

    //Sell
    await openLava.connect(buyerAddress).buyToken(1, { value: price });

    //Resell
    await openLava.connect(buyerAddress).resellToken(1, price);

    /* query for and return the unsold items */
    let items = await openLava.getMarketItems();
    //@ts-ignore
    items = await Promise.all(
      items.map(async (i: any) => {
        const tokenUri = await openLava.tokenURI(i.itemId);
        let item = {
          price: i.price.toString(),
          itemId: i.itemId.toString(),
          seller: i.seller,
          owner: i.owner,
          tokenUri,
        };
        return item;
      })
    );
    console.log("items: ", items);
  });
});
