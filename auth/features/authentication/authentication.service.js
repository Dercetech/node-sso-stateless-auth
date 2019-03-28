const jwt = require('jsonwebtoken');

module.exports = function diFactory(utils, authenticationDatabaseService, authServerConfig) {
  const _generateToken = ({ id, roles }) => {
    const payload = { id, roles };
    const { tokenSecret } = authServerConfig.security;
    const options = {
      expiresIn: authServerConfig.security.expiration,
      header: {}
    };
    const token = jwt.sign(payload, tokenSecret, options);

    // Adding security: Remove token header (why give hints to a script kiddie?)
    // const segments = token.split('.');
    // const leanToken = '.' + segments[1] + '.' + segments[2];

    return token;
  };

  const authenticateUser = (id, password) =>
    new Promise((resolve, reject) => {
      // Step 1: Find the user
      const user = authenticationDatabaseService.users.getById(id);
      if (!user) {
        return reject(new Error('USER_NOT_FOUND'));
      }

      // Step 2: Hash the input password and compare with stored, salted hash
      // rem: Hashing happens on the server, see remark in utils.js for details
      const hashedInboundPassword = utils.hashing.basic(password);
      if (hashedInboundPassword !== user.passwordHash) {
        return reject(new Error('WRONG_PASSWORD'));
      }

      // Step 3: User is known & password seems right. Grant access!
      const token = _generateToken(user);

      // Illustrating the contents of a token
      const tokenContents = utils.token.decode(token);

      resolve(token);
    });

  return { authenticateUser };
};
