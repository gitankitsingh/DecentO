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

  var contract_addr = "0x54cd2697b96a767902206e3b1c61865012cd237c";
  var abi = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"campaigns","outputs":[{"name":"beneficiary","type":"address"},{"name":"fundingGoal","type":"uint256"},{"name":"numFunders","type":"uint256"},{"name":"amount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numCampaigns","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"campaignID","type":"uint256"}],"name":"checkGoalReached","outputs":[{"name":"reached","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"campaignID","type":"uint256"}],"name":"contribute","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"beneficiary","type":"address"},{"name":"goal","type":"uint256"}],"name":"newCampaign","outputs":[{"name":"campaignID","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];
  var mycontract = web3.eth.contract(abi).at(contract_addr);
  

router.get('/',function(req,res){
    res.render('croudFunding',{address:req.session.address});
});

router.post('/',function(req,res){
    var amount_req = req.body.amount_required;
    var campaign_name = req.body.campaign_name;
   
    if(web3.personal.unlockAccount(req.session.address,req.body.mapass,15000))
    {
        mycontract.newCampaign(req.session.address,amount_req,{from:req.session.address,gas:1900000});
        res.render('funding_success',{address:req.session.address,message:1,campaign_id:mycontract.numCampaigns(),camp_details:mycontract.campaigns(mycontract.numCampaigns(3))});
    }
    else
    {
        res.render('funding_success',{address:req.session.address,message:1});
    }
    
})








module.exports = router;