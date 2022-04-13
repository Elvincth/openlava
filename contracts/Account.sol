// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Account {
    using Counters for Counters.Counter;
    Counters.Counter private _userCount;

    struct User {
        address walletAddress;
        string username;
    }

    mapping(address => User) public getUser;

    User[] private _usersAddress;

    event userCreated(address indexed walletAddress, string username);

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

        getUser[msg.sender] = newUser;

        _usersAddress.push(newUser); //Store push blockchain

        _userCount.increment(); //User count increment by 1

        emit userCreated(msg.sender, _username);
    }

    //check if the user exists
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

    // //Check if the user exists
    // function usernameExists(string memory _username)
    //     public
    //     view
    //     returns (bool)
    // {
    //     for (uint256 i = 0; i < _userCount.current(); i++) {
    //         //check if the username is the same
    //         if (
    //             keccak256(abi.encodePacked(_username)) ==
    //             keccak256(abi.encodePacked(_usersAddress[i].username))
    //         ) {
    //             return true;
    //         }
    //     }

    //     return false;
    // }

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
