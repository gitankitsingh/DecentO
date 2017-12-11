var Web3 = require('web3');
var fs = require('fs');
solc = require('solc')


web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.eth.defaultAccount = web3.eth.accounts[0];  

var abi = [ { constant: true,
  inputs: [],
  name: 'getOwnerBalance',
  outputs: [ [Object] ],
  payable: false,
  stateMutability: 'view',
  type: 'function' },
{ inputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'constructor' } ]

  var addr = '0xd25320192345786bd0dbb1d2056892396728cf64';

  var BalanceContract = web3.eth.contract(abi);
  var ownerbalancereturner = BalanceContract.at(addr);

  var ownerbalancereturner = BalanceContract.new({from: web3.eth.accounts[0], gas: 4700000})

  console.log(ownerbalancereturner);