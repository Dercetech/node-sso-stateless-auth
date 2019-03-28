const express = require('express');

module.exports = function routesFactory(
  apiServerConfig,
  tokenDecodeMiddlewareFactory,
  tokenRolesRequiredMiddlewareFactory
) {
  function enrichResponseWithUserData(req, response) {
    if (req.decodedToken) {
      const { id, roles } = req.decodedToken;
      return { ...response, user: { id, roles } };
    } else {
      return response;
    }
  }

  function configureRoutes(apiExpressApp) {
    // API
    apiExpressApp.get('/', (req, res) => res.send('API sends regards'));

    // Routes declared below this point will automatically decode tokens from headers
    const { tokenSecret } = apiServerConfig.security;
    apiExpressApp.use(tokenDecodeMiddlewareFactory({ tokenSecret, renew: 60 * 60 * 24 * 5 }));

    // Public route
    apiExpressApp.get(
      '/public',
      (req, res, next) => next(),
      (req, res) =>
        res.json(
          enrichResponseWithUserData(req, {
            groupId: 12,
            groupName: 'Guilderland',
            members: ['Nick', "N'Hack", 'Raspberry'],
            confidentiality: 'public'
          })
        )
    );

    // Secure route
    apiExpressApp.get('/secure', tokenRolesRequiredMiddlewareFactory(['cats']), (req, res) =>
      res.json(
        enrichResponseWithUserData(req, {
          groupId: 0,
          groupName: 'Boulets',
          members: ['usual', 'suspects'],
          confidentiality: 'confidential'
        })
      )
    );

    // Fallback to 404
    apiExpressApp.use((req, res, next) => {
      res.status(404);
      res.type('txt').send('Not found');
    });
  }

  return configureRoutes;
};
