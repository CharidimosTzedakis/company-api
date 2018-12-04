
//* json schema when receiving a workspace through req.body
var createUserJSONSchema = {
  'properties': {
    'displayName': { 'type': 'string'},
    'users': {
      'type': 'array',
      'items': {
        'type': 'object',
        'properties': {
          'email': { 'type': 'string'},
          'role': {'type': 'string', 'enum': ['basic', 'admin']}
        },
        'required': ['email', 'role'],
        'additionalProperties': false
      }
    }
  },
  'required': ['displayName'],
  'additionalProperties': false
};

module.exports = {
  createUserJSONSchema
};
