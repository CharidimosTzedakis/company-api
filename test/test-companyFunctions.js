/* global expect */

var sinon = require('sinon');
var companyFunctions = require('../api/routes/company/companyFunctions');

describe('companyFunctions.js', function CompanyFunctionsUnitTests() {
  describe('createCompany()', function createCompanyUnitTests() {
    it('should prepare a company document to be written to database', function done(done) {
      var req = {
        body: {
          displayName: 'Unify',
          'workspaces': [
            {
              displayName: 'UnifyAthens',
              users: [
                {email: 'harris.jedakis@gmail.com', role: 'admin'},
                {email: 'har_manis@hotmail.com', role: 'basic'}
              ]
            },
            {
              displayName: 'UnifyBrussels',
              users: [
                {email: 'harris.jedakis@gmail.com', role: 'admin'},
                {email: 'har_manis@hotmail.com', role: 'basic'}
              ]
            }
          ]
        }
      };

      var res = {
        locals: {}
      };
      var next = function next() {};
      /*
      var company = {
        create: sinon.fake.yieldsAsync(null, createdCompany)
      };*/
      companyFunctions.createCompany(req, res, next);
      var companyDocument = res.locals.companyDocument;
      expect(companyDocument).to.have.property('_id');
      expect(companyDocument).to.have.property('displayName');
      expect(companyDocument).to.have.property('name');
      expect(companyDocument).to.have.property('workspaces');
      expect(companyDocument.name).to.be.equal(req.displayName.toLowerCase());
      done();
    });
  });
});
