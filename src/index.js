const express = require('express');
const swagger = require('./middleware/swagger');
const cors = require('./middleware/cors');
const log = require('./middleware/log');
const errors = require('./middleware/errors');
const config = require('./config');
const routes = require('./routes');

const start = async () => {
  try {
    const swaggerMiddleware = await swagger.middleware;
    const app = express();

    app.use(log.logger());
    app.use(cors.simple());
    app.use(swaggerMiddleware.swaggerMetadata());
    app.use(swaggerMiddleware.swaggerValidator());
    routes.forEach(registerRoute => registerRoute(app));
    app.use(log.errorLogger());
    app.use(errors.handler());

    app.listen(config.server.port, () => {
      console.log(`Listening on http://localhost:${config.server.port}`);
    });
  } catch (error) {
    console.error(`Initialization error`, error);
  }
};

start();

