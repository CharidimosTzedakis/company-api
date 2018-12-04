/* global app, request, testDB,  Company, uuidv1 */

describe('User API Routes', function userRouteTests() {
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

  describe('POST /user/:companyName', function createCompanyTest() {
    it('creates a new user within a specific workspace in a company', function done(done) {
      request.post('/api/user/xara')
        .send({
          workspaceName: 'xaraathens',
          user: {
            email: 'john.doe@gmail.com',
            role: 'basic'
          }
        })
        .expect(201)
        .end(function end(err, res) {
          done(err);
        });
    });
  });

  describe('DELETE /user/:companyName', function createCompanyTest() {
    it('removes an existing user from a specific workspace in a company', function done(done) {
      request.patch('/api/user/xara')
        .send({
          workspaceName: 'atosbrazil',
          userEmail: 'charidimos.tzedakis@gmail.com'
        })
        .expect(200)
        .end(function end(err, res) {
          done(err);
        });
    });
  });
});
