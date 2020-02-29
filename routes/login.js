var express = require('express');
var loginCtrl = require('../controllers/loginCtrl.js');
var router = express.Router();

router.get('/',function(req,res,next) {
    res.sendfile('./front-end-test/login.html');
	loginCtrl.login(req,res,next);
})

module.exports = router;