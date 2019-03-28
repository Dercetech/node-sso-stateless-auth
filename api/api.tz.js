module.exports = function configure(injector) {
  if (process.env.api) {
    injector.register('apiExpressApp', require('./express-app'));
    injector.register('apiServers', require('./servers'));
    injector.register('apiRoutes', require('./routes'));
  }
};
