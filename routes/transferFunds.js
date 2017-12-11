var express = require('express');
var router = express.Router();
var transferFundsController = require('./../controllers/transferFundsController');


router.get('/',transferFundsController.checkLoginStatus);
module.exports = router;