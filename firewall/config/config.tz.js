module.exports = function configure(injector) {
  if (process.env.fw) {
    injector.register('firewallExpressConfig', require('./express.config'));
    injector.register('firewallServerConfig', require('./servers.config'));
  }
};
