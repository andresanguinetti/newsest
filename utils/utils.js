module.exports.sumVector = function (vectorArr) {
    var aResult = new Array(vectorArr[0].length).fill(0);


    vectorArr.forEach(function(vector, idx, arr) {
      vector.forEach(function(val, idx, arr) {
        aResult[idx] += val;
      });
    });

    return aResult;
};

module.exports.top = function (arrayTerms, n) {

  arrayTerms = arrayTerms.sort(function(a,b) {
    return b.value - a.value;
  });

  return arrayTerms.slice(0,n);
};
