const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  const AccountFactory = await hre.ethers.deployContract("AccountFactory");
  await AccountFactory.waitForDeployment();

  const PayMaster = await ethers.deployContract("Paymaster");
  await PayMaster.waitForDeployment();

  const EntryPoint = await hre.ethers.deployContract("EntryPoint");
  await EntryPoint.waitForDeployment();

  console.log("EntryPoint deployed at: ", EntryPoint.target);
  console.log("AccountFactory deployed at: ", AccountFactory.target);
  console.log("PayMaster deployed at: ", PayMaster.target); //
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
