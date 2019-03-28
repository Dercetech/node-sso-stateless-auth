module.exports = function diFactory() {
  // All right, mock data
  const _users = [
    { id: 'jem', passwordHash: '#abadodo', roles: ['ui', 'node', 'blah'] },
    { id: 'jb', passwordHash: '#nicknhack', roles: ['pinger', 'nerfs'] },
    { id: 'aurelie', passwordHash: '#raspberries', roles: ['archery', 'node', 'cats'] }
  ];

  const _getUserById = id => _users.find(user => user.id === id);

  return {
    users: {
      getById: _getUserById
    }
  };
};
