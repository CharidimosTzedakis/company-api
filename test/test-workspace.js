/* global app, request, testDB,  Company, uuidv1 */

describe('Workspace API Routes', function workspaceRouteTests() {
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
      displayName: 'Xara',
      name: 'xara',
      workspaces: [
        {
          _id: 'e5c6bf62-f634-11e8-9814-619f28a0rt57',
          displayName: 'XaraAthens',
          name: 'xaraathens',
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

  describe('POST /workspace/:companyName', function createCompanyTest() {
    it('creates a new workspace within a specific company', function done(done) {
      request.post('/api/workspace/xara')
        .send({
          displayName: 'XaraLondon',
          users: [
            { email: 'harris.jedakis@gmail.com', role: 'admin'},
            { email: 'har_manis@hotmail.com', role: 'basic'}
          ]
        })
        .expect(201)
        .end(function end(err, res) {
          done(err);
        });
    });
  });

  describe('PATCH /workspace/:companyName', function createCompanyTest() {
    it('updates an existing workspace within a specific company', function done(done) {
      request.patch('/api/workspace/xara')
        .send({
          id: 'e5c6bf62-f634-11e8-9814-619f28a0rt57',
          displayName: 'XaraAthensNewPlace',
          users: [
            { email: 'charidimos.jedakis@gmail.com', role: 'admin'},
            { email: 'har_manis@hotmail.com', role: 'basic'},
            { email: 'john@hotmail.com', role: 'basic'}
          ]
        })
        .expect(200)
        .end(function end(err, res) {
          done(err);
        });
    });
  });
});
