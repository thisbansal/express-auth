const defaultConfig = require("../constants");
module.exports = (req, res, next) => {
  console.log(
    `${new Date().toISOString()} - ${req.method} request to ${
      req.url
    } using secure protocol ${req.secure}`
  );
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
  next();
};
