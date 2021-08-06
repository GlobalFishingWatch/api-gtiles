const tilesets = require('../data/tilesets');
const sessions = require("../data/sessions");
const authorization = require("..//middleware/authorization");
const log = require("../data/log");

module.exports = app => {
  app.post(
    "/admin/flush",
    authorization.admin(),
    async (req, res, next) => {
      try {
        log.debug("Flushing sessions");
        const promises = Object
          .keys(tilesets)
          .map(tilesetId => sessions.flush(tilesetId));

        const result = await Promise.all(promises);

        res.status(200).send();
      } catch (error) {
        next(error);
      }
    }
  );
};
