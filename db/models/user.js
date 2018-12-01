var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    index: true,
    validate: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  },
  role: {
    type: String,
    enum: ['basic', 'admin']
  }
});

module.exports = userSchema;
