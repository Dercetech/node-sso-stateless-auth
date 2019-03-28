module.exports = function configure(injector) {
  if (process.env.auth) {
    injector.register('authenticationHandler', require('./authentication.handler'));
  }
  injector.register('authenticationService', require('./authentication.service'));
};
