/*
 * Route functions.
 */
var fs = require('fs');
var activityModel = require('../models/activityModel').createModel();
var stats = require('../config/stats');

module.exports = {

  index: function(req, res) {
    //res.render('index', { title: 'Activities App' });
    res.sendfile('public/index.html');
  },

  stats: function(req, res) {
    stats(function(err, result) {
      if(err) res.send(500);
      console.log('result', result)
      res.send(result);
    });
  },

  allActivities: function(req, res) {
    activityModel.find(function(err, activities) {
      if(err) res.send(500);
      res.send(activities);
    });
  },

  activity: function(req, res) {
    activityModel.findOne({ activityID: req.params.id }, function(err, activity) {
      if(err) res.send(500);
      res.send(activity);
    });
  }, 

  map: function(req, res) {
    var filepath = '../Dataset/activity_' + req.params.id + '.gpx';
    fs.createReadStream(filepath).pipe(res);
  }

}