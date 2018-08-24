const datastore = require('@google-cloud/datastore');
const config = require('../../config');

const datastoreConfig = Object.assign(
  {},
  config.gcloud.datastore,
  config.datastore,
);

module.exports = datastore(datastoreConfig);


