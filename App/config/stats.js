/*
 * Function to query database for stats.
 */
var async = require('async');
var activityModel = require('../models/activityModel').createModel();

module.exports = function(callback) {
  // Use the async module to organise the callbacks in sequence
  async.series({

    activityCount: function(cb) {
      activityModel.count(function(err, result) {
        if(err) { 
          return callback(err, null);
        }
        cb(null, result);
      });
    },

    prefActivity: function(cb){
      activityModel.mapReduce(prefMapReduce, function(err, result) {
        if(err) { 
          return callback(err, null);
        }
        cb(null, result);
      });
    },

    avgMovingSpeed: function(cb) {
      activityModel.aggregate( { $group: { _id: "$activityType", avMovSpeed: { $avg: "$aveMovingSpeedRaw" } } }, function (err, result) {
        if(err) { 
          return callback(err, null);
        }
        cb(null, result);
      });
    },

    avgHeartBeat: function(cb) {
      activityModel.aggregate( { $group: { _id: "$activityType", aveHeartRate: { $avg: "$aveHeartRate" } } }, function (err, result) {
        if(err) { 
          return callback(err, null);
        }
        cb(null, result);
      });
    },

    maxSpeed: function(cb) {
      activityModel.aggregate( { $group: { _id: "$activityType", maxSpeed: { $max: "$maxSpeedRaw" } } }, function (err, result) {
        if(err) { 
          return callback(err, null);
        }
        cb(null, result);
      });
    },

    calsBurned: function(cb) {
      activityModel.aggregate( { $group: { _id: "$activityType", calsBurned: { $sum: "$caloriesRaw" } } }, function (err, result) {
        if(err) { 
          return callback(err, null);
        }
        cb(null, result);
      });
    },

    totalTime: function(cb) {
      activityModel.aggregate( { $group: { _id: "$activityType", totalTime: { $sum: "$durationRaw" } } }, function (err, result) {
        if(err) { 
          return callback(err, null);
        }
        cb(null, result);
      });
    },

    totalTimeMoving: function(cb) {
      activityModel.aggregate( { $group: { _id: "$activityType", totalTimeMoving: { $sum: "$movingDurationRaw" } } }, function (err, result) {
        if(err) { 
          return callback(err, null);
        }
        cb(null, result);
      });
    },

    totalDistCovered: function(cb) {
      activityModel.aggregate( { $group: { _id: "$activityType", totalDistCovered: { $sum: "$distanceRaw" } } }, function (err, result) {
        if(err) { 
          return callback(err, null);
        }
        cb(null, result);
      });
    },

  },
  function(err, results) {
    if(err) { 
      return callback(err, null);
    }
    return callback(null, results);
  });

}

// These functions group the data by activity type and return the freq. for each
var prefMapReduce = {
  map: function() {
    emit(this.activityType, 1);
  },
  reduce: function(key, values) {
    var count = 0;    
    values.forEach(function(v) {            
        count +=v;    
    });
    return count;
  }
}
