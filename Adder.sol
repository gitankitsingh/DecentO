pragma solidity ^0.4.18;
contract Adder {
    int a;
    int b;
    function Adder(int num1,int num2) public {
        a = num1;
        b = num2;
    }
    function add() public constant returns (int) {
        return (a+b);
    }
    function mul() public constant returns (int) {
        return (a*b);
    }
}

