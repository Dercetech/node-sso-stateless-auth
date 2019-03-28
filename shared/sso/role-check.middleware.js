module.exports = function diFactory() {
  const _requestedRolesProvided = (requested, roles) => {
    let matching = 0;
    requested.forEach(function(role) {
      matching += roles.indexOf(role) >= 0 ? 1 : 0;
    });
    return requested.length === matching;
  };

  return expectedRoles => {
    if (expectedRoles.constructor !== Array) {
      if (typeof expectedRoles === 'string' || expectedRoles instanceof String) {
        expectedRoles = [expectedRoles];
      } else {
        throw 'Roles can only be a String or an Array. Provided: ' + expectedRoles;
      }
    }

    return (req, res, next) => {
      // Validate presence of a decoded token
      if (req.decodedToken && _requestedRolesProvided(expectedRoles, req.decodedToken.roles)) {
        next();
      }

      // Error 403: Access forbidden
      else {
        // TODO report
        // console.log('<ALERT> Tampering attempt: user [' + req.decodedToken.user + '] requested uri: ' + req.url);
        return res.sendStatus(403);
      }
    };
  };
};
