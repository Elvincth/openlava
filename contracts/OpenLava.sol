// SPDX-License-Identifier: MIT
//Reference: https://github.com/dabit3/polygon-ethereum-nextjs-marketplace/blob/main/contracts/NFTMarketplace.sol
//Reference: https://www.youtube.com/watch?v=4Pm1Furz5HM
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract OpenLava is ERC721URIStorage {
    using Counters for Counters.Counter; // counter in the market place
    Counters.Counter private _tokenIds; // token id counter for counting the number of token ids
    Counters.Counter private _itemsSold; // Sold item counter for counting the number of sold items

    address payable owner; // nft owner

    // for defining the structure of each nft card
    struct Nft {
        uint256 itemId; //the nft id
        address payable seller; // the seller of the specific nft
        address payable owner; // the person who bought the nft
        uint256 price; // nft price
        bool reserved; //is the token reserved?
    }

    // pass in the id of the Nft and return the Nft
    mapping(uint256 => Nft) private getNft;

    // for defining the event structure for meeting the NFT items to the blockchain
    event NftCreated(
        uint256 indexed itemId,
        address seller,
        address owner,
        uint256 price,
        bool reserved
    );

    // the constructor for linking with the ERC721
    constructor() ERC721("LAVA Tokens", "LAVA") {
        owner = payable(msg.sender); // for getting the wallet address and the username of the owner user
    }

    //Create the token, and put the token on the marketplace
    function createToken(string memory tokenURI, uint256 price)
        public
        payable
        returns (uint256)
    {
        _tokenIds.increment(); // add the number of NFT items
        uint256 itemId = _tokenIds.current(); // point the current token id for the creating item

        _safeMint(msg.sender, itemId); // for user create the NFT item
        _setTokenURI(itemId, tokenURI); // for creating the unique address of the NFT item

        //Now we create a new market item id
        require(price > 0, "Price must be at least 1 wei");

        //Store the NFT to the blockchain
        getNft[itemId] = Nft(
            itemId,
            payable(msg.sender), // the address that connect with the user
            payable(address(this)), // contract address
            price, // nft price
            false
        );

        _transfer(msg.sender, address(this), itemId);

        //Emit the event to the blockchain
        emit NftCreated(itemId, msg.sender, address(this), price, false);

        return itemId;
    }

    // Allow the user to resell their purchased token
    function resellToken(uint256 itemId, uint256 price) public payable {
        address myAddress = address(this); // storing the contract address

        // the requirement for achieving the resell nft
        require(
            getNft[itemId].owner == msg.sender, // if the user address is equal to the nft owner
            "You are not the owner of this NFT" // else display the error message
        );

        getNft[itemId].reserved = false;
        getNft[itemId].price = price; // get the input price into the resell nft
        getNft[itemId].seller = payable(msg.sender); // set the user address as the nft seller
        getNft[itemId].owner = payable(myAddress);
        _itemsSold.decrement(); // minus the sold item in the marketplace, in other word, add back a nft back to marketplace

        _transfer(msg.sender, address(this), itemId);
    }

    // Buy the token
    function buyToken(uint256 itemId) public payable {
        // requirement for achieving buy token
        require(msg.value == getNft[itemId].price, "Invalid asking price!"); // if the ntf price is equal to the msg.value price

        address seller = getNft[itemId].seller; // set the seller by using that nft item user address
        getNft[itemId].owner = payable(msg.sender); // set the address of who buy the nft to the nft owner field
        getNft[itemId].reserved = true; // nft is already sold
        getNft[itemId].seller = payable(address(0)); // set the nft seller by using that user address
        _itemsSold.increment(); // increase the sold item
        _transfer(address(this), msg.sender, itemId);
        payable(seller).transfer(msg.value); // pass the value price to transfer buyer ETH to seller
    }

    // Returns all unsold market items
    function getMarketItems() public view returns (Nft[] memory) {
        uint256 j = 0; // counter for counting the current item

        Nft[] memory nfts = new Nft[](
            _tokenIds.current() - _itemsSold.current()
        );

        // for loop listing all the unsold item
        for (uint256 i = 0; i < _tokenIds.current(); i++) {
            if (getNft[i + 1].owner == address(this)) {
                uint256 currentId = i + 1;
                Nft storage currentItem = getNft[currentId];
                nfts[j] = currentItem;
                j++;
            }
        }
        return nfts; // return nft array
    }

    // Get the NFT by id
    function getNftById(uint256 itemId) public view returns (Nft memory) {
        return getNft[itemId]; // return the exact nft by passing the item id
    }

    //  Listing the owned nft of the specific user
    function getOwnedNfts() public view returns (Nft[] memory) {
        uint256 j = 0; // counter for listing the nft
        uint256 numOfNfts = 0; // counter of counting the number of nft

        // counting how many nfts is owned by that specific user
        for (uint256 i = 0; i < _tokenIds.current(); i++) {
            if (getNft[i + 1].owner == msg.sender) {
                // if the nft owner is equal to user address
                numOfNfts++; // add the number of owned nft
            }
        }

        Nft[] memory nfts = new Nft[](numOfNfts); //Store all the nfts the user bought

        // listing all owned nft
        for (uint256 i = 0; i < _tokenIds.current(); i++) {
            if (getNft[i + 1].owner == msg.sender) {
                Nft storage nft = getNft[i + 1];
                nfts[j] = nft;
                j++;
            }
        }
        return nfts;
    }

    // Get all the nft the user listed for sale
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
