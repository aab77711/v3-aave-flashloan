# Deployment

**At first, ensure you are in `/aave-flash-loan-v3` directory**

### Install dependencies and set environment variables

1. Install all dependencies running

```shell
yarn install
```

2. Set environment variables

- Create a `.env` file from `.env.example` file
- Specify all necessary values in this file

### Compile and deploy smart contracts

1. Compile smart contracts

- Command to compile the smart contracts

```shell
npx hardhat compile
```

- This command will create artifacts and you can get ABIs from inside this directory.

2. Deploy smart contracts on mainnet

- Run this command to deploy Dex contract on mainnet

```shell
npx hardhat run --network mainnet ./scripts/deployDex.js
```

- Modify second parameter of deploy function in `deployFlashLoanArbitrage.js` file with Dex contract address you deployed
- Run this command to deploy FlashLoanArbitrage contract

```shell
npx hardhat run --network mainnet ./scripts/deployFlashLoanArbitrage.js
```

### Verify deployed smart contracts

This is general command to verify smart contract you just deployed

```shell
npx hardhat verify --network mainnet <contract_address> <deploy_param_1> <deploy_param_2> <deploy_param_3> ...
```
