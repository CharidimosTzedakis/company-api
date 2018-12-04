/* global DB, winston, express */
'use strict';

var router = global.express.Router();
var Company = require('../../../db/models/company');
var Ajv = require('ajv');
var createUserJSONSchema = require('./userApiSchemas').createUserJSONSchema;


// ** create a new user entry for a specific workspace*/
router.post('/:companyName', function handle(req, res) {
  //* validation of json data inside req body
  var ajv = new Ajv({allErrors: true});

  var validate = ajv.compile(createUserJSONSchema);
  var valid = validate(req.body);
  if (!valid) {
    res.status(400).send('Invalid request body.');
    return;
  }

  var companyName = req.params.companyName;
  Company.findOne({name: companyName}, function findResult(findErr, company) {
    if (findErr) {
      winston.info('POST /api/user: Error while fetching company from DB ' + findErr);
      res.status(500).send('Error while updating.');
    } else if (company) {
      var newUser = req.body.user;
      var workspaceName = req.body.workspaceName;

      //* updating document
      var workspaceToAddUser = company.workspaces.find(function find(w) {
        if (w.name === workspaceName) return true;
        return false;
      });
      if (workspaceToAddUser) {
        workspaceToAddUser.users.push(newUser);
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
router.delete('/:companyName', function handle(req, res) {
  //* validation of json data inside req body
  var ajv = new Ajv({allErrors: true});

  var validate = ajv.compile(createUserJSONSchema);
  var valid = validate(req.body);
  if (!valid) {
    res.status(400).send('Invalid request body.');
    return;
  }

  var companyName = req.params.companyName;

});

module.exports = router;
