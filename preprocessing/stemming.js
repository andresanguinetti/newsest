var stemmer = require('stemmer');

/**
 * Returns the words of a given text, in its radical form
 */
exports.normalize = function(text) {

  let textArr = text.split(" ");

  textArr.forEach(function(t) {
    t = stemmer(t);
  })

  return textArr;
}
