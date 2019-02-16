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
      // TODO: mock better res here
      var res = {
        status: function status() { return this;},
        send: function send() {}
      };
      var next = function next() {};
      var company = {
        create: sinon.fake.yieldsAsync(null, createdCompany)
      };
      var companyDocument = companyFunctions.createCompany(req, res, next, company);
      expect(companyDocument).to.have.property('_id');
      done();
    });
  });
});
