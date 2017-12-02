var mywallet = require("./wallet.js");
var Web3 = require('web3');

function login(address,password)
{
    if(mywallet.verify_user(address,password,"./keystore") == true)
    {
        return true;
    }
}

module.exports.user_login = login;

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    
  }

//get balance 
var balance = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]).toString(),'ether');

// send money 

web3.eth.sendTransaction({from:web3.eth.accounts[0], to:web3.eth.accounts[1], value: 10});

// get transaction 
var transaction = web3.eth.getTransaction('0xeda191058a2b2495a9e52a02d72d7730d37eb52522c16623b3f27cdf7485ece8')