import hre from "hardhat";
const fs = require("fs");

async function main() {
  const OpenLava = await hre.ethers.getContractFactory("OpenLava");
  const openLava = await OpenLava.deploy();
  await openLava.deployed();
  console.log("OpenLava deployed to:", openLava.address);

  fs.writeFileSync(
    "./blockchain.config.ts",
    `export const openLavaAddress = "${openLava.address}"`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
