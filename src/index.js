// dapp-framework.js

// Importing web3utility package
const Web3Utility = require('web3utility');

class DAppFramework {
  constructor() {
    this.web3 = new Web3Utility();
    this.userAccounts = {}; // Store user accounts
    this.smartContracts = {}; // Store deployed smart contracts
  }

  // Register a new user account
  registerUser(username) {
    const account = this.web3.createAccount();
    this.userAccounts[username] = account;
    return account;
  }

  // Deploy a new smart contract
  deploySmartContract(contractName, bytecode, username) {
    const account = this.userAccounts[username];
    if (!account) {
      throw new Error('User account not found');
    }

    const contractAddress = this.web3.deployContract(bytecode, account.address);
    this.smartContracts[contractName] = contractAddress;
    return contractAddress;
  }

  // Interact with a deployed smart contract
  interactWithSmartContract(contractName, methodName, ...args) {
    const contractAddress = this.smartContracts[contractName];
    if (!contractAddress) {
      throw new Error('Smart contract not found');
    }

    return this.web3.callContractMethod(contractAddress, methodName, ...args);
  }
}

module.exports = DAppFramework;
