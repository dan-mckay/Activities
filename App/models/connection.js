/*
 * Database connection and population - called in app.js
 */
var credentials = require('../config/credentials.js');     // This file is not in the repo for security purposes.
var populateDB = require('../config/populate.js'); 
var mongoose = require('mongoose');
// The name of the collection in our database used for this application
var APP_COLLECTION = "activities.activities";

module.exports = function(callback) {
  // Call function to build the connection string using your credentials.
  mongoose.connect(buildConnectString());
  var connect = mongoose.connection;
  connect.on('error', function() {
    return callback(error, null);
  });

  // Open the connection to mongodb database
  connect.once('open', function() {
    var result = 'Connected to the database';
    // Get the names of each collection in the database
    connect.db.collectionNames(function(error, names) {
      if(error) {
        return callback(error, null);
      }
      // If the collection for this application is not present, 
      // parse the CSV file and populate the database.
      if(!checkForData(names)) {
        result = "Connected to and populating the database";
        populateDB(function(err, res) {
          if(err) {
            return callback(err, null);
          }
          console.log(res) 
        });
      }
      return callback(null, result); 
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

// see if the database collection been created
function checkForData(arr) {
  for (var i = 0; i < arr.length; i++) {
    if(arr[i].name.indexOf(APP_COLLECTION) != -1) {
      return true;
    }
  }
  return false;
}