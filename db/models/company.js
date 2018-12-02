var mongoose = require('mongoose');
import workspaceSchema from './workspace';

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
  if (duplicates) return false;
  return true;
}

var companySchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
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
    unique: true,
    required: true,
    index: true,
    validate: {
      validator: function validateValue(v) {
        return (v === this.displayName.toLowerCase());
      },
      message: 'name must be displayName in lowercase'
    }
  },
  workspaces: {
    type: [workspaceSchema],
    validate: {
      //* custom valdator for duplicate names
      validator: function validateArray(v) {
        var names;
        v.forEach(function each(value, i) {
          names[i].push(value.name);
        });
        return arrayHasDuplicates(names);
      },
      message: 'workspace name must be unique in this company'
    }
  }
});

module.exports = mongoose.model('Company', companySchema);
