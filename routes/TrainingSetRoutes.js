var express= require('express');
var router = express.Router();

var trainingSetCtrl = require('../controller/TrainingSetController');

// Renders the training set page
router.get('/', function(req, res) {
  trainingSetCtrl.getTrainingSet(function(response) {
    res.render('training-set', {trainingSetData: response});
  });
});

module.exports = router;
