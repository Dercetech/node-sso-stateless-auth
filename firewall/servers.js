const http = require('http');
// const https = require('https');
const Promise = require('bluebird');

module.exports = function diFactory(firewallServerConfig, firewallExpressApp) {
  const httpServer = http.createServer(firewallExpressApp);
  const httpsServer = http.createServer(firewallExpressApp);
  const servers = { http: httpServer, https: httpsServer };

  const _startHttp = () =>
    new Promise((resolve, reject) => {
      httpServer.listen(firewallServerConfig.http.port, firewallServerConfig.http.address, () => resolve());
    });

  const _startHttps = () =>
    new Promise((resolve, reject) => {
      reject(new Error('[http layer] secure layer not implemented'));
    });

  const start = () => Promise.all([_startHttp() /*, _startHttps()*/]);
  const stop = () => Promise.all([]);

  const getServers = () => servers;

  return { start, stop, getServers };
};
