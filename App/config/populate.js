/*
 * Parse the csv file and populate the database
 */
var fs = require('fs');
var csv = require('csv');
var activityModel = require('../models/activityModel');

// returns an array of schema keys to replace the column titles from the csv file
var keys = Object.keys(activityModel.getSchema().paths);

module.exports = function(callback) {
  csv()
  .from('../Dataset/activities.csv', { 
    delimiter: ',',
    escape: '"'
  })
  .on('record', function(row, index) {
    // We don't want to save the 1st row (old column titles)
    if(index !== 0) {
      // Save the individual document to the database
      var activity = new activityModel.createModel()(constructDocumentObject(row)).save();
    }
  })
  .on('end', function(count){
    console.log('Number of records: ' + count);
    return callback(null, "finished populating the database");
  })
  .on('error', function(error){
    console.log(error.message);
    return callback(error, null);
  });
}

// Add our schema keys to their associated values from parsed csv row
function constructDocumentObject(row) {
  var obj = {};
  for (var i = 0; i < row.length; i++) {
    obj[keys[i]] = row[i];
  };
  return obj;
} 