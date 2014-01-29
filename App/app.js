
/**
 * Main application configuration and server
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
// Connect to mongodb
var dbConnection = require('./models/connection.js');

// This function connects to our mongodb instance. Will only start app upon connection
dbConnection(function(err, result) {
  if(err) {
    console.log('Error: ', err);
  }
  else {
    console.log('------------------', result);
    initiateApp();
  }
});

// Function called in callback on successful db connection
function initiateApp() {
  console.log('------------------ Initiating app...')
  var app = express();

  // all environments
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  // development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }

  // Route definitions
  app.get('/', routes.index);
  app.get('/stats', routes.stats);
  app.get('/activity/:id', routes.activity);
  app.get('/list', routes.allActivities);

  http.createServer(app).listen(app.get('port'), function() {
    console.log('------------------ Express server listening on port ' + app.get('port'));
  });

}