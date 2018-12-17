
/* global DB, winston, express */
'use strict';

var uuidv1 = require('uuid/v1');
var CompanyModel = require('../../../db/models/company');

var Ajv = require('ajv');
var ajv = new Ajv({allErrors: true});
var newCompanyJSONSchema = require('./companyApiSchemas').newCompanyJSONSchema;
var validateCreateCompany = ajv.compile(newCompanyJSONSchema);

function createCompany(req, res, next, Company = CompanyModel) {
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
}

module.exports = {
  createCompany
};

