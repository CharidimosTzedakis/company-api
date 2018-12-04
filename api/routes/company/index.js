/* global DB, winston, express */
'use strict';

var router = global.express.Router();
var uuidv1 = require('uuid/v1');
var Company = require('../../../db/models/company');
var Ajv = require('ajv');
var newCompanyJSONSchema = require('./companyApiSchemas').newCompanyJSONSchema;
var updateCompanyJSONSchema = require('./companyApiSchemas').updateCompanyJSONSchema;

var ajv = new Ajv({allErrors: true});
var validateCreateCompany = ajv.compile(newCompanyJSONSchema);
var validateUpdateCompany = ajv.compile(updateCompanyJSONSchema);

// ** create a new company entry */
router.post('/', function handle(req, res) {
  //* validation of json data inside req body
  var valid = validateCreateCompany(req.body);
  if (!valid) {
    res.status(400).send('Invalid request body.');
    return;
  }

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

  Company.create(companyDocument, function result(errCreate, createdCompany) {
    if (errCreate) {
      winston.info('POST /api/company: Error while creating company document ' + errCreate);
      res.status(500).send('Error while creating company entry.');
    }
    winston.info('PATCH /api/company: Sucessfully created company: ' + createdCompany);
    res.status(201).send();
  });
});

// ** update an existing company */
router.patch('/:id', function handle(req, res) {
  //* validation of json data inside req body
  var valid = validateUpdateCompany(req.body);
  if (!valid) {
    res.status(400).send('Invalid request body.');
    return;
  }

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
