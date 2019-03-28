module.exports = function configure(injector) {
  injector.register('tokenDecodeMiddlewareFactory', require('./token-decode.middleware'));
  injector.register('tokenRolesRequiredMiddlewareFactory', require('./role-check.middleware'));
};
