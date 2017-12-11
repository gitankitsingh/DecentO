var express = require('express');
var router = express.Router();
var mywallet = require('./../wallet.js');
var Web3 = require('web3');

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// Sets the default provider for web3 if one already doesn't exist 
if (typeof web3 !== 'undefined') {
   web3 = new Web3(web3.currentProvider);
 } else {
   // set the provider you want from Web3.providers
   web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));    
 }

 var contract_addr = "0x954ee35b3b20e1ae102440dbb445ad388909eb14";
 var abi = [{"constant":false,"inputs":[{"name":"loanId","type":"uint256"}],"name":"lendLoan","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"borrower_addr","type":"address"},{"name":"amount","type":"uint256"},{"name":"emi","type":"uint256"},{"name":"interest","type":"uint256"},{"name":"time","type":"uint256"},{"name":"status","type":"bool"}],"name":"newLoan","outputs":[{"name":"loanId","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"loanid","type":"uint256"},{"name":"query","type":"uint256"}],"name":"getLoanAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"loanCounter","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"loans","outputs":[{"name":"borrower_address","type":"address"},{"name":"amount_required","type":"uint256"},{"name":"time_required_to_repay","type":"uint256"},{"name":"emi","type":"uint256"},{"name":"interest","type":"uint256"},{"name":"status","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}];
 var mycontract = web3.eth.contract(abi).at(contract_addr);

 // Unlock Your Account 
 router.post('/',function(req,res){
    var pass = req.body.pass;
    if(mywallet.verify_user(req.session.address,pass))
    {
        if(web3.personal.unlockAccount(req.session.address,pass,15000)){
            console.log(typeof(req.session.loan_id));
            mycontract.lendLoan(req.session.loan_id,{from:req.session.address,gas:1900000,value:parseInt(mycontract.loans(parseInt(req.session.loan_id))[1])});
            res.redirect('/');
        }
        else
        {
            res.render('confirmLoan',{transaction:-1});
        }
    }
    else
    {
        res.render('confirmLoan',{login:-1});
    }
 });

module.exports = router;