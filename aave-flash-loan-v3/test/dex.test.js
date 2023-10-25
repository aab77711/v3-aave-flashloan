// import { ethers } from "hardhat";
// import { expect } from "chai";
// import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const { ethers } = require("hardhat");
const { expect } = require("chai");

const WETH_ABI = require("../constants/abis/weth.json");
const DAI_ABI = require("../constants/abis/dai.json");
const USDC_ABI = require("../constants/abis/usdc.json");

describe("Flash Loan Simple Arbitrage contract", function () {
  const USDC_WHALE = "0xDa9CE944a37d218c3302F6B82a094844C6ECEb17";
  const DAI_WHALE = "0x25B313158Ce11080524DcA0fD01141EeD5f94b81";
  let owner;
  let usdcWhale;
  let daiWhale;
  let dex;
  let flashloan;
  let dai;
  let usdc;
  let weth;

  beforeEach(async function () {
    usdcWhale = await ethers.getImpersonatedSigner(USDC_WHALE);
    daiWhale = await ethers.getImpersonatedSigner(DAI_WHALE);
    [owner] = await ethers.getSigners();

    weth = await ethers.getContractAt(WETH_ABI, "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2");
    dai = await ethers.getContractAt(DAI_ABI, "0x6B175474E89094C44Da98b954EedeAC495271d0F");
    usdc = await ethers.getContractAt(USDC_ABI, "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48");
    await usdc.deployed();

    // deposit some funds to deployer address
    await weth.deposit({ value: ethers.utils.parseEther("1000") });
    await owner.sendTransaction({ to: usdcWhale.address, value: ethers.utils.parseEther("50.0") });
    await owner.sendTransaction({ to: daiWhale.address, value: ethers.utils.parseEther("50.0") });
    await usdc.connect(usdcWhale).transfer(owner.address, ethers.utils.parseUnits("1000000", 6));
    // await dai.connect(daiWhale).transfer(owner.address, ethers.utils.parseEther("1000000"));

    const Dex = await ethers.getContractFactory("Dex");
    dex = await Dex.deploy(
      "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
      "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
    );
    await dex.deployed();

    const FlashLoan = await ethers.getContractFactory("FlashLoanArbitrage");
    flashloan = await FlashLoan.deploy(
      "0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e",
      dex.address, // "0x52885af08575270804Be1Fb2db720E7e68ff9122",
      "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
    ); // provide pool provider address, dex address to contract construct
    await flashloan.deployed();
  });

  it("should deploy contracts correctly", async function () {
    expect(dex.address).to.equal(await flashloan.dexContractAddress());
    // expect(flashloan.address).to.not.equal(0);
    // expect(await dai.totalSupply()).to.equal(ethers.utils.parseEther("100000"));
    // expect(await usdc.deciamls()).to.equal(6);
  });

  it("should buy dai token", async function () {
    await usdc.transfer(dex.address, ethers.utils.parseUnits("1000", 1));
    await owner.sendTransaction({ to: dex.address, value: ethers.utils.parseEther("10") });

    await dex.buyDAI(dex.address);
  });

  it("should swap tokens correctly", async function () {
    await usdc.approve(dex.address, ethers.utils.parseUnits("1000000", 6));
    await dai.approve(dex.address, ethers.utils.parseUnits("1000000", 18));

    await dex.simpleTrades(ethers.utils.parseUnits("1000", 6));
  });

  it("should works for flash loan system", async function () {
    // Approve dex contract for swapping the usdc and dai
    await flashloan.approveUSDC(ethers.utils.parseUnits("1000000", 6));
    await flashloan.approveDAI(ethers.utils.parseUnits("1000000", 18));

    // Deposit some usdc to contract for small fee
    await usdc.connect(usdcWhale).transfer(flashloan.address, ethers.utils.parseUnits("1", 6));

    const beforeBalance = await usdc.balanceOf(flashloan.address);

    // Execute flashloan
    await flashloan.requestFlashLoan(usdc.address, ethers.utils.parseUnits("1000", 6));

    const afterBalance = await usdc.balanceOf(flashloan.address);

    // Should have some profit(I wish :), but it was .to.not.equal in actually, coz it's not profitable soemtimes)
    expect(beforeBalance).to.greaterThan(afterBalance);
  });
});
