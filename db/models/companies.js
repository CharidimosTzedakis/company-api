var mongoose = require('mongoose');

var companiesSchema = new mongoose.Schema({
  _id: {
    type: String,
        required: true,
        unique: true,
        index: true,
    },
    displayName: {
        type: String,
    },
    name: {
        type: String,
        unique: true,
        index: true
    },
    workspaces: {
        type: Object,
    }
});

module.exports = mongoose.model('Companies', companiesSchema);
