process.env.NODE_ENV = 'test';

var supertest = require('supertest');
var chai = require('chai');
var uuid = require('uuid/v1');
var app = require('../server.js');
var Company = require('../db/models/company');
var uuidv1 = require('uuid/v1');

global.app = app;
global.uuid = uuid;
global.expect = chai.expect;
global.request = supertest(app);
global.Company = Company;
global.uuidv1 = uuidv1;
