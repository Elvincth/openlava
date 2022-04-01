import { expect } from "chai";
import { ethers } from "hardhat";

describe("NFTMarket", function () {
  it("Should create and execute market sales", async () => {
    const Market = await ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy(); //Wait for contract to deploy
    await market.deployed;
    const marketAddress = await market.address;

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(); //Wait for contract to deploy
    await nft.deployed;
    const nftContractAddress = await nft.address;

    let listingPrice = await market.listingPrice();
    listingPrice = listingPrice.toString();

    const auctionPrice = ethers.utils.parseUnits("100", "ethers");

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
  });
});
