const environment = process.env.NODE_ENV || "development";

const errorMessage = (key, doc) =>
  `You need to configure the environment variable ${key}. ${doc}`;

const entry = options => {
  let value = process.env[options.key];

  if (value === undefined && options.defaults) {
    value = options.defaults[environment];
  }

  if (value === undefined && options.defaults) {
    value = options.defaults.all;
  }

  if (value === undefined && options.required) {
    throw errorMessage(options.key, options.doc);
  }

  return value;
};

module.exports = {
  environment,

  admin: {
    token: entry({
      key: "ADMIN_TOKEN",
      dock: "Simple token to authenticate admin requests to the service",
      required: true,
      defaults: { "development": "password" },
    }),
  },

  google: {
    maps: {
      apiKey: entry({
        key: "GOOGLE_MAPS_API_KEY",
        doc: "Google Maps Tiles API key",
        required: true
      })
    }
  },

  redis: {
    connectionString: entry({
      key: "REDIS_CONNECTION_STRING",
      doc: "Connection string to the redis server",
      required: true
    }),

    namespace: entry({
      key: "REDIS_NAMESPACE",
      doc: "Prefix for redis keys to namespace entries",
      defaults: { development: "api-gtiles" },
      required: true
    })
  },

  server: {
    host: entry({
      key: "SERVER_HOST",
      doc: "Protocol, host and port where the server is exposed to clients.",
      defaults: { development: "http://localhost:8080" },
      required: false
    }),

    port: entry({
      key: "PORT",
      doc: "Port on which the server is exposed to clients.",
      defaults: { all: 8080 },
      required: false
    }),

    protocol: entry({
      key: "SERVER_PROTOCOL",
      doc: "Protocol by which the server is exposed to clients.",
      defaults: { development: "http", production: "https" },
      required: false
    })
  },

  log: {
    level: entry({
      key: "LOG_LEVEL",
      doc:
        "Logging level. In increasing amount of logs: error, warn, info, verbose, debug, silly",
      defaults: { development: "debug", production: "warn" },
      required: true
    })
  },
};
