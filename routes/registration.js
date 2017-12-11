var express = require('express');
var router = express.Router();
var mywallet = require("./../wallet.js");
var Web3 = require('web3');

router.get('/',function(req,res){
    res.render('register');
});

router.post('/',function(req,res){
    var email_id = req.body.email_id;
    var pass_phrase = req.body.pass_phrase;
    var confirm_pass_phrase = req.body.confirm_pass_phrase;

    if(pass_phrase == confirm_pass_phrase)
    {
       var key_chain = mywallet.create_keychain(pass_phrase);
       var myaddress = key_chain.address;
      res.render('success.ejs',{myaddress});
    }
    else
    {
        console.log("Make sure your password matched");
    }});

module.exports = router;