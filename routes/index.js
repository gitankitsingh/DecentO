var express = require('express');
var router = express.Router();


router.get('/',function(req,res){
   if(!req.session.address)
   {
    res.render('index');
   }
   else
   {
       res.redirect('/wallet');
   }
});

module.exports = router;