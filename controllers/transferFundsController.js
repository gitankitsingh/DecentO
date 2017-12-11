var mywallet = require("./../wallet.js");

exports.checkLoginStatus = function(req,res){
    if(req.session.address)
    {
        res.render('transferFunds',{address:req.session.address});
    }
};

