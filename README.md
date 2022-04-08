# OpenLava

First you will have MetaMask and create an account in meta mask, then copy the account private key to the .env file
you could follow the .env.example for the format (You can follow this tutorial for exporting your private key: https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)

# Start the project

To start the project you will have to first start a local blockchain and deploy the smart contract of openLava, by running:

`yarn dev:nft`

Then start the Next.js project:
`yarn dev`

# Add the test network to MetaMask

Please follow: https://autofarm.gitbook.io/autofarm-network/how-tos/defi-beginners-guide/switching-networks-on-metamask

And input the following details for setting up the network:

Network Name:
`Test`

New RPC URL:
`http://127.0.0.1:8545/`

Chain ID:
`1337`

Currency Symbol:
`ETH`
