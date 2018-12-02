'use strict';

var router = global.express.Router();
var mongoose = require('mongoose');
var Company = require('../../models/company');


// ** create a new company entry */
router.post('/', function handle(req, res) {
  var test;
  // DB.newCompany();
  //* RFC4122 version 1 UUID
  var NewId = new mongoose.mongo.ObjectId('56cb91bdc3464f14678934ca');
  res.send('Hello World!');
});


// ** update an existing company */

module.exports = router;
