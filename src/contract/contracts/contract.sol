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


contract BillContract {
    // Event to log when a bill is added
    event BillAdded(uint indexed billId);

    // Structure to represent a bill
    struct Bill {
        uint billId;
        uint patientId;
        uint doctorId;
        string doctorName;
        string patientName;
        string billDate;
        uint totalCost;
        string billDescription;
        bool paymentConfirmation;
    }

    // Array to store bills
    Bill[] public bills;

    // Function to add a new bill
    function addBill(
        uint _billId,
        uint _patientId,
        uint _doctorId,
        string memory _doctorName,
        string memory _patientName,
        string memory _billDate,
        uint _totalCost,
        string memory _billDescription,
        bool _paymentConfirmation
    ) public {
        bills.push(Bill(
            _billId,
            _patientId,
            _doctorId,
            _doctorName,
            _patientName,
            _billDate,
            _totalCost,
            _billDescription,
            _paymentConfirmation
        ));
        emit BillAdded(_billId);
    }

    // Function to get the total number of bills
    function getBillCount() public view returns (uint) {
        return bills.length;
    }

    // Function to get a specific bill by index
    function getBill(uint index) public view returns (
        uint billId,
        uint patientId,
        uint doctorId,
        string memory doctorName,
        string memory patientName,
         string memory billDate,
        uint totalCost,
        string memory billDescription,
        bool paymentConfirmation
    ) {
        require(index < bills.length, "Bill does not exist");
        Bill memory bill = bills[index];
        return (
            bill.billId,
            bill.patientId,
            bill.doctorId,
            bill.doctorName,
            bill.patientName,
            bill.billDate,
            bill.totalCost,
            bill.billDescription,
            bill.paymentConfirmation
        );
    }
}

contract UserContract {
    // Event to log when a user is added
    event UserAdded(uint indexed userId);

    // Structure to represent a user
    struct User {
        uint userId;
        string firstName;
        string lastName;
        string dob;
        string gender;
        string address;
        string phone;
        string email;
    }

    // Array to store users
    User[] public users;

    // Function to add a new user
    function addUser(
        uint _userId,
        string memory _firstName,
        string memory _lastName,
        string memory _dob,
        string memory _gender,
        string memory _address,
        string memory _phone,
        string memory _email
    ) public {
        users.push(User(
            _userId,
            _firstName,
            _lastName,
            _dob,
            _gender,
            _address,
            _phone,
            _email
        ));
        emit UserAdded(_userId);
    }

    // Function to get the total number of users
    function getUserCount() public view returns (uint) {
        return users.length;
    }

    // Function to get a specific user by index
    function getUser(uint index) public view returns (
        uint userId,
        string memory firstName,
        string memory lastName,
        string memory dob,
        string memory gender,
        string memory address,
        string memory phone,
        string memory email
    ) {
        require(index < users.length, "User does not exist");
        User memory user = users[index];
        return (
            user.userId,
            user.firstName,
            user.lastName,
            user.dob,
            user.gender,
            user.address,
            user.phone,
            user.email
        );
    }
}
