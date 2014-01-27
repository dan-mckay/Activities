/*
 * Database connection logic - called in app.js
 */
var credentials = require('../lib/credentials.js');     // This file is not in the repo for security purposes.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(callback) {
  // Call function to build the connection string using your credentials.
  mongoose.connect(buildConnectString());

  var db = mongoose.connection;
  db.on('error', function() {
    return callback(error, null);
  });
  db.once('open', function() {
    var result = 'Connected to the database'
    return callback(null, result);
  });
}

function buildConnectString() {
  var username = credentials.username;
  var password = credentials.password;
  var host = credentials.host;
  var port = credentials.port;
  var dbname = credentials.dbname;
  return 'mongodb://' + username + ':' + password + '@' + host + ':' + port + '/' + dbname;
}