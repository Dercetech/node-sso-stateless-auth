const path = require('path');

module.exports = function diFactory() {
  const folders = {};
  folders.root = path.join(__dirname, '..');
  folders.data = path.join(folders.root, 'data');

  const http = {
    port: 8086,
    address: '127.0.0.1'
  };

  const security = {
    tokenSecret: process.env.tokenSecret, // never store in a config file :-)
    expiration: 60 * 60 * 24 * 10, // 10 day expiry time
    renew: 60 * 60 * 24 * 5
  };

  return { folders, http, security };
};
