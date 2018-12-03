/* global app, request, testDB,  Company, uuidv1 */

describe('Company API Routes', function companyRouteTests() {
  before(function dropCollection(done) {
    if ( process.env.NODE_ENV !== 'test') {
      throw new Error('Production env - abort!');
    }
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
      displayName: 'Unify',
      name: 'unify',
      workspaces: [
        {
          _id: uuidv1(),
          displayName: 'UnifyAthens',
          name: 'unifyathens',
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
      request.post('/api/company')
        .send({
          displayName: 'Xara',
          workspaces: [
            {
              _id: uuidv1(),
              displayName: 'XaraLondon',
              name: 'xaralondon',
              users: [
                { email: 'harris.jedakis@gmail.com', role: 'admin'},
                { email: 'har_manis@hotmail.com', role: 'basic'}
              ]
            },
            {
              displayName: 'XaraBerlin',
              name: 'xaraberlin',
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
      request.patch('/api/company/e5c6bf62-f634-11e8-9814-619f28a0ac11')
        .send({
          displayName: 'ATOS',
          workspaces: [
            {
              _id: uuidv1(),
              displayName: 'ATOSAthens',
              name: 'atosathens',
              users: [
                { email: 'charidimos.jedakis@gmail.com', role: 'admin'},
                { email: 'har_manis@hotmail.com', role: 'basic'}
              ]
            },
            {
              displayName: 'ATOSBrussels',
              name: 'atosbrussels',
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
