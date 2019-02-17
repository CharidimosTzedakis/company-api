/* global DB, winston, express */

global.express = require('express');
var app = global.express();
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

var mongoose = require('mongoose');
global.winston = require('winston');
if (process.env.NODE_ENV === 'test') {
  winston.remove(winston.transports.Console);
}
var api = require('./api');

// Set up mongoose connection
var mongoDB;
if ( process.env.NODE_ENV === 'test') {
  mongoDB = 'mongodb://192.168.99.100/BusinessTest';
} else {
  mongoDB = 'mongodb://192.168.99.100/Business';
}
mongoose.connect(mongoDB);
global.DB = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)

DB.on('error', winston.error.bind(console, 'MongoDB connection error:'));
DB.once('open', function onOpen() {
  winston.info('MongoDB connected!');
});


//* mounting the api
app.use('/api', api);

app.listen(6000, function onListen() {
  winston.info('Microservice listening on port 6000...');
});

module.exports = app;
