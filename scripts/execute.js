
const hre = require("hardhat");
require("dotenv").config();


const ethers = hre.ethers;
const FACTORY_NONCE = 1;
const FACTORY_ADDRESS = process.env.FACTORY_ADDRESS;
const ENTRY_POINT_ADDRESS = process.env.ENTRY_POINT_ADDRESS;
const PAY_MASTER_ADDRESS = process.env.PAY_MASTER;

async function main() {
  // const lockedAmount = hre.ethers.parseEther("0.001");

  const signers = await ethers.getSigners();


  const EntryPoint = await hre.ethers.getContractAt(
    "EntryPoint",
    ENTRY_POINT_ADDRESS
  );
  console.log("EntryPoint is at: ", EntryPoint.target);

  const sender = ethers.getCreateAddress({
    from: FACTORY_ADDRESS,
    nonce: FACTORY_NONCE,
  });

  const AccountFactory = await ethers.getContractFactory("AccountFactory");
  const Account = await ethers.getContractFactory("Account");

  const addressZero = await signers[0].getAddress();
  const initCode = // for first time when account is created from factory
    FACTORY_ADDRESS +
    AccountFactory.interface
      .encodeFunctionData("createAccount", [addressZero])
      .slice(2); // first 20 bytes FACTORY_ADDRESS and rest calldata to create account from factory

    //   const initCode = '0x' // after account is created
  const callData = Account.interface.encodeFunctionData("execute"); // calling execute to increment counter

  const UserOperation = {
    sender, // smart account address
    nonce: await EntryPoint.getNonce(sender, 0),
    // initCode, (use it first time to create smart account)
    initCode: "0x", // used from second time(after smart account creation)
    callData, // smart account calling calldata {user txn calldata}
    callGasLimit: 200_000,
    verificationGasLimit: 200_000, // default verification gas. will add create2 cost (3200+200*length) if initCode exists
    preVerificationGas: 50_000, // should also cover calldata cost.
    maxFeePerGas: ethers.parseUnits("10", "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits("5", "gwei"),
    // paymasterAndData: "0x", // Since gas is not payed by Paymaster
    paymasterAndData: PAY_MASTER_ADDRESS, // since we're paying gas with paymaster
    signature: "0x",
  };

  // uncomment to deposit fund to entry point for gas consumption of account contract.
  // const depositForGasTx = await(await EntryPoint.depositTo(sender, {value: ethers.parseEther("10")})).wait();

  //When paymaster will pay the gas for user transactions //Run when the funds are low 
//   const depositForGasTx = await(await EntryPoint.depositTo(PAY_MASTER_ADDRESS, {value: ethers.parseEther("10")})).wait();
//   console.log("Balance deposited: ", await EntryPoint.balanceOf(PAY_MASTER_ADDRESS));
//   console.log("Sender address created [Smart-Account] : ", sender);

  let tx = await (
    await EntryPoint.handleOps([UserOperation], addressZero)
  ).wait();
  console.log("Tx status: ", tx.status);
  console.log("Transaction receipt : \n", tx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
