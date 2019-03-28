const express = require('express');

module.exports = function routesFactory(authenticationHandler) {
  function configureRoutes(expressApp) {
    // API
    expressApp.get('/', (req, res) => res.send('Klaatu barada nikto!'));

    // Authentication endpoint
    expressApp.post('/', authenticationHandler);

    // Fallback to 404
    expressApp.use((req, res, next) => {
      res.status(404);
      res.type('txt').send('Not found');
    });
  }

  return configureRoutes;
};
