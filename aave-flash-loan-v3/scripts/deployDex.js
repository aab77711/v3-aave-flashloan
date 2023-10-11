const hre = require("hardhat");

async function main() {
  console.log("deploying...");
  const Dex = await hre.ethers.getContractFactory("Dex");
  const dex = await Dex.deploy(
    "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    "0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357",
    "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
  );

  await dex.deployed();

  console.log("Dex contract deployed: ", dex.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
