import React from 'react';
import './styles.css';

const LandingPage = () => {
  const openWhitepaper = () => {
    window.open('https://docs.google.com/presentation/d/1a9Kj6ehueSRea7F_IUvXy2mrbnDyYEHwd5nRdSTCpNs/edit?usp=sharing', '_blank');
  };
  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">SADCOIN</div>
        <ul className="nav-links">
          <li className="active">Home</li>
          <li>Get SadCoin</li>
          <li>Profile</li>
          <li onClick={openWhitepaper}>Whitepaper</li>
        </ul>
      </nav>
      <div className="content">
        <h1 className="main-heading">Sadness is Lessened When it is Known</h1>
        <h2 className="sub-heading">SaDcoin is a launchpad focused on letting you transact with Emotional Authenticity!</h2>
        <div className="buttons-container">
          <button className="primary-button">Use Case</button>
          <button className="secondary-button">Claims</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;