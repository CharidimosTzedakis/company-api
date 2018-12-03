/* global app, request, testDB,  Company, mongoose */

describe('Company API Routes', function companyRouteTests() {
  before(function dropCollection(done) {
    Company.deleteMany({}, function removeResult(err, result) {
      if (err) {
        console.log(err);
        throw new Error('Error while initializing test DB - aborting.');
      }
      console.log(result);
      done();
    });
  });

  // initialize datavase for the tests
  before(function initTestDB(done) {
    var  companyDocument = {
      _id: 'e5c6bf62-f634-11e8-9814-619f28a0ac11',
      displayName: 'UnifyAthens',
      name: 'unifyathens',
      workspaces: [
        {
          displayName: 'UnifyAthens',
          users: [
            { email: 'charidimos.jedakis@gmail.com', role: 'admin'},
            { email: 'har_manis@hotmail.com', role: 'basic'}
          ]
        }
      ]
    };
    Company.create(companyDocument, function result(errCreate, createdCompany) {
      if (errCreate) {
        console.log(errCreate);
        throw new Error('Error while inserting dummy data to test DB - aborting.');
      }
      done();
    });
  });

  describe('POST /company', function createCompanyTest() {
    it('creates a new company', function done(done) {
      request.post('/company')
        .send({
          displayName: 'Xara',
          workspaces: [
            {
              displayName: 'XaraLondon',
              users: [
                { email: 'harris.jedakis@gmail.com', role: 'admin'},
                { email: 'har_manis@hotmail.com', role: 'basic'}
              ]
            },
            {
              displayName: 'XaraBerlin',
              users: [
                { email: 'harris.jedakis@gmail.com', role: 'admin'},
                { email: 'har_manis@hotmail.com', role: 'basic'}
              ]
            }
          ]
        })
        .expect(201)
        .end(function end(err, res) {
          done(err);
        });
    });
  });

  describe('PATCH /company', function createCompanyTest() {
    it('updates an existing company', function done(done) {
      request.patch('/company/e5c6bf62-f634-11e8-9814-619f28a0ac11')
        .send({
          displayName: 'ATOS',
          workspaces: [
            {
              displayName: 'ATOSAthens',
              users: [
                { email: 'charidimos.jedakis@gmail.com', role: 'admin'},
                { email: 'har_manis@hotmail.com', role: 'basic'}
              ]
            },
            {
              displayName: 'ATOSBrussels',
              users: [
                {email: 'charis.jedakis@gmail.com', role: 'admin'},
                {email: 'har_manis@hotmail.com', role: 'basic'}
              ]
            }
          ]
        })
        .expect(200)
        .end(function end(err, res) {
          done(err);
        });
    });
  });
});
