// SPDX-License-Identifier: MIT
//Reference: https://github.com/dabit3/polygon-ethereum-nextjs-marketplace/blob/main/contracts/NFTMarketplace.sol
//Reference: https://www.youtube.com/watch?v=4Pm1Furz5HM
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract OpenLava is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    address payable owner;

    struct Nft {
        uint256 itemId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool available; //is the token for sell?
    }

    //pass in the id of the Nft and return the Nft
    mapping(uint256 => Nft) private getNft;

    event NftCreated(
        uint256 indexed itemId,
        address seller,
        address owner,
        uint256 price,
        bool available //is the token for sell?
    );

    constructor() ERC721("LAVA Tokens", "LAVA") {
        owner = payable(msg.sender);
    }

    //Create the token, and put the token on the marketplace
    function createToken(string memory tokenURI, uint256 price)
        public
        payable
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 itemId = _tokenIds.current();

        _safeMint(msg.sender, itemId);
        _setTokenURI(itemId, tokenURI);

        //Now we create a new market item id
        require(price > 0, "Price must be at least 1 wei");

        getNft[itemId] = Nft(
            itemId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );

        _transfer(msg.sender, address(this), itemId);

        //Emit the event to the blockchain
        emit NftCreated(itemId, msg.sender, address(this), price, false);

        return itemId;
    }

    //Allow the user to resell their purchased token
    //FF , resellToken
    function resellToken(uint256 itemId, uint256 price) public payable {
        address myAddress = address(this);

        require(
            getNft[itemId].owner == msg.sender,
            "You are not the owner of this NFT"
        );

        getNft[itemId].available = false;
        getNft[itemId].price = price;
        getNft[itemId].seller = payable(msg.sender);
        getNft[itemId].owner = payable(myAddress);
        _itemsSold.decrement();

        _transfer(msg.sender, address(this), itemId);
    }

    //Handle the user buy the token, also transfer the ownership to the buyer
    function buyToken(uint256 itemId) public payable {
        require(
            msg.value == getNft[itemId].price,
            "Please submit the asking price in order to complete the purchase"
        );
        address seller = getNft[itemId].seller;
        getNft[itemId].owner = payable(msg.sender);
        getNft[itemId].available = true;
        getNft[itemId].seller = payable(address(0));
        _itemsSold.increment();
        _transfer(address(this), msg.sender, itemId);
        payable(seller).transfer(msg.value);
    }

    //FF, fetchMarketItems, Returns all unsold market items
    function getMarketItems() public view returns (Nft[] memory) {
        uint256 j = 0;

        Nft[] memory nfts = new Nft[](
            _tokenIds.current() - _itemsSold.current()
        );

        for (uint256 i = 0; i < _tokenIds.current(); i++) {
            if (getNft[i + 1].owner == address(this)) {
                uint256 currentId = i + 1;
                Nft storage currentItem = getNft[currentId];
                nfts[j] = currentItem;
                j++;
            }
        }
        return nfts;
    }

    //Get the NFT by id
    function getNftById(uint256 itemId) public view returns (Nft memory) {
        //require(getNft[itemId].available == false, "Item is not available");
        return getNft[itemId];
    }

    // function getAll() public view returns (Nft[] memory) {
    //     Nft[] memory nfts = new Nft[](_tokenIds.current());

    //     for (uint256 i = 0; i < _tokenIds.current(); i++) {
    //         nfts[i] = getNft[i];
    //         i++;
    //     }

    //     return nfts;
    // }

    //Get the user owned nfts
    function getOwnedNfts() public view returns (Nft[] memory) {
        uint256 j = 0;
        uint256 numOfNfts = 0;

        for (uint256 i = 0; i < _tokenIds.current(); i++) {
            if (getNft[i + 1].owner == msg.sender) {
                numOfNfts++;
            }
        }

        Nft[] memory nfts = new Nft[](numOfNfts); //Store all the nfts the user bought

        for (uint256 i = 0; i < _tokenIds.current(); i++) {
            if (getNft[i + 1].owner == msg.sender) {
                Nft storage nft = getNft[i + 1];
                nfts[j] = nft;
                j++;
            }
        }
        return nfts;
    }

    //Get all the nft the user listed
    function getListedNfts() public view returns (Nft[] memory) {
        uint256 j = 0;
        uint256 numOfNfts = 0; //Used to store how many items the user owned

        //loop through the owned items, also count the ones that are owned by the user
        //Used to find the array length
        for (uint256 i = 0; i < _tokenIds.current(); i++) {
            if (getNft[i + 1].seller == msg.sender) {
                numOfNfts++;
            }
        }

        Nft[] memory nfts = new Nft[](numOfNfts); //Store all the nfts the user owned

        //Store the nft to the array
        for (uint256 i = 0; i < _tokenIds.current(); i++) {
            if (getNft[i + 1].seller == msg.sender) {
                Nft storage nft = getNft[i + 1];
                nfts[j] = nft;
                j++;
            }
        }
        return nfts;
    }
}
