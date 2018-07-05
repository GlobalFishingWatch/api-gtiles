const tilesets = require('../data/tilesets');
const authorization = require('..//middleware/authorization');
const config = require('../config');
const request = require('request');

module.exports = (app) => {
  app.get("/v1/tileset/:tileset/tile", authorization.validateReferrer(), (req, res) => {
    const tilesetId = req.swagger.params.tileset.value;
    const tileset = tilesets[tilesetId];

    if (!tileset) {
      res.sendStatus(422);
      return;
    }

    const z = req.swagger.params.z.value;
    const x = req.swagger.params.x.value;
    const y = req.swagger.params.y.value;
    const session = encodeURIComponent(tileset.session);
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
  });
};
