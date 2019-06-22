var express= require('express');
var router = express.Router();

var trainingSetCtrl = require('../controller/TrainingSetController');
var testCtrl = require('../controller/TestController');

router.get('/', function(req, res) {

  let data = {};

  res.render('test', data);

});

module.exports = router;
