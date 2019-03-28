module.exports = function configure(injector) {
  if (process.env.api) {
    injector.register('apiExpressConfig', require('./express.config'));
    injector.register('apiServerConfig', require('./servers.config'));
  }
};
