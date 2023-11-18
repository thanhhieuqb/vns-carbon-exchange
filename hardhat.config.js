/** @type import('hardhat/config').HardhatUserConfig */

require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.1",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      chainId: 31337,
    },
    sepolia: {
      chainId: 11155111,
      saveDeployments: true,
      url: API_URL,
      accounts: process.env.PRIVATE_KEY !== undefined && process.env.PRIVATE_KEY1 !== undefined &&  process.env.PRIVATE_KEY2 !== undefined && process.env.PRIVATE_KEY3 !== undefined ? [process.env.PRIVATE_KEY,process.env.PRIVATE_KEY1,process.env.PRIVATE_KEY2,process.env.PRIVATE_KEY3] : [],
      carbonCredit: {
        address: process.env.CARBON_CREDIT_ADDRESS,
      }
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
}
