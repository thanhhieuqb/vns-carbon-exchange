/** @type import('hardhat/config').HardhatUserConfig */

require('dotenv').config();

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
      url: process.env.API_URL,
      accounts: [
        process.env.PRIVATE_KEY,
        process.env.PRIVATE_KEY1,
        process.env.PRIVATE_KEY2,
        process.env.PRIVATE_KEY3,
      ].filter(Boolean), // Filter out undefined or falsy values
      carbonCredit: {
        address: process.env.CARBON_CREDIT_ADDRESS,
      },
      escrow: {
        address: process.env.ESCROW_ADDRESS,
      },
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
}
