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
        require(bytes(_username).length == 0, "Username cannot be empty");

        //Check if the user exists before creating a new one
        require(
            getUser[msg.sender].walletAddress == address(0),
            "User already exists"
        );

        //Check if the username is already taken
        for (uint256 i = 0; i < _usersAddress.length; i++) {
            if (
                keccak256(abi.encodePacked(_usersAddress[i].username)) ==
                keccak256(abi.encodePacked(_username))
            ) {
                revert("Username already taken");
            }
        }

        //Store the new user
        User memory newUser = User({
            walletAddress: msg.sender,
            username: _username
        });

        getUser[msg.sender] = newUser;

        _usersAddress.push(newUser);

        _userCount.increment();

        emit userCreated(msg.sender, _username);
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
        return getUser[_walletAddress];
    }
}
