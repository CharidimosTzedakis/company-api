var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    index: true,
    required: true,
    validate: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  },
  role: {
    type: String,
    required: true,
    enum: ['basic', 'admin']
  }
});

module.exports = userSchema;
