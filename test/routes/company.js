/* global app, request */

describe('Task API Routes', function companyRouteTests() {
  // This function will run before every test to clear database
  beforeEach(function clearDB(done) {
    app.db.object = {};
    app.db.object.tasks = [{
      id: uuid(),
      title: 'study',
      done: false
    }, {
      id: uuid(),
      title: 'work',
      done: true
    }];
    app.db.write();
    done();
  });

  // Testing the save task expecting status 201 of success
  describe('POST /company', function createCompanyTest() {
    it('creates a new company', function done(done) {
      request.post('/tasks')
        .send({
          title: 'run',
          done: false
        })
        .expect(201)
        .end(function end(err, res) {
          done(err);
        });
    });
  });

  // Testing the save task expecting status 201 of success
  describe('POST /company', function createCompanyTest() {
    it('creates a new company', function done(done) {
      request.post('/tasks')
        .send({
          title: 'run',
          done: false
        })
        .expect(201)
        .end(function end(err, res) {
          done(err);
        });
    });
  });
});
