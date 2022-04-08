import { expect } from "chai";
import { ethers } from "hardhat";

//typescript https://yuichiroaoki.medium.com/testing-erc20-smart-contracts-in-typescript-hardhat-9ad20eb40502

describe("NFTMarket", function () {
  it("Should create and execute market sales", async function () {
    /* deploy the marketplace */
    const OpenLava = await ethers.getContractFactory("OpenLava");
    const openLava = await OpenLava.deploy();
    await openLava.deployed();

    // let listingPrice = await nftMarketplace.getListingPrice();
    // //@ts-ignore
    // listingPrice = listingPrice.toString();

    const auctionPrice = ethers.utils.parseUnits("1", "ether");

    /* create two tokens */
    await openLava.createToken("https://www.mytokenlocation.com", auctionPrice);
    await openLava.createToken(
      "https://www.mytokenlocation2.com",
      auctionPrice
    );

    const [_, buyerAddress] = await ethers.getSigners();

    /* execute sale of token to another user */
    await openLava.connect(buyerAddress).buyToken(1, { value: auctionPrice });

    /* resell a token */
    await openLava.connect(buyerAddress).resellToken(1, auctionPrice);

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
