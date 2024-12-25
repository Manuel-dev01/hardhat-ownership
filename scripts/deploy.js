import { ethers } from "hardhat"

async function deploy() {
    const Proof = await ethers.getContractFactory("Proof")
    const proof = await Proof.deploy()

    await proof.waitForDeployment()
    console.log("Deployed Address", await proof.getAddress())
}

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    });