var express = require('express');
var router = express.Router();
var loginController = require('./../controllers/login.js');
var Web3 = require('web3');

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// Sets the default provider for web3 if one already doesn't exist 
if (typeof web3 !== 'undefined') {
   web3 = new Web3(web3.currentProvider);
 } else {
   // set the provider you want from Web3.providers
   web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    
 }

  router.get('/',function(req,res){
    if(req.session.address)
    {
        var mybalance = web3.fromWei(web3.eth.getBalance(req.session.address),'ether') + " Ethers";
        res.render('wallet',{address:req.session.address.toString(),account_balance:mybalance});
    }
});

module.exports = router;