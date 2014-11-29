/*
 * Route functions.
 */
var path = require('path')
var fs = require('fs');
var faker = require('faker');
var activityModel = require('../models/activityModel').createModel();
var stats = require('../lib/stats');

module.exports = function(app) {

  // API Routes

  app.get( '/api/user', function(req, res)  {
    // Generate some dummy data for a user
    var user = {
      "name": faker.name.findName(),
      "city": faker.address.city(),
      "country": faker.address.country(),
      "address": faker.address.streetAddress(),
      "avatar": faker.internet.avatar(),
      "email": faker.internet.email(),
      "member_since": faker.date.recent()
    }
    res.send(user);
  });

  app.get( '/api/stats', function(req, res)  {
    stats(function(err, result) {
      if(err) res.send(500);
      console.log('result', result)
      res.send(result);
    });
  });

  app.get( '/api/activities', function(req, res)  {
    activityModel.find(function(err, activities) {
      if(err) res.send(500);
      res.send(activities);
    });
  });

  app.get( '/api/activities/:id', function(req, res)  {
    activityModel.findOne({ activityID: req.params.id }, function(err, activity) {
      if(err) res.send(500);
      res.send(activity);
    });
  });

  app.get( '/api/map/:id', function(req, res)  {
    // filepath is relative to the app.js
    var filepath = './dataset/activity_' + req.params.id + '.gpx';
    fs.createReadStream(filepath).pipe(res);
  });

  // Front-end Route
  app.get('/', function(req, res) {
    res.sendfile('public/index.html'); // load our public/index.html file
  });

}
