require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/-e6gY5yqQR9A7wtfkYPLtAmYBHWuX8H3",
      },
    },
    goerli: {
      url: process.env.INFURA_GOERLI_ENDPOINT,
      accounts: [process.env.PRIVATE_KEY],
      allowUnlimitedContractSize: true,
    },
    sepolia: {
      url: process.env.INFURA_SEPOLIA_ENDPOINT,
      accounts: [process.env.PRIVATE_KEY],
      allowUnlimitedContractSize: true,
    },
    mainnet: {
      // gasLimit: 2100000,
      // gasPrice: 8000000000,
      url: process.env.INFURA_MAINNET_ENDPOINT,
      accounts: [process.env.PRIVATE_KEY],
      allowUnlimitedContractSize: true,
    },
  },
  etherscan: {
    apiKey: {
      sepolia: "T3S7NPQWMYC4ZTSS4YTU3F848XP7JAD2CE",
      mainnet: "T3S7NPQWMYC4ZTSS4YTU3F848XP7JAD2CE",
    },
  },
};
