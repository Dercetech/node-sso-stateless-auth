const express = require('express');

module.exports = function diFactory(authExpressConfig, authRoutes) {
  const app = express();
  authExpressConfig(app); // CORS, etc.
  authRoutes(app);
  return app;
};
