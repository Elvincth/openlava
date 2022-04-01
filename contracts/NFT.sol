// SPDX-License-Identifier: MIT
// Refrence: https://github.com/darkMatterChimpanzee/nftMarketplace/blob/main/contracts/NFTMarket.sol
// Refrence: https://docs.openzeppelin.com/contracts/4.x/erc721

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;

    constructor(address marketplaceAddress) ERC721("TokenStack", "TStack") {
        contractAddress = marketplaceAddress;
    }

    function createToken(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        //Metadata msg.sender (the address that the person called the fucntion), the creator of the token
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        //Sets the approval of a given operator An operator is allowed to transfer all tokens of the sender on their behalf
        setApprovalForAll(contractAddress, true);

        return newItemId;
    }
}
