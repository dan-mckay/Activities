/*
 * Parse the csv file and populate the database
 */
var fs = require('fs');
var csv = require('csv');
var activityModel = require('../models/activityModel');

module.exports = function(callback) {

  csv()
  .from('../Dataset/activities.csv', { delimiter: ',', escape: '"' })
  .to.array(function(data) {
    console.log(data)
  })
  .on('record', function(row, index) {
    
  })
  .to('../Dataset/activities.json')
  .on('close', function(count){
    // when writing to a file, use the 'close' event
    // the 'end' event may fire before the file has been written
    console.log(records)
    console.log('Number of lines: '+count);
    return callback(null, "done");
  })
  .on('error', function(error){
    console.log(error.message);
    return callback(error, null)
  });
}
