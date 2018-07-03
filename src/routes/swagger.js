const swagger = require('../middleware/swagger');

module.exports = (app) => {
  app.get('/api', (req, res) => {
    res.json(swagger.spec);
  });
};

