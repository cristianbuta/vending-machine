require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, METAMASK_ACCOUNT_PRIVATE_KEY } = process.env;

module.exports = {
    defaultNetwork: "ropsten",
    networks: {
        hardhat: {},
        ropsten: {
            url: API_URL,
            accounts: [`0x${METAMASK_ACCOUNT_PRIVATE_KEY}`]
        }
    },
    solidity: {
        version: "0.8.11",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    }
}