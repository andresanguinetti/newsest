var express= require('express');
var router = express.Router();

var trainingSetCtrl = require('../controller/TrainingSetController');
var preprocessingCtrl = require('../controller/PreprocessingController');

// Renders the Preprocessing page
router.get('/', function(req, res) {

  let data = {};

  trainingSetCtrl.getTrainingSetByCategory("WOMEN", function(response) {
    preprocessingCtrl.process(response).then(function(docObj) {
      data.womenData = docObj;

      trainingSetCtrl.getTrainingSetByCategory("CRIME", function(response) {
        preprocessingCtrl.process(response).then(function(docObj) {
          data.crimeData = docObj;

          res.render('preprocessing', data);
        });
      })
    });

  });

});

module.exports = router;
