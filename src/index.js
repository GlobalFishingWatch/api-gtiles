const express = require("express");
const log = require("./data/log");
const logMiddleware = require("./middleware/log");
const errors = require("./middleware/errors");
const config = require("./config");
const routes = require("./routes");

const start = async () => {
  try {
    console.log('Running')
    const app = express();

    app.use(logMiddleware.logger());
    routes.forEach(registerRoute => registerRoute(app));
    app.use(logMiddleware.errorLogger());
    app.use(errors.handleErrors());

    app.listen(config.server.port, () => {
      log.info(`Listening on http://localhost:${config.server.port}`);
    });
  } catch (error) {
    console.error(error)
    log.error(`Initialization error: ${error}`);
  }
};

start();
