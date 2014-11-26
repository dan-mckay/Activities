/**
 * Express Server
 */
var express = require('express');
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
  app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 						// log every request to the console
	app.use(express.bodyParser()); 							// pull information from html in POST
	app.use(express.methodOverride());

  // development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }

  // Route definitions
  var routes = require('./routes')(app);

  http.createServer(app).listen(app.get('port'), function() {
    console.log('------------------ Express server listening on port ' + app.get('port'));
  });

}
