// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

contract Transf{
	//bind a line to an area 
	function transfer(address payable to_add, uint256 value) public payable {
		require(address(this).balance >= value, "error balance");
		to_add.transfer(value);
	}
}