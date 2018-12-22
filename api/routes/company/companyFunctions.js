
/* global DB, winston, express */
'use strict';

var uuidv1 = require('uuid/v1');
var CompanyModel = require('../../../db/models/company');
var Ajv = require('ajv');
var companySchemas = require('./companyApiSchemas');

function createCompany(req, res, next, Company = CompanyModel) {
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
  return companyDocument;
}

function validatorFactory(validatorType) {
  var ajv = new Ajv({allErrors: true});

  switch (validatorType) {
  case 'newCompany':
    var newValidator = ajv.compile(companySchemas.newCompanyJSONSchema);
    return function newCompanyValidator(req, res, next) {
      if (newValidator(req.body)) {
        next();
      } else {
        res.status(400).send('Invalid request body.');
      }
    };
  case 'updateCompany':
    var updateValidator = ajv.compile(companySchemas.updateCompanyJSONSchema);
    return function updateCompanyValidator(req, res, next) {
      if (updateValidator(req.body)) {
        next();
      } else {
        res.status(400).send('Invalid request body.');
      }
    };
  default:
    return function dummyValidator() {return true; };
  }
}

module.exports = {
  createCompany,
  validatorFactory
};

