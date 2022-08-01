const request = require('request');
const tilesets = require('../data/tilesets');
const sessions = require('../data/sessions');
const authorization = require('..//middleware/authorization');
const config = require('../config');
const log = require('../data/log');

async function getTile(req, res, next) {
  try {
    let tilesetId = req.params.tileset;
    const {
      z, x, y, locale,
    } = req.query;
    const tileset = tilesets[tilesetId];
    if (!tileset) {
      log.warn('Invalid tileset', tilesetId);
      return res.status(422).send('Bad Request: Invalid tileset');
    }
    if (locale) {
      tileset.language = locale;
      tilesetId = `${tilesetId}_${locale}`;
    }

    log.debug('Obtaining session information for tileset ', tilesetId);
    const token = await sessions.get(tilesetId, tileset);

    log.debug('Session information available, forwarding to google apis');
    const session = encodeURIComponent(token);
    const apiKey = encodeURIComponent(config.google.maps.apiKey);

    const uri = `https://www.googleapis.com/tile/v1/tiles/${z}/${x}/${y}/?key=${apiKey}&session=${session}`;

    const options = {
      uri,
      method: 'GET',
      headers: {
        'Content-Type': 'image/jpg',
        Referer: 'https://gtiles.globalfishingwatch.org',
      },
    };

    request(options).pipe(res);
  } catch (error) {
    next(error);
  }

  return null;
}
module.exports = (app) => {
  app.get(
    '/v1/tileset/:tileset/tile',
    authorization.validateReferrer(),
    getTile,
  );
  app.get(
    '/v2/tileset/:tileset/tile',
    authorization.validateReferrer(),
    getTile,
  );
};
