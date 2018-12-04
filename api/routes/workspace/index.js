/* global DB, winston, express */
'use strict';

var router = global.express.Router();
var uuidv1 = require('uuid/v1');
var Company = require('../../../db/models/company');
var Ajv = require('ajv');
var workspaceJSONSchema = require('./workspaceApiSchemas').workspaceJSONSchema;
var workspaceWithIdJSONSchema = require('./workspaceApiSchemas').workspaceWithIdJSONSchema;

// ** create a new workspace entry within a specific company */
router.post('/:companyName', function handle(req, res) {
  //* validation of json data inside req body
  var ajv = new Ajv({allErrors: true});

  var validate = ajv.compile(workspaceJSONSchema);
  var valid = validate(req.body);
  if (!valid) {
    res.status(400).send('Invalid request body.');
    return;
  }

  var companyName = req.params.companyName;
  Company.findOne({name: companyName}, function findResult(findErr, company) {
    if (findErr) {
      winston.error('POST /api/workspace/: Error while fetching company from DB ' + findErr);
      res.status(500).send('Error while creating workspace.');
    } else if (company) {
      var displayNameWorkspace = req.body.displayName;
      var workspaceName = displayNameWorkspace.toLowerCase();
      var users = req.body.users;

      var newWorkspaceWithId = {
        _id: uuidv1(),
        displayName: displayNameWorkspace,
        name: workspaceName,
        users
      };

      //* update document
      if (displayNameWorkspace) {
        company.workspaces.push(newWorkspaceWithId);
      }

      company.save( function onSave(saveErr, updatedCompany) {
        if (saveErr) {
          winston.error('POST /api/workspace: Error while creating workspace: ' + saveErr);
          res.status(400).send({ error: saveErr });
        }
        winston.info('POST /api/workspace: Sucessfully created workspace: ' + updatedCompany);
        res.status(201).send();
      });
    } else {
      winston.info('POST /api/company: Company not found with id: ' + companyId);
      res.status(404).send('PATCH /api/company: company not found.');
    }
  });
});

// ** update an existing workspace within a company */
router.patch('/:companyName', function handle(req, res) {
  //* validation of json data inside req body
  var ajv = new Ajv({allErrors: true});

  var validate = ajv.compile(workspaceWithIdJSONSchema);
  var valid = validate(req.body);
  if (!valid) {
    res.status(400).send('Invalid request body.');
    return;
  }

  var companyName = req.params.companyName;
  Company.findOne({name: companyName}, function findResult(findErr, company) {
    if (findErr) {
      winston.error('PATCH /api/workspace/: Error while fetching company from DB ' + findErr);
      res.status(500).send('Error while creating workspace.');
    } else if (company) {
      var workspaceId = req.body.id;
      var displayNameWorkspace = req.body.displayName;
      var workspaceName = displayNameWorkspace.toLowerCase();
      var users = req.body.users;

      //* updating document
      var workspaceToUpdate = company.workspaces.find(function find(w) {
        if (w._id === workspaceId) return true;
        return false;
      });
      if (workspaceToUpdate) {
        workspaceToUpdate.displayName = displayNameWorkspace;
        workspaceToUpdate.name = workspaceName;
        workspaceToUpdate.users = users;

        company.save(function onSave(saveErr, updatedCompany) {
          if (saveErr) {
            winston.error('POST /api/workspace: Error while creating workspace: ' + saveErr);
            res.status(400).send({ error: saveErr });
          }
          winston.info('POST /api/workspace: Sucessfully created workspace: ' + updatedCompany);
          res.status(200).send();
        });
      } else {
        winston.info('PATCH /api/workspace: Workspace not found within the specific company. ');
        res.status(404).send();
      }
    } else {
      winston.info('POST /api/company: Company not found with id: ' + companyId);
      res.status(404).send('PATCH /api/company: company not found.');
    }
  });
});

module.exports = router;
