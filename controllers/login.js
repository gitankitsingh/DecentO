var mywallet = require("./../wallet.js");

exports.index = function(req,res){

    if(!req.session.address)
    {
        res.render('login',{path:req.route.path});
    }
    else
    {
        res.redirect('/wallet');
    }
}

exports.verifyUser = function(req,res,router)
{
    var address = req.body.wallet_id.toString();
    var password = req.body.pass_phrase.toString();
    
    if(mywallet.verify_user(address,password,"./../keystore") == true)
    {
        req.session.address = "0x" + address;
        req.session.loginstatus = true;
        res.redirect('/wallet');
    }
}

   
   