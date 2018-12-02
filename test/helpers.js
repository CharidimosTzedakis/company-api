process.env.NODE_ENV = 'test';

var supertest = require('supertest');
var chai = require('chai');
var uuid = require('uuid/v1');
var app = require('../server.js');
var mongoose = require('mongoose');
var Company = require('../db/models/company');

global.app = app;
global.uuid = uuid;
global.expect = chai.expect;
global.request = supertest(app);
global.mongoose = mongoose;
global.Company = Company;

// Set up mongoose connection for test DB
var mongoDB = 'mongodb://127.0.0.1/BusinessTest';
mongoose.connect(mongoDB);
global.testDB = mongoose.connection;
