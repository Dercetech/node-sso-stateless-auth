module.exports = function configure(injector) {
  if (process.env.auth) {
    injector.register('authExpressConfig', require('./express.config'));
  }
  injector.register('authServerConfig', require('./servers.config'));
};
