import { expect } from "chai";
import { ethers } from "hardhat";

//typescript https://yuichiroaoki.medium.com/testing-erc20-smart-contracts-in-typescript-hardhat-9ad20eb40502

describe("NFTMarket", function () {
  it("Should create and execute market sales", async () => {
    const Market = await ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy(); //Wait for contract to deploy
    await market.deployed();
    const marketAddress = market.address;

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(); //Wait for contract to deploy
    await nft.deployed;
    const nftContractAddress = await nft.address;

    let listingPrice = await market.listingPrice();
    listingPrice = listingPrice.toString();

    const auctionPrice = ethers.utils.parseUnits("100", "ether");

    //Create some NFTs here
    await nft.createToken("https://www.example1.com");
    await nft.createToken("https://www.example2.com");

    await market.createMarketItem(nftContractAddress, 1, auctionPrice, {
      value: listingPrice,
    });
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, {
      value: listingPrice,
    });

    const [_, buyerAddress] = await ethers.getSigners();

    await market
      .connect(buyerAddress)
      .createMarketSale(nftContractAddress, 1, { value: auctionPrice });

    const items = await market.fetchMarketItems();

    console.log("items: ", items);
  });
});
