
var router = global.express.Router();

//* mounting various routes
var company = require('./routes/company');
var user = require('./routes/user');
var workspace = require('./routes/workspace');

router.use('/company', company);
// router.use('/user', user);
// router.use('/workspace', workspace);

module.exports = router;