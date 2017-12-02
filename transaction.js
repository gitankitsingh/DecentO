var Web3 = require('web3');
var http = require('http');
var mywallet = require('./wallet.js')

// Sets the default provider for web3 if one already doesn't exist 
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    
  }

  


  