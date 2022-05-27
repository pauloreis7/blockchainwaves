// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    event NewWaveEvent(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waverAddress;
        string message;
        uint256 timestamp;
    }

    Wave[] waves;

    constructor() payable {
        console.log("waves solidity smart contract");
    }

    function addWave(string memory _message) public {
        totalWaves += 1;
        console.log("%s has waved!", msg.sender);

        waves.push(Wave(msg.sender, _message, block.timestamp));

        emit NewWaveEvent(msg.sender, block.timestamp, _message);

        uint256 prizeAmount = 0.0001 ether;

        require(
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has."
        );

        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract.");
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWavesCount() public view returns (uint256) {
        console.log("we have %d waves now!", totalWaves);

        return totalWaves;
    }
}
