const hre = require("hardhat");

async function main() {
  console.log("deploying...");
  const FlashLoanArbitrage = await hre.ethers.getContractFactory("FlashLoanArbitrage");
  const flashLoanArbitrage = await FlashLoanArbitrage.deploy(
    "0x012bAC54348C0E635dCAc9D5FB99f06F24136C9A",
    "0xd5C90E84F4559C77d0243e2CFb0E55278e80322f",
    "0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357",
    "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8"
  );

  await flashLoanArbitrage.deployed();

  console.log("Flash loan contract deployed: ", flashLoanArbitrage.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
