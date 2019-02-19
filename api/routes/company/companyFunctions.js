
/* global DB, winston, express */
'use strict';

var uuidv1 = require('uuid/v1');
var Ajv = require('ajv');
var companySchemas = require('./companyApiSchemas');

/** Creates validator func for JSON input in the body of request
 *  for creating new Company and updating existing
 * @param {'newCompany' | 'updateCompany'} validatorType - type of validation (new or update)
 * @returns{function} - validator function to be used with Ajv
 */
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

/**
 * Takes the Validated input and creates a Company Object to be persited to DB
 * @param {Object} req - express middleware req obj
 * @param {Object} res - express middleware res obj
 * @param {function} next - express middleware next function
 * @returns {Object} - return invokes next()
 */
function createCompany(req, res, next) {
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

  res.locals.companyDocument = companyDocument;
  return next();
}

/**
 * Persist company document to DB
 * @param {Object} options - configure middleware:
 * options.mode -> 'create' --> create a new Company Document
 * options.mode -> 'save' --> update specific Company Document
 * @param {Object} Model - Company Model for accessing the DB
 * @returns {Object} - responds with 201 CREATED or 500 status
 */
function persistToDBAndRespond({mode, Model}) {
  return function persistRespond(req, res) {
    switch (mode) {
    case 'create':
      Model.create(res.locals.companyDocument, function result(errCreate, createdCompany) {
        if (errCreate) {
          winston.info('POST /api/company: Error while creating company document ' + errCreate);
          return res.status(500).send('Error while creating company entry.');
        }
        winston.info('PATCH /api/company: Sucessfully created company: ' + createdCompany);
        return res.status(201).send();
      });
      break;
    default:
      return;
    }
  };
}

module.exports = {
  createCompany,
  validatorFactory,
  persistToDBAndRespond
};

