const express = require('express');

module.exports = function diFactory(apiExpressConfig, apiRoutes) {
  const app = express();
  apiExpressConfig(app); // CORS, etc.
  apiRoutes(app);
  return app;
};
