
const hre = require("hardhat");
const ethers = hre.ethers;
const SMART_ACCOUNT = "0xCafac3dD18aC6c6e92c921884f9E4176737C052c";

async function main() {
  const smartAccount = await ethers.getContractAt("Account", SMART_ACCOUNT);
  console.log("smartAccount is at: ", smartAccount.target);
  console.log("smartAccount counter: ", Number(await smartAccount.count()));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
