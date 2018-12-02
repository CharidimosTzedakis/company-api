var mongoose = require('mongoose');
var userSchema = require('./user');
// mongoose.Schema.Types.ObjectId

function arrayHasDuplicates(arrayOfStrings) {
  var uniq = arrayOfStrings
    .map( function mapper(name) {
      return {count: 1, name: name};
    })
    .reduce(function reducer(a, b) {
      a[b.name] = (a[b.name] || 0) + b.count;
      return a;
    }, {});

  var duplicates = Object.keys(uniq).filter(function filter(a) {return uniq[a] > 1;});
  if (duplicates.length > 0) return false;
  return true;
}

var workspaceSchema =  new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  displayName: {
    type: String,
    validate: /\S+/,
    required: true
  },
  name: {
    type: String,
    index: true,
    required: true,
    validate: {
      validator: function validateValue(v) {
        return (v === this.displayName.toLowerCase());
      },
      message: 'name must be displayName in lowercase'
    }
  },
  users: {
    type: [userSchema],
    validate: {
      //* custom valdator for duplicate emails
      validator: function validateArray(v) {
        var emails = [];
        v.forEach(function each(embededDoc) {
          emails.push(embededDoc._doc.email);
        });
        return arrayHasDuplicates(emails);
      },
      message: 'user email must be unique in this workspace'
    }
  }
});

module.exports = workspaceSchema;
