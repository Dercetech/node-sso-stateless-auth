const http = require('http');
// const https = require('https');
const Promise = require('bluebird');

module.exports = function diFactory(apiServerConfig, apiExpressApp) {
  const httpServer = http.createServer(apiExpressApp);
  const httpsServer = http.createServer(apiExpressApp);
  const servers = { http: httpServer, https: httpsServer };

  const _startHttp = () =>
    new Promise((resolve, reject) => {
      httpServer.listen(apiServerConfig.http.port, apiServerConfig.http.address, () => resolve());
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
