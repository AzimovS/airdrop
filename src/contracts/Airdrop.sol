// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AirdropToken {
    function airdropWithTransfer(
        address _tokenAddress,
        address[] calldata _addressArray,
        uint256[] calldata _amountArray
    ) public {
        for (uint8 i = 0; i < _addressArray.length; i++) {
            IERC20(_tokenAddress).transfer(_addressArray[i], _amountArray[i]);
        }
    }

    function checkBalance(address _tokenAddress) public view returns (uint256) {
        return IERC20(_tokenAddress).balanceOf(address(this));
    }
}
