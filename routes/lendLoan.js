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

// Connecting with contract to extract information 
var contract_addr = "0x954ee35b3b20e1ae102440dbb445ad388909eb14";
var abi = [{"constant":false,"inputs":[{"name":"loanId","type":"uint256"}],"name":"lendLoan","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"borrower_addr","type":"address"},{"name":"amount","type":"uint256"},{"name":"emi","type":"uint256"},{"name":"interest","type":"uint256"},{"name":"time","type":"uint256"},{"name":"status","type":"bool"}],"name":"newLoan","outputs":[{"name":"loanId","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"loanid","type":"uint256"},{"name":"query","type":"uint256"}],"name":"getLoanAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"loanCounter","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"loans","outputs":[{"name":"borrower_address","type":"address"},{"name":"amount_required","type":"uint256"},{"name":"time_required_to_repay","type":"uint256"},{"name":"emi","type":"uint256"},{"name":"interest","type":"uint256"},{"name":"status","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}];
var mycontract = web3.eth.contract(abi).at(contract_addr);
var loanCounter = mycontract.loanCounter();

var unpassedLoans = [];
var unpassedLoansIndex = [];
for(let i=0;i<= loanCounter; i++)
{
    if(mycontract.loans(i)[5] == false)
    {
        unpassedLoans.push(mycontract.loans(i));
        unpassedLoansIndex.push(i);
    }
}

router.get('/',function(req,res){
    if(req.session.address)
    {
        res.render('lendLoan',{address:req.session.address,path:"/lendLoan",loan_seekers:unpassedLoans,count:0,index:unpassedLoansIndex});
    }
});

router.post('/',function(req,res){
    var loan_id = req.body.count_val;
    req.session.loan_id = parseInt(loan_id);
    res.render('confirmLoan',{address:req.session.address});
   
});
module.exports = router;