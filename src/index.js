const express = require("express");
const log = require("./data/log");
const cors = require("./middleware/cors");
const logMiddleware = require("./middleware/log");
const errors = require("./middleware/errors");
const config = require("./config");
const routes = require("./routes");

const start = async () => {
  try {
    const app = express();

    app.use(logMiddleware.logger());
    app.use(cors.simple());
    routes.forEach(registerRoute => registerRoute(app));
    app.use(logMiddleware.errorLogger());
    app.use(errors.handleErrors());

    app.listen(config.server.port, () => {
      log.info(`Listening on http://localhost:${config.server.port}`);
    });
  } catch (error) {
    log.error(`Initialization error: ${error}`);
  }
};

start();
