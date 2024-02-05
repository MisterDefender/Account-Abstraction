
const hre = require("hardhat");
const ethers = hre.ethers;
const SMART_ACCOUNT = "0xa16E02E87b7454126E5E10d957A927A7F5B5d2be";

async function main() {
  const smartAccount = await ethers.getContractAt("Account", SMART_ACCOUNT);
  console.log("smartAccount is at: ", smartAccount.target);
  console.log("smartAccount counter: ", Number(await smartAccount.count()));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
