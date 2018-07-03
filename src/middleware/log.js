const expressWinston = require('express-winston');
const log = require('../data/log');

module.exports = {
  logger() {
    return expressWinston.logger({
      transports: [log.cloneTransport()],
      expressFormat: false,
      msg: '{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}',
      meta: false,
      skip(req) {
        return req.path.startsWith('/_ah/');
      },
    });
  },

  errorLogger() {
    return expressWinston.errorLogger({
      transports: [log.cloneTransport()],
      expressFormat: false,
      msg: '{{req.method}} {{res.responseTime}}ms {{req.url}}',
      colorStatus: true,
    });
  },
};

