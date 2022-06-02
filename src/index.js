const express = require('express');
const log = require('./data/log');
const logMiddleware = require('./middleware/log');
const errors = require('./middleware/errors');
const config = require('./config');
const routes = require('./routes');

const app = express();

app.use(logMiddleware.logger());
routes.forEach(registerRoute => registerRoute(app));
app.use(logMiddleware.errorLogger());
app.use(errors.handleErrors());

app.listen(config.server.port, () => {
  log.info(`Listening on http://localhost:${config.server.port}`);
});
