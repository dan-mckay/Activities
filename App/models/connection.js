/*
 * Database connection and population - called in app.js
 */
var credentials = require('../config/credentials.js');     // This file is not in the repo for security purposes.
//var populate = require('../config/populate.js'); 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(callback) {
  // Call function to build the connection string using your credentials.
  mongoose.connect(buildConnectString());
  var connect = mongoose.connection;
  connect.on('error', function() {
    return callback(error, null);
  });

  connect.once('open', function() {
    var result = 'Connected to the database';
    // Check to see if there is a valid collection in the db
    connect.db.collectionNames(function(error, names) {
      if(error) {
        return callback(error, null);
      }
      // are there are any collection names returned? 
      if(names.length != 0) {
        for (var i = 0; i < names.length; i++) {
          //check they are not system collections
          if(names[i].name.indexOf("system") == -1) {
            // TODO populate the database from csv file
            populateDatabase(function(err, res) {
              result = res;
            });
            
          }
        }
        return callback(null, result);
      }
    });
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

function populateDatabase(callback) {
  
  return callback(null, 'Connected to and populated the database');
}