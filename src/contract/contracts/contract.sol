// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

contract PaymentContract {
    address public owner;
    mapping(address => uint256) public balances;

    event FundsTransferred(address indexed from, address indexed to, uint256 amount);

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    function transferFunds(address payable _recipient, uint256 _amount) external onlyOwner {
        require(balances[address(this)] >= _amount, "Insufficient balance in contract");
        require(_recipient != address(0), "Invalid recipient address");

        balances[address(this)] -= _amount;
        _recipient.transfer(_amount);

        emit FundsTransferred(address(this), _recipient, _amount);
    }

    function depositFunds() external payable {
        balances[address(this)] += msg.value;
    }
}
