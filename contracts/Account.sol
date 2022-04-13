// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Account {
    using Counters for Counters.Counter; // setting counter variable
    Counters.Counter private _userCount; // counter for counting the user

    // for defining the structure of each user
    struct User {
        address walletAddress; // the wallet address of the user
        string username; // the username of the user
    }

    mapping(address => User) public getUser; // getting the user by mapping with the address

    User[] private _usersAddress; // the address for storing the user addresses

    event userCreated(address indexed walletAddress, string username); // event for creating the user by passing the wallet address and the user name

    // Creating the user
    function createUser(string memory _username) public {
        //Check Username should not be empty
        require(!isEmpty(_username), "Username cannot be empty");

        //Check if the user exists before creating a new one
        require(!isExists(), "User already exists");

        //Check if the username is already taken
        for (uint256 i = 0; i < _usersAddress.length; i++) {
            require(
                keccak256(abi.encodePacked(_usersAddress[i].username)) !=
                    keccak256(abi.encodePacked(_username)),
                "Username already taken"
            );
        }

        //Store the new user to the blockchain
        User memory newUser = User({
            walletAddress: msg.sender,
            username: _username
        });

        getUser[msg.sender] = newUser; //Store the user into blockchain

        _usersAddress.push(newUser); //Store push address array

        _userCount.increment(); //User count increment by 1

        emit userCreated(msg.sender, _username);
    }

    // check if the user exists
    function isExists() public view returns (bool) {
        //   console.log(getUser[msg.sender].walletAddress);
        if (getUser[msg.sender].walletAddress == address(0)) {
            return false;
        }
        return true;
    }

    //Test if string is empty
    function isEmpty(string memory _str) public pure returns (bool) {
        return
            keccak256(abi.encodePacked(_str)) ==
            keccak256(abi.encodePacked(""));
    }

    //Get the user by the wallet address
    function getUserByWalletAddress(address _walletAddress)
        public
        view
        returns (User memory user)
    {
        // console.log(_walletAddress);
        return getUser[_walletAddress];
    }
}
