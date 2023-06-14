import { useEffect, useState } from 'react';
import './styles.css';
import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { utils } from 'ethers'; // Importing utils from ethers.js

const sdk = new ThirdwebSDK(Sepolia);

const LandingPage = () => {
  const [etherAmount, setEtherAmount] = useState(''); // State variable to store the input
  const { contract, error } = useContract("0xf8f9d03f36A116453A601499B0646F781B85e0e0");

  useEffect(() => {
    if (error) {
      console.error('Failed to load contract:', error);
    }
  }, [error]);
  const { mutateAsync: approve, isLoading } = useContractWrite(contract, "approve")

  const handleClaimToken = async () => {
    //await sdk.connectWallet(); // Connect the wallet

    //const contract = await sdk.getContract("0xf8f9d03f36A116453A601499B0646F781B85e0e0");
  
    const weiAmount = utils.parseEther(etherAmount); // Convert Ether to Wei
    const tx = await contract.call("claimToken", [], { value: weiAmount.toString() }); // Add the value to the options object
    console.log('Transaction hash:', tx.hash);
  };

    
  

  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">SADCOIN</div>
        <ul className="nav-links">
          <li className="active">Home</li>
          <li>Get SadCoin</li>
          <li>Profile</li>
          <li onClick={() => window.open('https://docs.google.com/presentation/d/1a9Kj6ehueSRea7F_IUvXy2mrbnDyYEHwd5nRdSTCpNs/edit?usp=sharing', '_blank')}>Whitepaper</li>
        </ul>
      </nav>
      <div className="content">
        <h1 className="main-heading">Sadness is Lessened When it is Known</h1>
        <h2 className="sub-heading">SaDcoin is a launchpad focused on letting you transact with Emotional Authenticity!</h2>
        <div className="buttons-container">
          <button className="primary-button">Use Case</button>
          {/*
          <button className="secondary-button" onClick="">Claims</button>
          */}
          <div className="buttons-container">
            <input
              type="text"
              value={etherAmount}
              onChange={e => setEtherAmount(e.target.value)}
              placeholder="Enter amount in Ether"
            />
            <button className="secondary-button" onClick={handleClaimToken} disabled={!contract}>
              claimToken
            </button>
            <ConnectWallet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
