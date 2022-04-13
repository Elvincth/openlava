import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "dotenv/config";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    // mumbai: {
    //   //The projectId shd be hidden and store in .env, but for demo use only
    //   url: "https://zmldxs5p79bt.usemoralis.com:2053/server",
    //   accounts: [process.env.WALLET_PRIVATE_KEY],
    // },
    // mainnet: {
    //   url: "https://axrmw0ees7iz.usemoralis.com:2053/server",
    //   accounts: [process.env.WALLET_PRIVATE_KEY],
    // },
  },
  solidity: "0.8.4",
};
