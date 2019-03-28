const jwt = require('jsonwebtoken');

module.exports = function diFactory() {
  const middlewareFactory = ({ tokenSecret, renew }) => (req, res, next) => {
    const token = (req.body ? req.body.token : null) || req.query.token || req.headers['x-access-token'];

    // Decode token
    if (token) {
      jwt.verify(token, tokenSecret, (err, decoded) => {
        if (err) {
          switch (err.name) {
            case 'TokenExpiredError':
              res.sendStatus(401); // 401: token has expired,
              break;
            default:
              res.sendStatus(400); // 400: bad request, malformed token
          }
        } else {
          // Add function to check presence of role
          req.tokenHasRole = theRole => req.decodedToken.roles.indexOf(theRole) !== -1;

          // Half life renewal
          let renewIn = decoded.exp - renew - new Date().getTime() / 1000;
          if (renewIn <= 0) {
            console.log('[TODO] real life example: roundtrip with auth µService to renew the token');
          } else {
            req.decodedToken = decoded;
            next();
          }
        }
      });
    }

    // No token provided
    else next();
  };

  return middlewareFactory;
};
