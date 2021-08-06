const config = require('../config');

module.exports = {
  validateReferrer() {
    return (req, res, next) => {
      next();
    };
  },

  admin() {
    return (req, res, next) => {
      const authorizationHeader = req.headers.authorization || '';
      const token = authorizationHeader.split(' ')[1] || '';

      if (token === config.admin.token) {
        next();
      } else {
        res.status(401).send("Unauthorized");
      }
    }
  }

};
