global.express = require('express');
var app = global.express();
var mongoose = require('mongoose');
var api = require('./api');

// Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
// mongoose.Promise = global.Promise;
// Get the default connection
global.DB = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
DB.on('error', console.error.bind(console, 'MongoDB connection error:'));
DB.once('open', function () {
    console.log('MongoDB connected!');
  });


//* mounting the api
app.use('/api', api);


app.listen(3000, function () {
  console.log('Microservice listening on port 3000!');
});
