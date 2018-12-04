
//* json schema when receiving requests for /user api
var createUserJSONSchema = {
  'properties': {
    'workspaceName': { 'type': 'string'},
    'user': {
      'type': 'object',
      'properties': {
        'email': { 'type': 'string'},
        'role': {'type': 'string', 'enum': ['basic', 'admin']}
      },
      'required': ['email', 'role'],
      'additionalProperties': false
    }
  },
  'required': ['workspaceName', 'user'],
  'additionalProperties': false
};

var deleteUserJSONSchema = {
  'properties': {
    'workspaceName': { 'type': 'string'},
    'userEmail': {'type': 'string'}
  },
  'required': ['workspaceName', 'userEmail'],
  'additionalProperties': false
};

module.exports = {
  createUserJSONSchema,
  deleteUserJSONSchema
};
