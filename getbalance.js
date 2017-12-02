var Web3 = require('web3');
var fs = require('fs');
solc = require('solc')

// Sets the default provider for web3 if one already doesn't exist 
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

//Compiling & running instanc of solidity code 

// code = fs.readFileSync('./getbalance.sol').toString();
// compiledCode = solc.compile(code);

// abiDefinition = JSON.parse(compiledCode.contracts[':ownerbalancereturner'].interface);
// BalanceContract = web3.eth.contract(abiDefinition);


// byteCode = "6060604052341561000f57600080fd5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060d68061005d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063590791f2146044575b600080fd5b3415604e57600080fd5b6054606a565b6040518082815260200191505060405180910390f35b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16319050905600a165627a7a723058203e613a60083e6ba54f211704e41ed50d9e60a4a9cfcebe36023b0cb714234a5e0029";
// deployedContract = mycontract.new({data: byteCode, from: web3.eth.accounts[0], gas: 4700000});
// contractInstance = mycontract.at(deployedContract.address);

// // Interacting with contract 

// contractInstance.getOwnerBalance.call();

var abiArray = [ { constant: true,
  inputs: [],
  name: 'getOwnerBalance',
  outputs: [Array],
  payable: false,
  stateMutability: 'view',
  type: 'function' },
{ inputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'constructor' } ]

  var MyContract = web3.eth.contract(abiArray);
  
  // instantiate by address
  var contractInstance = MyContract.at('0xaacc2d11f2e16eec12a34a82e4dd048818ad1b5d');
  
  // deploy new contract
  var myAccount = web3.eth.accounts[6];
  var contractInstance = MyContract.new({data: '0x12345...', from: myAccount, gas: 2000000});
  
