var express = require('express');
var router = express.Router();
var deploy_c = require('../deploy_contract');


/* GET users listing. */
router.get('/', function(req, res, next) {
		res.render('deploy');
});

module.exports = router;
