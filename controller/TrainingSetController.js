var connectionOptions = require('../database/config').getConnectionOptions();
var mysql = require('mysql');

exports.getTrainingSet = function(result) {
  var connection = mysql.createConnection(connectionOptions);

  connection.connect();

  connection.query("SELECT * from training_set", function (err, rows, fields) {
    if (err) {
      result(err);
    } else {
      result(rows);
    }
  });

  connection.end();
}

exports.getTrainingSetByCategory = function(category, result) {
  var connection = mysql.createConnection(connectionOptions);

  connection.connect();

  connection.query("SELECT * from training_set WHERE category = ?", [category], function (err, rows, fields) {
    if (err) {
      result(err);
    } else {
      result(rows);
    }
  });

  connection.end();
}
