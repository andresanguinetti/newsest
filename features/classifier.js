var preprocessingCtrl = require('../controller/PreprocessingController');

var stopwords = require('../preprocessing/stopwords');
var tokenization = require('../preprocessing/tokenization');
var stemming = require('../preprocessing/stemming');

var bagOfWords = require('../features/bagOfWords');

exports.cossineSimilarity = function(text, classVectors) {
  // Process text
  text = text.toLowerCase();

  var sw = stopwords.removeStopwords(text);
  var cleanText = tokenization.clean(sw.join(" "));

  //Remove single characters
  cleanText = cleanText.replace(/ [^ ](?= )/g, '');

  let terms = stemming.normalize(cleanText).join(" ");

  // Binary vector with bag of words
  let binaryVectorWomen = bagOfWords.binaryVector(classVectors[0].bagofwords, terms.split(" "));
  let binaryVectorCrime = bagOfWords.binaryVector(classVectors[1].bagofwords, terms.split(" "));

  let tfVectorWomen = bagOfWords.tfVector(classVectors[0].bagofwords, terms.split(" "));
  let tfVectorCrime = bagOfWords.tfVector(classVectors[1].bagofwords, terms.split(" "));

  let tfidfVectorWomen = [];
  let tfidfVectorCrime = [];

  tfVectorWomen.forEach(function(word, idx, arr) {
    tfidfVectorWomen.push(word * classVectors[0].tfidf[idx]);
  });

  tfVectorCrime.forEach(function(word, idx, arr) {
    tfidfVectorCrime.push(word * classVectors[1].tfidf[idx]);
  });

  let result = {
    tfidfVectorWomen: tfidfVectorWomen,
    tfidfVectorCrime: tfidfVectorCrime
  }

  return result;
}

exports.calculateCosineSimilarity = function(vector1, vector2) {

  let sumA = 0;
  let sumB = 0;
  let sumC = 0;

  vector1.forEach(function(v, idx, arr) {
      sumA += v * vector2[idx];
      sumB += v * v
      sumC += vector2[idx] * vector2[idx];
  });

  return sumA / (Math.sqrt(sumB) * Math.sqrt(sumC));

}
