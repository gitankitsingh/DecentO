var express = require('express');
var router = express.Router();
let Web3 = require('web3');

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
        res.render('askLoan',{address:req.session.address});
    }
});
router.post('/',function(req,res){
    var amount = req.body.mount_in_ethers;
    var emi = req.body.emi;
    var interest = req.body.interest;
    var time = req.body.time_required;

    // Connecting with contract to extract information 
    var contract_addr = "0x954ee35b3b20e1ae102440dbb445ad388909eb14";
    var abi = [{"constant":false,"inputs":[{"name":"loanId","type":"uint256"}],"name":"lendLoan","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"borrower_addr","type":"address"},{"name":"amount","type":"uint256"},{"name":"emi","type":"uint256"},{"name":"interest","type":"uint256"},{"name":"time","type":"uint256"},{"name":"status","type":"bool"}],"name":"newLoan","outputs":[{"name":"loanId","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"loanid","type":"uint256"},{"name":"query","type":"uint256"}],"name":"getLoanAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"loanCounter","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"loans","outputs":[{"name":"borrower_address","type":"address"},{"name":"amount_required","type":"uint256"},{"name":"time_required_to_repay","type":"uint256"},{"name":"emi","type":"uint256"},{"name":"interest","type":"uint256"},{"name":"status","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}];
    var mycontract = web3.eth.contract(abi).at(contract_addr);

   var current_addr = req.session.address;
   // console.log(current_addr);
   if(web3.personal.unlockAccount(req.session.address,req.body.acc_pass,15000))
   {
        mycontract.newLoan(current_addr,parseInt(req.body.amount_in_ethers),parseInt(req.body.emi),parseInt(req.body.interest),req.body.time_required,false,{from:req.session.address,gas:1900000});
   }
    res.render('loan_success',{address:req.session.address,loan_details:{
        "Amount":req.body.amount_in_ethers + " Wei",
        "EMI" : req.body.emi,
        "Interest" : req.body.interest,
        "Time" : req.body.time_required + " Months",
        "loanId" : mycontract.loanCounter()
    }});
});
module.exports = router;

// var loanId = mycontract.loanCounter()

