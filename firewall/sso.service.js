module.exports = function diFactory(authenticationDatabaseService, authenticationService) {
  // Mock the SSO connection
  const getSSOToken = () => {
    const user = authenticationDatabaseService.users.getById('aurelie');
    const clearPassword = user.passwordHash.replace('#', '');
    return authenticationService.authenticateUser(user.id, clearPassword);
  };

  return {
    getSSOToken
  };
};
