const express = require('express');

module.exports = function diFactory(firewallExpressConfig, firewallRoutes) {
  const app = express();
  firewallExpressConfig(app); // CORS, etc.
  firewallRoutes(app);
  return app;
};
