// SPDX-License-Identifier: MIT
//Reference: https://github.com/dabit3/polygon-ethereum-nextjs-marketplace/blob/main/contracts/NFTMarketplace.sol
//Reference: https://www.youtube.com/watch?v=4Pm1Furz5HM
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "hardhat/console.sol";

contract OpenLava is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;
    address payable owner;

    //Create
    constructor() ERC721("OpenLava Tokens", "LAVA") {
        owner = payable(msg.sender);
    }

    struct Nft {
        uint256 id; //Store the NFT id
        address payable owner;
        address payable seller;
        uint256 price;
        bool available; //Is the token buyable?
    }

    //pass in the id of the Nft and return the Nft
    mapping(uint256 => Nft) private getNft;

    event NftCreated(
        uint256 indexed id,
        address owner,
        address seller,
        uint256 price,
        bool available
    );

    //Metadata msg.sender (the address that the person called the function), the creator of the token
    //FF
    function createToken(string memory tokenURI, uint256 price)
        public
        payable
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 id = _tokenIds.current();

        //Create the token
        _safeMint(msg.sender, id);

        //Where we set the unique address for the NFT
        _setTokenURI(id, tokenURI);

        //Now we create the market item
        require(price > 0, "Price must be greater than 0");

        getNft[id] = Nft(
            id,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );

        _transfer(msg.sender, address(this), id);

        //Emit event of the nft is created
        emit NftCreated(id, address(this), msg.sender, price, false);

        return id;
    }

    //Allow the user to resell their purchased token
    //FF , resellToken
    function resell(uint256 id, uint256 sellPrice) public payable {
        address myAddress = address(this);
        //Check if the token is owned by the user
        require(
            getNft[id].owner == msg.sender,
            "You are not the owner, cannot resell the item."
        );

        getNft[id].owner = payable(myAddress);
        getNft[id].seller = payable(msg.sender);

        getNft[id].available = false;
        getNft[id].price = sellPrice;

        _itemsSold.decrement(); //Decrement the number of items sold, as it is now available for sale

        _transfer(msg.sender, myAddress, id);
    }

    /* Creates the sale of a marketplace item */
    /* Transfers ownership of the item, as well as funds between parties */
    function createMarketSale(uint256 id) public payable {
        uint256 price = getNft[id].price;
        address seller = getNft[id].seller;
        console.log(Strings.toString(price), msg.value);
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );
        getNft[id].owner = payable(msg.sender);
        getNft[id].seller = payable(address(0));
        getNft[id].available = false;

        _itemsSold.increment();
        _transfer(address(this), msg.sender, id);
        payable(seller).transfer(msg.value);
    }

    /* Returns all unsold market items */
    function fetchMarketItems() public view returns (Nft[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 unsoldItemCount = _tokenIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        Nft[] memory items = new Nft[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (getNft[i + 1].owner == address(this)) {
                uint256 currentId = i + 1;
                Nft storage currentItem = getNft[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return items;
    }

    /* Returns only items that a user has purchased */
    function fetchMyNFTs() public view returns (Nft[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (getNft[i + 1].owner == msg.sender) {
                itemCount++;
            }
        }

        Nft[] memory items = new Nft[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (getNft[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                Nft storage currentItem = getNft[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return items;
    }

    /* Returns only items a user has listed */
    function fetchItemsListed() public view returns (Nft[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (getNft[i + 1].seller == msg.sender) {
                itemCount++;
            }
        }

        Nft[] memory items = new Nft[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (getNft[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                Nft storage currentItem = getNft[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return items;
    }
}
