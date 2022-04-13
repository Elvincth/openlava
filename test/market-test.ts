import { ethers } from "hardhat";

//typescript https://yuichiroaoki.medium.com/testing-erc20-smart-contracts-in-typescript-hardhat-9ad20eb40502

describe("NFTMarket", () => {
  it("Should create and execute market sales", async () => {
    //Deploy the contract
    const OpenLava = await ethers.getContractFactory("OpenLava");
    const openLava = await OpenLava.deploy();
    await openLava.deployed();
    const price = ethers.utils.parseUnits("100", "ether");
    await openLava.createToken("https://www.example.com", price); //Create tokens
    await openLava.createToken("https://www.example2.com", price);
    const [_, addr] = await ethers.getSigners();
    await openLava.connect(addr).buyToken(1, { value: price }); //Sell
    await openLava.connect(addr).resellToken(1, price); //Resell
    let items = await openLava.getMarketItems();
    //@ts-ignore

    let itemArr = [];
    for (let i = 0; i < items.length; i++) {
      const tokenUri = await openLava.tokenURI(items[i].itemId);

      itemArr.push({
        price: items[i].price.toString(),
        itemId: items[i].itemId.toString(),
        seller: items[i].seller,
        owner: items[i].owner,
        tokenUri,
      });
    }

    console.log("itemArr ", itemArr);
  });
});
