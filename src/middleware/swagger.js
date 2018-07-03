const util = require('util');
const swagger = require('swagger-tools');
const yaml = require('yamljs');
const config = require('../config');

const spec = yaml.load('./src/routes/swagger.yaml');
spec.schemes = [config.server.protocol];

const initializeMiddleware = (spec) => {
  return new Promise((resolve) => {
    swagger.initializeMiddleware(spec, (middleware) => {
      resolve(middleware);
    });
  });
};

module.exports = {
  middleware: initializeMiddleware(spec),
  spec,
};
