const http = require('http');
// const https = require('https');
const Promise = require('bluebird');

module.exports = function diFactory(authServerConfig, authExpressApp) {
  const httpServer = http.createServer(authExpressApp);
  const httpsServer = http.createServer(authExpressApp);
  const servers = { http: httpServer, https: httpsServer };

  const _startHttp = () =>
    new Promise((resolve, reject) => {
      httpServer.listen(authServerConfig.http.port, authServerConfig.http.address, () => resolve());
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
