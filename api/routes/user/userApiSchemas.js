
//* json schema when receiving a workspace through req.body
var userApiJSONSchema = {
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

module.exports = {
  userApiJSONSchema
};
