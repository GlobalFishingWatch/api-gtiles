const swaggerError2ValidationError = (error) => {
  return {
    param: error.paramName,
    code: error.code.toLowerCase(),
    errors: error.results.errors.map((fieldError) => {
      return {
        code: fieldError.code.toLowerCase(),
        message: fieldError.message,
        path: fieldError.path,
      };
    }),
  };
};

module.exports = {
  handler() {
    return (err, req, res, next) => {
      if (res.headersSent) {
        return next(err);
      }

      if ('body' in err && err.status === 400) {
        return res.status(400).send('Bad Request: Invalid JSON');
      }

      if (err.failedValidation) {
        return res.status(422).send(swaggerError2ValidationError(err));
      }

      res.sendStatus(500);
    }
  },
};

