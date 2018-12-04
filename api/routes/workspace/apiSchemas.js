
//* json schema when receiving a workspace through req.body
var workspaceJSONSchema = {
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

var workspaceWithIdJSONSchema = {
  'properties': {
    'id': {'type': 'string'},
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
  'required': ['id', 'displayName'],
  'additionalProperties': false
};

module.exports = {
  workspaceJSONSchema,
  workspaceWithIdJSONSchema
};
