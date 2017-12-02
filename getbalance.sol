pragma solidity ^0.4.18;
contract ownerbalancereturner {
    address owner;
    function ownerbalancereturner() public {
        owner = msg.sender; 
    }
    function getOwnerBalance() public constant returns (uint) {
        return owner.balance;
    }
}

