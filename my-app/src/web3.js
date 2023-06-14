import Web3 from 'web3';

let web3;

if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  try {
    // Request account access if needed
    window.ethereum.enable();
    // Acccounts now exposed
  } catch (error) {
    console.error(error);
  }
} else if (window.web3) {
  // Use Mist/MetaMask's provider
  web3 = window.web3;
  console.log('Injected web3 detected.');
} else {
  console.log('No web3? You should consider trying MetaMask!');
  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

export default web3;
