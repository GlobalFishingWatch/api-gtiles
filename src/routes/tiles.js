const tilesets = require('../data/tilesets');
const sessions = require("../data/sessions");
const authorization = require('..//middleware/authorization');
const config = require('../config');
const request = require('request');

module.exports = (app) => {
  app.get("/v1/tileset/:tileset/tile", authorization.validateReferrer(), async (req, res, next) => {
    try {
      const tilesetId = req.swagger.params.tileset.value;
      const rawSession = await sessions.get(tilesetId);

      const z = req.swagger.params.z.value;
      const x = req.swagger.params.x.value;
      const y = req.swagger.params.y.value;
      const session = encodeURIComponent(rawSession.token);
      const apiKey = encodeURIComponent(config.google.maps.apiKey);

      const uri = `https://www.googleapis.com/tile/v1/tiles/${z}/${x}/${y}/?key=${apiKey}&session=${session}`

      const options = {
        uri: uri,
        method: 'GET',
        headers: {
          'Content-Type': 'image/jpg',
          'Referer': 'https://gtiles.globalfishingwatch.org',
        },
      };

      request(options).pipe(res);

    } catch (error) {
      next(error);
    }
  });
};
