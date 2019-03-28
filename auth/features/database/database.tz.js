module.exports = function configure(injector) {
  if (process.env.auth) {
  }
  injector.register('authenticationDatabaseService', require('./database.service'));
};
