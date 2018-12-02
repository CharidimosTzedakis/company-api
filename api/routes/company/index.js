/* global DB, winston, express */
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
  var newId = uuidv1();
  // var newId = new mongoose.mongo.ObjectId(uuidv1());
  var  companyDocument = {
    _id: newId,
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
router.patch('/:id', function handle(req, res) {
  // TODO: validation of input - body in specific format
  var companyId = req.params.id;
  Company.findById(companyId, function findResult(findErr, company) {
    if (findErr) {
      winston.info('PATCH /api/company: Error while fetching company from DB ' + findErr);
      res.status(500).send('Error while updating.');
    } else if (company) {
      var displayName = req.body.displayName;
      var name = displayName.toLowerCase();
      var workspaces = req.body.workspaces;
      var workspacesWithId = workspaces.map(function map(w) {
        var _id = uuidv1();
        return Object.assign(w, { _id,  name: w.displayName.toLowerCase() } );
      });

      //* update document
      if (displayName) {
        company.displayName = displayName;
        company.name = name;
      }
      if (workspaces) {
        company.workspaces = workspacesWithId;
      }
      company.save(function onSave(saveErr, updatedCompany) {
        if (saveErr) res.status(400).send({ error: saveErr });
        winston.info('PATCH /api/company: Sucessfully updated: ' + updatedCompany);
        res.send();
      });
    } else {
      winston.info('PATCH /api/company: Company not found with id: ' + companyId);
      res.status(404).send('PATCH /api/company: company not found.');
    }
  });
});

module.exports = router;
