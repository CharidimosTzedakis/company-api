
//* json schema when receiving a workspace through req.body
var workspaceJSONSchema = {
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
        'required': ['email', 'role']
      }
    }
  },
  'required': ['displayName']
};


module.exports = {
  workspaceJSONSchema
};
