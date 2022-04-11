import hre from "hardhat";
const fs = require("fs");

async function main() {
  const OpenLava = await hre.ethers.getContractFactory("OpenLava");
  const openLava = await OpenLava.deploy();
  await openLava.deployed();
  console.log("OpenLava smart contract deployed to:", openLava.address);

  const Account = await hre.ethers.getContractFactory("Account");
  const account = await Account.deploy();
  await account.deployed();
  console.log("Account smart contract deployed to:", account.address);

  fs.writeFileSync(
    "./blockchain.config.ts",
    `export const openLavaAddress = "${openLava.address}";\nexport const accountAddress = "${account.address}";`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
