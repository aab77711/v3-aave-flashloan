const hre = require("hardhat");

async function main() {
  console.log("deploying...");
  const Dex = await hre.ethers.getContractFactory("Dex");
  const dex = await Dex.deploy(
    // "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    // "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
    // "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    // "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    // "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
    "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", // uniswap router
    "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F", // shushiswap router
    "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI address
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC address
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" // WETH address
  );

  const dexTx = Dex.getDeployTransaction(
    "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", // uniswap router
    "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F", // shushiswap router
    "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI address
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC address
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" // WETH address
  );

  const gasEstimate = await hre.ethers.provider.estimateGas(dexTx);
  console.log("Estimated gas for deployment:", gasEstimate.toString());

  /* Mainnet
  uniswap, sushiswap, dai, usdc, weth
  "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
  "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
  */

  await dex.deployed();

  const receipt = await hre.ethers.provider.getTransactionReceipt(dex.deployTransaction.hash);
  console.log("Gas used to deploy Dex:", receipt.gasUsed.toString());

  console.log("Dex contract deployed: ", dex.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
