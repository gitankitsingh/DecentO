var express = require('express');
var router = express.Router();
var loginController = require('./../controllers/login.js');


router.get('/',loginController.index);
router.post('/',loginController.verifyUser);

module.exports = router;