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

    //  User[] public allUsers;

    event userCreated(address indexed walletAddress, string username);

    function createUser(string memory _username) public {
        //Store the new user
        User memory newUser = User({
            walletAddress: msg.sender,
            username: _username
        });

        getUser[msg.sender] = newUser;

        //  allUsers.push(newUser);
        _userCount.increment();
        emit userCreated(msg.sender, _username);
    }

    //Get the user by the wallet address
    function getUserByWalletAddress(address _walletAddress)
        public
        view
        returns (User memory user)
    {
        return getUser[_walletAddress];
    }

    // function getUser(address memory _walletAddress)
    //     public
    //     view
    //     returns (User[] memory)
    // {
    //     require(_userAddress != address(0));

    //     UserData storage user = getUser[_userAddress];

    //     return (user.profilePicHash, user.profileHash, user.userAddress);
    // }

    // function getUsersCount() public view returns (uint256) {
    //     return allUsers.length;
    // }
}
