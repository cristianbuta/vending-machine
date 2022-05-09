const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
    const VendingMachine = await ethers.getContractFactory("VendingMachine")

    const vendingMachine = await VendingMachine.deploy()
    await vendingMachine.deployed()
    console.log("Contract deployed to address:", vendingMachine.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
