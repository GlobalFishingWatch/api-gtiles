const tilesets = require("../data/tilesets");
const authorization = require("../middleware/authorization");

module.exports = app => {
  app.get("/v1/tilesets", authorization.validateReferrer(), (req, res) => {
    res.send(Object.keys(tilesets));
  });
  app.get("/v2/tilesets", authorization.validateReferrer(), (req, res) => {
    res.send(Object.keys(tilesets));
  });
};
