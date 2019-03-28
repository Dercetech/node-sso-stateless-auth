module.exports = function configure(injector) {
  if (process.env.auth) {
    injector.register('authExpressApp', require('./express-app'));
    injector.register('authServers', require('./servers'));
    injector.register('authRoutes', require('./routes'));
  }
};
