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
  networks: {
    goerli: {
      url: process.env.INFURA_GOERLI_ENDPOINT,
      accounts: [process.env.PRIVATE_KEY],
    },
    sepolia: {
      url: process.env.INFURA_SEPOLIA_ENDPOINT,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: "T3S7NPQWMYC4ZTSS4YTU3F848XP7JAD2CE",
    },
  },
};
