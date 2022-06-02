const tilesets = require('../data/tilesets');

module.exports = app => {
  app.get('/v1/tilesets', (req, res) => {
    res.send(Object.keys(tilesets));
  });
  app.get('/v2/tilesets', (req, res) => {
    res.send(Object.keys(tilesets));
  });
};
