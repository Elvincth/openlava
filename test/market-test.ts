import { expect } from "chai";
import { ethers } from "hardhat";

//typescript https://yuichiroaoki.medium.com/testing-erc20-smart-contracts-in-typescript-hardhat-9ad20eb40502

describe("NFTMarket", function () {
  it("Should create and execute market sales", async function () {
    /* deploy the marketplace */
    const NFTMarketplace = await ethers.getContractFactory("OpenLava");
    const nftMarketplace = await NFTMarketplace.deploy();
    await nftMarketplace.deployed();

    // let listingPrice = await nftMarketplace.getListingPrice();
    // //@ts-ignore
    // listingPrice = listingPrice.toString();

    const auctionPrice = ethers.utils.parseUnits("1", "ether");

    /* create two tokens */
    await nftMarketplace.createToken(
      "https://www.mytokenlocation.com",
      auctionPrice
    );
    await nftMarketplace.createToken(
      "https://www.mytokenlocation2.com",
      auctionPrice
    );

    const [_, buyerAddress] = await ethers.getSigners();

    /* execute sale of token to another user */
    await nftMarketplace
      .connect(buyerAddress)
      .createMarketSale(1, { value: auctionPrice });

    /* resell a token */
    await nftMarketplace.connect(buyerAddress).resellToken(1, auctionPrice);

    /* query for and return the unsold items */
    let items = await nftMarketplace.getMarketItems();
    //@ts-ignore
    items = await Promise.all(
      items.map(async (i: any) => {
        const tokenUri = await nftMarketplace.tokenURI(i.itemId);
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
