/*
 * Route functions.
 */
var activityModel = require('../models/activityModel').createModel();
var stats = require('../config/stats');

module.exports = {

  index: function(req, res) {
    res.render('index', { title: 'Index' });
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
  }

}