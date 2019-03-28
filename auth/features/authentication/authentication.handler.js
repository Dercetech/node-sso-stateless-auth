module.exports = function diFactory(authenticationService) {
  const authenticationHandler = (req, res) => {
    const userId = req.body.id;
    const pwd = req.body.pwd;

    authenticationService
      .authenticateUser(userId, pwd)
      .then(token => {
        res.set('Authorization', token);
        res.send('welcome!');
      })
      .catch(({ message }) => {
        switch (message) {
          case 'USER_NOT_FOUND': {
            /* fall-through, one doesn't want to reveal the details */
          }
          case 'WRONG_PASSWORD': {
            return res.status(401).send('wrong credentials');
          }
          default:
            return res.status(500).send('error when processing authentication');
        }
      });
  };

  return authenticationHandler;
};
