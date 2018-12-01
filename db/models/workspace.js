var mongoose = require('mongoose');

var workspaceSchema =  new mongoose.Schema({
  _id: {
    type: String,
    index: true
  },
  displayName: {
    type: String,
    validate: /\S+/
  },
  name: {
    type: String,
    index: true,
    validator: function validateValue(v) {
      return (v === this.displayName.toLowerCase());
    }
  }
});

module.exports = workspaceSchema;
