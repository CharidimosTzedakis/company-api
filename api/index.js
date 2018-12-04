
var router = global.express.Router();

//* mounting various routes
var company = require('./routes/company');
var user = require('./routes/user');
var workspace = require('./routes/workspace');

router.use('/company', company);
router.use('/workspace', workspace);
router.use('/user', user);

module.exports = router;
