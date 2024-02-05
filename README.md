# Account Abstraction :unlock:
---
**NOTE** : ***This is for demo purposes only***

## How to run account abstraction:question:
1. `npm install` Install all the required packages.
2. `npx hardhat node` Run the hardhat node on localhost.
3. `npx hardhat run scripts/deploy.js` Deploy all the required contracts on locally hosted ethereum node.
   1. Copy `EntryPoint`, `AccountFactory`, `PayMaster` addresses, and paste them into `.env.example` file.
   2. Make `.env.example` :arrow_right: `.env`
4. `npx hardhat run scripts/execute.js` Execute the transaction to increment the count of smart account by calling `execute()` method on it.
5. Verify the transaction by running `npx hardhat run scripts/testCounter.js`, counter will increase starting from :zero:. In each simultaneous transaction `count++`
---
