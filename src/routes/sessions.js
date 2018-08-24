const tilesets = require('../data/tilesets');
const sessions = require("../data/sessions");
const config = require("../config");
const request = require("request");

const requestToPromise = (options) => new Promise((resolve, reject) => {
  request(options, (error, response, body) => {
    if (error) {
      reject(error);
    } else {
      resolve({ response, body });
    }
  })
});

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

  const { body } = await requestToPromise(options);
  return body.session;
}

const refreshSession = async (tileset) => {
  const newSession = await createSession(tileset.styles);
  const saveResult = await sessions.save(tileset.id, newSession)

  return saveResult;
}

const refreshSessions = async () => {
  const refreshResults = Object
    .keys(tilesets)
    .map((id) => ({ id, styles: tilesets[id] }))
    .map(refreshSession);

  await Promise.all(refreshResults);
  return true;
}

module.exports = (app) => {
  app.get("/v1/tilesets/refresh", (req, res) => {
    refreshSessions()
      .then((result) => res.sendStatus(200));
  });
}

