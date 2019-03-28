const path = require('path');

module.exports = function diFactory() {
  const folders = {};
  folders.root = path.join(__dirname, '..');
  folders.data = path.join(folders.root, 'data');

  const http = {
    port: 8008,
    address: '127.0.0.1'
  };

  const topology = {
    api: 'http://localhost:8086',
    auth: 'http://localhost:8088'
  };

  const security = {
    tokenSecret: process.env.tokenSecret
  };

  return { folders, http, security, topology };
};
