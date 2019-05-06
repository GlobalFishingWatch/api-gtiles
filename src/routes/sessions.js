const request = require("request");
const tilesets = require("../data/tilesets");
const sessions = require("../data/sessions");
const config = require("../config");
const log = require("../data/log");

const requestToPromise = options =>
  new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve({ response, body });
      }
    });
  });

const createSession = async styles => {
  const options = {
    uri: `https://www.googleapis.com/tile/v1/createSession?key=${
      config.google.maps.apiKey
    }`,
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    json: true,
    body: styles
  };

  log.debug("Creating session through google maps API");
  const { body } = await requestToPromise(options);
  log.debug("Session created: ", body);
  return body.session;
};

const refreshSession = async tileset => {
  log.debug("Refreshing session for tileset ", tileset.id);
  const newSession = await createSession(tileset.styles);
  log.debug("New session created: ", newSession);
  const saveResult = await sessions.save(tileset.id, newSession);
  log.debug("Session tokens saved: ", saveResult);

  return saveResult;
};

const refreshSessions = async () => {
  const refreshResults = Object.keys(tilesets)
    .map(id => ({ id, styles: tilesets[id] }))
    .map(refreshSession);

  await Promise.all(refreshResults);
  return true;
};

module.exports = app => {
  app.get("/v1/tilesets/refresh", (req, res) => {
    refreshSessions().then(() => res.sendStatus(200));
  });
};
