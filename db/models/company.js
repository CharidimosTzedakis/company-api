var mongoose = require('mongoose');
import userSchema from './user';
import workspaceSchema from './workspace';


var companySchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  displayName: {
    type: String,
    validate: /\S+/
  },
  name: {
    type: String,
    unique: true,
    index: true,
    validator: function validateValue(v) {
      return (v === this.displayName.toLowerCase());
    }
  },
  workspaces: {
    type: [workspaceSchema]
  },
  users: {
    type: [userSchema]
  }
});

module.exports = mongoose.model('Company', companySchema);
