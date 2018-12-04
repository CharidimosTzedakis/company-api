
//* json schema when receiving requests for /company api

var newCompanyJSONSchema = {
  'displayName': { 'type': 'string'},
  'workspaces': {
    'type': 'array',
    'items': {
      'type': 'object',
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
    }
  }
};

var updateCompanyJSONSchema = newCompanyJSONSchema;

module.exports = {
  newCompanyJSONSchema,
  updateCompanyJSONSchema
};

