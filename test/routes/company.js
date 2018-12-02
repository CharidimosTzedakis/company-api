/* global app, request */

describe('Task API Routes', function companyRouteTests() {
  // This function will run before every test to initialize database
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
      request.patch('/company/')
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
