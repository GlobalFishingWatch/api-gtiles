const tilesets = require('../data/tilesets');
const config = require('../config');
const request = require('request');

const tilesetId = process.argv[2];

const createSession = async (styles) => {
  const options = {
    uri: `https://www.googleapis.com/tile/v1/createSession?key=${config.google.maps.apiKey}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Referer': 'https://gtiles.globalfishingwatch.org',
    },
    json: true,
    body: styles,
  };

  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) {
        reject(error);
      }
      resolve(body.session);
    });
  });
}

const processTilesetSession = async () => {
  const tileset = tilesets[tilesetId];
  const styles = tileset.styles;
  const session = await createSession(styles);
  console.log(session);
}

processTilesetSession();


