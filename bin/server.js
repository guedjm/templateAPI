var log = require('debug')('v2:log');
var err = require('debug')('v2:error');
var debug = require('debug')('v2:debug');
var config = require('../config.js');

/**
 * Initialise database connection
 */
log('Connecting to database ...');
var mongoose = require('mongoose');
mongoose.connection.on('open', function() {
  log('Database connection success');
});
mongoose.connection.on('error', function(err) {
  err('Database onnection failed : ' + err);
  err('Stopping program .. ');
  process.exit(1);
});
mongoose.connect('mongodb://' + config.db.server + ':' + config.db.port + '/' + config.db.database);


/**
 * Initialise API
 */
log('Initialising api ...');
var app = require('../app/app.js');


/**
 * Initialise http server
 */
log('Initializing http server ...');
var http = require('http');
app.set('port', config.http.port);
var httpServer = http.createServer(app);
httpServer.on('error', onError);
httpServer.on('listening', onListening);
httpServer.listen(config.http.port);


function onListening()
{
  var addr = httpServer.address();
  log('Api started on port ' + addr.port);
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = 'Port ' + config.http.port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      err(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      err(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}


