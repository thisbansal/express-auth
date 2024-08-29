const validator = require('validator');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_ACCESS_REFRESH_TOKEN;

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
