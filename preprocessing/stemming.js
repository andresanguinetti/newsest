var stemmer = require('stemmer');

exports.normalize = function(text) {

  let textArr = text.split(" ");

  textArr.forEach(function(t) {
    t = stemmer(t);
  })

  return textArr;
}
