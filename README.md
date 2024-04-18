# Aave Flash Loan Tutorial

Create an Aave Flash Loan arbitrage smart contract from scratch in this comprehensive flash loan tutorial by Block Explorer.

Check guide for [a Flahs loan execution code example on AAVE v3](aave-flash-loan-v3/README.md)

# Useful resources

## Aave v3 Flash Loan documentation:

https://docs.aave.com/developers/guides/flash-loans

https://docs.aave.com/developers/deployed-contracts/v3-testnet-addresses

## DAI-TestnetMintableERC20-Aave token (Sepolia):

0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357

## USDC-TestnetMintableERC20-Aave token(Sepolia):

0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8

## AAVE PoolAddressProvider (Sepolia):

0x012bAC54348C0E635dCAc9D5FB99f06F24136C9A

## Remix imports:

```solidity
import {FlashLoanReceiverBase} from "https://github.com/aave/protocol-v2/blob/master/contracts/flashloan/base/FlashLoanReceiverBase.sol";
import {ILendingPool} from "https://github.com/aave/protocol-v2/blob/master/contracts/interfaces/ILendingPool.sol";
import {ILendingPoolAddressesProvider} from "https://github.com/aave/protocol-v2/blob/master/contracts/interfaces/ILendingPoolAddressesProvider.sol";
import {IERC20} from "https://github.com/aave/protocol-v2/blob/master/contracts/dependencies/openzeppelin/contracts/IERC20.sol";
```

## Dex.sol deployed (Sepolia):

0xC32F44158D950A4636C8485b101E53EE9f6E99dD

## FlashLoanArbitrage.sol deployed (Sepolia):

0x10e0564886F0E56f31D375Bb6CcFf300FD58c715
