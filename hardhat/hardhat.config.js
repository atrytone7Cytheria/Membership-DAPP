require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const {API_URL, PRIVATE_KEY} = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/_RIgtnXl1LNjPtzCcOd4IStfRm2lwNZN",
      accounts: ["0x5e52e8f00683aec0e5af46e091ebca8ad8fed1242d676f736b9b53ae052b24ed"]
    }
  }
};