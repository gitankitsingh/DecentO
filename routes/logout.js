var express = require('express');
var router = express.Router();

router.post('/',function(req,res){
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;