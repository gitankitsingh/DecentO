var express = require('express');
var router = express.Router();
var Web3 = require('web3');

// Sets the default provider for web3 if one already doesn't exist 
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); 
  }

 var contract_addr = "0x5a8ae866d88544fe2821d8b25506bce1472166ad";
 var abi = [{"constant":false,"inputs":[{"name":"campaignID","type":"uint256"}],"name":"checkGoalReached","outputs":[{"name":"reached","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"campaignID","type":"uint256"}],"name":"contribute","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"beneficiary","type":"address"},{"name":"goal","type":"uint256"}],"name":"newCampaign","outputs":[{"name":"campaignID","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];
 var mycontract = web3.eth.contract(abi).at(contract_addr);
  
 


module.exports = router;