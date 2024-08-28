const validator = require('validator');
const jwt = require('jsonwebtoken');

const SECRET_KEY = '8cbdda80-6d1b-44d7-8cac-3a0257d72707';

const generateToken = (userId, accessTokenDuration, refreshTokenDuration) => {
  if (!validator.isUUID(userId)) {
    throw new Error('Unacceptable User ID');
  }

  const accessToken = jwt.sign({ userId }, SECRET_KEY, {
    expiresIn: accessTokenDuration,
  });

  const refreshToken = jwt.sign({ userId }, SECRET_KEY, {
    expiresIn: refreshTokenDuration,
  });

  return { accessToken, refreshToken };
};

module.exports = { generateToken };
