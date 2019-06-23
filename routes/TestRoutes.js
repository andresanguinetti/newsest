var express= require('express');
var router = express.Router();

var trainingSetCtrl = require('../controller/TrainingSetController');
var preprocessingCtrl = require('../controller/PreprocessingController');
var testCtrl = require('../controller/TestController');
var classifier = require('../features/classifier');

router.get('/', function(req, res) {

  let data = {};

  getData().then(function(classVectors) {
    data.classVectors = classVectors;
    res.render('test', data);
  });

});

router.post('/', function(req, res) {

  let data = {};

  getData().then(function(classVectors) {
    data.classVectors = classVectors;

    //Process text
    if(req.body.text != null) {
      let text = req.body.text;
      let vectorsArr = classifier.cossineSimilarity(text, classVectors);

      let cosWomen = classifier.calculateCosineSimilarity(vectorsArr.tfidfVectorWomen, classVectors[0].tfidf);
      let cosCrime = classifier.calculateCosineSimilarity(vectorsArr.tfidfVectorCrime, classVectors[1].tfidf);

      data.cosWomen = cosWomen;
      data.cosCrime = cosCrime;

      data.result = cosWomen > cosCrime ? "WOMEN" : "CRIME";
    }

    res.render('test', data);
  });

});

getData = function() {
  let classVectors = [];

  return new Promise(resolve => {
    trainingSetCtrl.getTrainingSetByCategory("WOMEN", function(response) {
      preprocessingCtrl.process(response).then(function(docObj) {
        preprocessingCtrl.classVector(docObj).then(v => {
          classVectors.push(v);
          trainingSetCtrl.getTrainingSetByCategory("CRIME", function(response) {
            preprocessingCtrl.process(response).then(function(docObj) {
              preprocessingCtrl.classVector(docObj).then(v => {
                classVectors.push(v);
                resolve(classVectors);
              });
            });
          });
        });
      });
    });
  });
}

module.exports = router;
