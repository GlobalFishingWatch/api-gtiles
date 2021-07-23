const request = require("request");
const log = require("../data/log");
const redis = require("../services/redis");
const config = require("../config");

const buildKey = id => `${config.redis.namespace}-session-${id}`;

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
    uri: `https://www.googleapis.com/tile/v1/createSession?key=${config.google.maps.apiKey}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    json: true,
    body: styles
  };

  log.debug("Creating session through google maps API");
  const { body } = await requestToPromise(options);
  log.debug("Session created", body);

  if (body.error) {
    log.error("Unable to create map tiles session", body)
    throw new Error("Unable to create map tiles session");
  }

  return body;
};

const saveSession = (id, session) => {
  const key = buildKey(id);
  log.debug(`Saving session ${session.session} which will expire at ${session.expiry}`);
  return redis.set(key, session.session, "EXAT", session.expiry);
};

const refreshSession = async (tilesetId, tileset) => {
  log.debug("Refreshing session for tileset ", tilesetId);
  const newSession = await createSession(tileset);
  log.debug("New session created: ", newSession);
  const saveResult = await saveSession(tilesetId, newSession);
  log.debug("Session tokens saved: ", saveResult);

  return newSession.session;
};

module.exports = {
  async get(tilesetId, tileset) {
    const key = buildKey(tilesetId);
    let session = await redis.get(key);

    if (!session) {
      session = await refreshSession(tilesetId, tileset);
    }

    return session;
  }
};
