require('dotenv').config();
const BASIC_AUTH_USERNAME = process.env.BASIC_AUTH_USERNAME;
const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD;

const basicAuth = (req, res, next) => {
  try {
    const authHeader = req?.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return res.status(401).send(`Missing or invalid Authorization header`);
    }
    const [userName, userPassword] = atob(authHeader.split(' ')[1]).split(':');
    if (
      userName === BASIC_AUTH_USERNAME &&
      userPassword === BASIC_AUTH_PASSWORD
    ) {
      next();
    } else {
      res.status(401).send(`Invalid credentials`);
    }
  } catch (error) {
    res.status(401).send(`Something went wrong`);
    console.error(error);
  }
};

module.exports = {
  basicAuth,
};
