const hre = require("hardhat");

async function main() {
  console.log("deploying...");
  const FlashLoanArbitrage = await hre.ethers.getContractFactory("FlashLoanArbitrage");

  const deployTx = FlashLoanArbitrage.getDeployTransaction(
    "0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e", // Address of aave addressprovider contract
    "0x52885af08575270804Be1Fb2db720E7e68ff9122", // Dex contract address
    "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI address
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" // USDC address
  ); // Include constructor arguments if any

  const gasEstimate = await hre.ethers.provider.estimateGas(deployTx);

  console.log("Estimated gas for deployment:", gasEstimate.toString());

  // const flashLoanArbitrage = await FlashLoanArbitrage.deploy(
  //   "0x012bAC54348C0E635dCAc9D5FB99f06F24136C9A",
  //   "0x52885af08575270804Be1Fb2db720E7e68ff9122",
  //   "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  //   "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
  // );

  // await flashLoanArbitrage.deployed();
  // const receipt = await hre.ethers.provider.getTransactionReceipt(dex.deployTransaction.hash);
  // console.log("Gas used to deploy Dex:", receipt.gasUsed.toString());

  // console.log("Flash loan contract deployed: ", flashLoanArbitrage.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
