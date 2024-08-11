const defaultConfig = require('../constants');
// const { ValidationError } = require('joi');

function logAndRedirectInsecureRequest(req, res, next) {
  console.log(
    `${new Date().toISOString()} - ${req.method} request to ${
      req.url
    } using secure protocol ${req.secure}`
  );

  // if request is not secure then redirect to https
  if (!req.secure) {
    console.log(
      `redirecting to secure protocol https | https://${
        process.env.HOST || defaultConfig.HOST
      }:${process.env.PORT_NUMBER || defaultConfig.PORT_NUMBER}${req.url}`
    );
    return res.redirect(
      301,
      `https://${process.env.HOST || defaultConfig.HOST}:${
        process.env.PORT_NUMBER || defaultConfig.PORT_NUMBER
      }${req.url}`
    );
  }

  // validate request before proceeding
  next();
}

module.exports = { logAndRedirectInsecureRequest };
