require('dotenv').config();
const contract = require("../artifacts/contracts/vending-machine.sol/VendingMachine.json")

async function main() {
    const { API_URL, METAMASK_ACCOUNT_PRIVATE_KEY, METAMASK_ACCOUNT_PUBLIC_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(`${API_URL}`);

    const contractAddress = '0xc7E286A86e4c5b8F7d52fA3F4Fe7D9DE6601b6F9' //replace with your own
    const contractAPI = new web3.eth.Contract(contract.abi, contractAddress)

    const nonce = await web3.eth.getTransactionCount(METAMASK_ACCOUNT_PUBLIC_KEY, 'pending');

    const transaction = {
        to: contractAddress, // faucet address to return eth
        gas: 500000,
        nonce: nonce,
        data: contractAPI.methods.getVendingMachineBalance().encodeABI()
        // optional data field to send message or execute smart contract
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, METAMASK_ACCOUNT_PRIVATE_KEY)

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (error, hash) {
        if (!error) {
            console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
        } else {
            console.log("❗Something went wrong while submitting your transaction:", error)
        }
    });
}

main()