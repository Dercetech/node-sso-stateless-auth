const http = require('http');
const querystring = require('querystring');

module.exports = function routesFactory(firewallServerConfig, ssoService) {
  function configureRoutes(expressApp) {
    // Redirect authentication requests to auth µService

    expressApp.post('/auth', (req, res) => {
      const { id, pwd } = req.body;
      //const postData = JSON.stringify({ id, pwd });
      const postData = querystring.stringify({ id, pwd });
      const postOptions = {
        host: 'localhost',
        port: '8088',
        path: '/',
        method: 'POST',
        json: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const authReq = http.request(postOptions, authRes => {
        res.set('Firewall', 'FireJem-68000');
        let data = '';

        authRes.on('data', chunk => {
          data += chunk;
        });

        authRes.on('end', () => {
          const { authorization } = authRes.headers;
          if (authRes.statusCode === 200) {
            res.set('Authorization', authorization);
          }
          res.send(data);
        });
        authRes.on('error', err => {
          res.status(authRes.statusCode);
          res.send(err);
        });
      });

      authReq.write(postData);
      authReq.end();
    });

    // Redirect the rest to the regular API
    expressApp.use((req, res, next) => {
      // Thanks to our POC, we are connected to the domain (kerberos or whatever)
      ssoService.getSSOToken().then(token => {
        const getOptions = {
          host: 'localhost',
          port: '8086',
          path: req.path,
          method: 'GET',
          headers: {
            'x-access-token': token
          }
        };

        http
          .get(getOptions, apiResp => {
            res.set('Firewall', 'FireJem-68000');
            let data = '';

            apiResp.on('data', chunk => {
              data += chunk;
            });

            apiResp.on('end', () => {
              try {
                // Attempt JSON parsing
                const parsedJson = JSON.parse(data);
                return res.json(parsedJson);
              } catch (err) {
                // Fallback to plain text
                return res.send(`${data}`);
              }
            });
          })
          .on('error', err => {
            res.status(500).send(err);
          });
      });
    });
  }

  return configureRoutes;
};
