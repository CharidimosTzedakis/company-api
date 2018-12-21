/* global DB, winston, express */
'use strict';

var router = global.express.Router();
var Company = require('../../../db/models/company');
var companyFunc = require('./companyFunctions');

// ** create a new company entry */
var newCompanyReqBodyValidator = companyFunc.createValidator('newCompany');
router.post('/', newCompanyReqBodyValidator, companyFunc.createCompany );

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
        if (saveErr) next(saveErr);
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


//* error handler
router.use( fucntion (err, req, res) {

});

module.exports = router;
