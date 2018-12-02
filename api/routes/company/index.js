'use strict';

var router = global.express.Router();
var uuidv1 = require('uuid/v1');
var mongoose = require('mongoose');
var Company = require('../../../db/models/company');


// ** create a new company entry */
router.post('/', function handle(req, res) {

  // TODO: validation of input - body in specific format
  var displayName = req.body.displayName;
  var name = displayName.toLowerCase();
  var workspaces = req.body.workspaces;
  var workspacesWithId = workspaces.map(function map(w) {
    var _id = uuidv1();
    return Object.assign(w, { _id,  name: w.displayName.toLowerCase() } );
  });
  //* RFC4122 version 1 UUID
  var testId = uuidv1();
  // var newId = new mongoose.mongo.ObjectId(uuidv1());
  var  companyDocument = {
    _id: testId,
    displayName,
    name,
    workspaces: workspacesWithId
  };
  try {
    Company.create(companyDocument, function result(err, results) {
      console.log(results);
      if (err) {
        console.log(err);
      }
    });
  } catch (error) {
    console.error(error);
  }
  res.send('Hello World!');
});


// ** update an existing company */
router.patch('/', function handle(req, res) {
  var test;
  // DB.newCompany();
  //* RFC4122 version 1 UUID
  var NewId = new mongoose.mongo.ObjectId('56cb91bdc3464f14678934ca');
  res.send('Hello World!');
});

module.exports = router;
