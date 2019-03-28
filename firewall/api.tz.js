module.exports = function configure(injector) {
  if (process.env.fw) {
    injector.register('firewallExpressApp', require('./express-app'));
    injector.register('firewallServers', require('./servers'));
    injector.register('firewallRoutes', require('./routes'));
    injector.register('ssoService', require('./sso.service'));
  }
};
