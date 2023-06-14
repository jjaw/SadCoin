// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract SadCoin is ERC20, Ownable {
    AggregatorV3Interface internal priceFeed;
    uint256 public maxSupply; // Maximum supply of tokens

    constructor() ERC20("SadCoin", "SAD") {
        priceFeed = AggregatorV3Interface(0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e); // ETH/USD Price Feed on Goerli
        maxSupply = 1000000000; // Set maximum supply to 1 billion tokens
        _mint(msg.sender, maxSupply / 2); // Mint half of the tokens to the contract creator
    }

    function decimals() public view virtual override returns (uint8) {
        return 0;
    }

    function claimToken() public payable {
        require(totalSupply() + 1 <= maxSupply, "Max supply reached"); // Check if max supply would be exceeded
        int ethPrice = getLatestPrice();
        require(msg.value >= 1 ether * 10**8 / uint256(ethPrice), "Not enough ETH sent"); // Require $1 worth of ETH
        _mint(msg.sender, 1); // Mint 1 token to the sender
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }

    function increaseMaxSupply(uint256 amount) public onlyOwner {
        maxSupply += amount; // Increase maximum supply by the specified amount
    }

    function getLatestPrice() public view returns (int) {
        (
            , 
            int price,
            ,
            ,
        ) = priceFeed.latestRoundData();
        return price;
    }
}
