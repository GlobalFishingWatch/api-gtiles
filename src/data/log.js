const winston = require('winston');
const config = require('../config');

winston.emitErrs = true;

module.exports = {
  cloneTransport: makeConsoleTransport,

  instance: new winston.Logger({
      level: config.log.level,
      transports: [
        makeConsoleTransport()
      ],
    }),
  };

function makeConsoleTransport() {
  return new winston.transports.Console({
    timestamp: true,
    prettyPrint: true,
    stderrLevels: [],
  });
}

