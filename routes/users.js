var express = require('express');
var router = express.Router();
var deploy_c = require('../deploy_contract');


/* GET users listing. */
router.get('/deploy', function(req, res, next) {
  res.send('respond with res a resource');
});

module.exports = router;
