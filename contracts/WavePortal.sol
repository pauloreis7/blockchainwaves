// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    constructor() {
        console.log("my first solidity smart contract");
    }

    function addWave() public {
        totalWaves += 1;

        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("we have %d waves now!", totalWaves);

        return totalWaves;
    }
}
