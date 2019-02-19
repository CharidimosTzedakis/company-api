/* global expect */

var sinon = require('sinon');
var companyFunctions = require('../api/routes/company/companyFunctions');

describe('companyFunctions.js', function CompanyFunctionsUnitTests() {

  describe('validatorFactory', function validatorFactoryUnitTests() {
    it('should create validator that accepts a valid new company JSON', function done() {
    });
    it('should create validator that rejects a invalid new company JSON', function done() {
    });
    it('should create validator that accepts a valid update company JSON', function done() {
    });
    it('should create validator that rejects an invalid update company JSON', function done() {
    });
  });

  describe('createCompany', function createCompanyUnitTests() {
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
      expect(companyDocument.name).to.be.equal(req.body.displayName.toLowerCase());
      done();
    });
  });

  describe('persistToDBAndRespond', function persistToDBAndRespondUnitTests() {
    it('should respond with 201 CREATED when successfully created new Company Document', function done() {
    });
    it('should respond with 500 when failing to create new Company Document', function done() {
    });
    it('should respond with 200 OK when successfully updated new Company Document', function done() {
    });
    it('should respond with 500 when failing to update new Company Document', function done() {
    });
  });
});
