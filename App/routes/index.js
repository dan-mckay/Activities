/*
 * Route functions.
 */
var activityModel = require('../models/activityModel').createModel();

module.exports = {

  index: function(req, res) {
    res.render('index', { title: 'Index' });
  },

  stats: function(req, res) {
    res.render('index', { title: 'Stats' });
  },

  allActivities: function(req, res) {
    activityModel.find(function(err, activities) {
      res.send(activities);
    });
  },

  activity: function(req, res) {
    activityModel.findOne({ activityID: req.params.id }, function(err, activity) {
      if(err) res.send(500);
      res.send(activity);
    })
  }

}