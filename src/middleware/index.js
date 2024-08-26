// const defaultConfig = require('../constants');
// const { ValidationError } = require('joi');

function logAndRedirectInsecureRequest(req, res, next) {
  console.log(
    `${new Date().toISOString()} - ${req.method} request to ${req.url}`
  );

  next();
}

module.exports = { logAndRedirectInsecureRequest };
