# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

To start the project you will have to first start a local blockchain

`yarn hardhat node`

Then you will have to deploy the smart contract of openLava

`yarn deploy`

Metamask network setup:

Network Name:
`Test`

New RPC URL:
`http://127.0.0.1:8545/`

Chain ID:
`1337`

Currency Symbol:
`ETH`
