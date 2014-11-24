/*
 * Route functions.
 */
var path = require('path')
var fs = require('fs');
var activityModel = require('../models/activityModel').createModel();
var stats = require('../config/stats');

module.exports = function(app) {

  // API Routes

  // app.get( '/', function(req, res)  {
  //   //res.render('index', { title: 'Activities App' });
  //   res.sendfile('public/index.html');
  // });

  app.get( '/stats', function(req, res)  {
    stats(function(err, result) {
      if(err) res.send(500);
      console.log('result', result)
      res.send(result);
    });
  });

  app.get( '/list', function(req, res)  {
    activityModel.find(function(err, activities) {
      if(err) res.send(500);
      res.send(activities);
    });
  });

  app.get( '/activity/:id', function(req, res)  {
    activityModel.findOne({ activityID: req.params.id }, function(err, activity) {
      if(err) res.send(500);
      res.send(activity);
    });
  });

  app.get( '/map/:id', function(req, res)  {
    // filepath is relative to the app.js
    var filepath = './dataset/activity_' + req.params.id + '.gpx';
    fs.createReadStream(filepath).pipe(res);
  });

  // Front-end Route
  app.get('*', function(req, res) {
    res.sendfile('public/index.html'); // load our public/index.html file
  });

}
