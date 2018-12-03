/* global DB, winston, express */
'use strict';

var router = global.express.Router();
var uuidv1 = require('uuid/v1');
var Company = require('../../../db/models/company');


// ** create a new user entry for a specific workspace*/
router.post('/:workspaceId', function handle(req, res) {
  // TODO: validation of input - body in specific format
  var workspaceId = req.params.workspaceId;
  // TODO: find company by using workspace id
  Company.findById(companyId, function findResult(findErr, companyWithWorkspace) {
    if (findErr) {
      winston.info('POST /api/user: Error while fetching company from DB ' + findErr);
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

// ** remove an existing user from a specific workspace */
router.delete('/:workspaceId', function handle(req, res) {
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
