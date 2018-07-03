const tilesets = require('../data/tilesets');
const authorization = require('../middleware/authorization');
const log = require('../data/log').instance;

module.exports = (app) => {
  app.get("/v1/tilesets", authorization.validateReferrer(), (req, res) => {
    res.send(Object.keys(tilesets));
  });
};
