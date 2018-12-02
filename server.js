/* global DB, winston, express */

global.express = require('express');
var bodyParser = require('body-parser');
var app = global.express();
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

var mongoose = require('mongoose');
global.winston = require('winston');
var api = require('./api');

// Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/Business';
mongoose.connect(mongoDB);
global.DB = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
DB.on('error', winston.error.bind(console, 'MongoDB connection error:'));
DB.once('open', function onOpen() {
  winston.info('MongoDB connected!');
});


//* mounting the api
app.use('/api', api);


app.listen(3000, function onListen() {
  winston.info('Microservice listening on port 3000...');
});
