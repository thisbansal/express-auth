const tap = require('tap');
const authServices = require('../../../src/services/auth_services/auth.services');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const SECRET_KEY = '8cbdda80-6d1b-44d7-8cac-3a0257d72707';

// Test cases
tap.test('generateToken function', async (t) => {
  const userId = uuidv4();
  const accessTokenDuration = '1h';
  const refreshTokenDuration = '7d';

  t.test('should generate access and refresh tokens', async (t) => {
    const { accessToken, refreshToken } = authServices.generateToken(
      userId,
      accessTokenDuration,
      refreshTokenDuration
    );
    t.ok(accessToken, 'Access token should be generated');
    t.ok(refreshToken, 'Refresh token should be generated');
  });

  t.test(
    'access token should contain correct userId and have the correct expiration',
    async (t) => {
      const { accessToken } = authServices.generateToken(
        userId,
        accessTokenDuration,
        refreshTokenDuration
      );
      const decodedAccessToken = jwt.verify(accessToken, SECRET_KEY);
      t.equal(
        decodedAccessToken.userId,
        userId,
        'Access token should contain correct userId'
      );
      t.ok(
        decodedAccessToken.exp,
        'Access token should have an expiration time'
      );
    }
  );

  t.test(
    'refresh token should contain correct userId and have the correct expiration',
    async (t) => {
      const { refreshToken } = authServices.generateToken(
        userId,
        accessTokenDuration,
        refreshTokenDuration
      );

      const decodedRefreshToken = jwt.verify(refreshToken, SECRET_KEY);
      t.equal(
        decodedRefreshToken.userId,
        userId,
        'Refresh token should contain correct userId'
      );
      t.ok(
        decodedRefreshToken.exp,
        'Refresh token should have an expiration time'
      );
    }
  );

  t.test('should throw an error if token durations are invalid', async (t) => {
    t.throws(
      () => authServices.generateToken(userId, 'invalid', refreshTokenDuration),
      'Access token duration is invalid'
    );
    t.throws(
      () => authServices.generateToken(userId, accessTokenDuration, 'invalid'),
      'Refresh token duration is invalid'
    );
  });

  t.test('should throw an error if userId is invalid', async (t) => {
    t.throws(
      () =>
        authServices.generateToken(
          null,
          accessTokenDuration,
          refreshTokenDuration
        ),
      'User ID is invalid'
    );

    t.throws(
      () =>
        authServices.generateToken(
          '',
          accessTokenDuration,
          refreshTokenDuration
        ),
      'User ID should not be an empty string'
    );

    t.throws(
      () =>
        authServices.generateToken(
          12345,
          accessTokenDuration,
          refreshTokenDuration
        ),
      'User ID should be a string, not a number'
    );

    t.throws(
      () =>
        authServices.generateToken(
          'invalid-uuid',
          accessTokenDuration,
          refreshTokenDuration
        ),
      'User ID format is invalid'
    );
  });

  t.end();
});

tap.test(
  'should set correct expiration times based on durations',
  async (t) => {
    const userId = '42e003c5-b349-4aad-8925-87edef296cc4';
    const accessTokenDuration = '1h';
    const refreshTokenDuration = '7d';

    const { accessToken, refreshToken } = authServices.generateToken(
      userId,
      accessTokenDuration,
      refreshTokenDuration
    );

    const decodedAccessToken = jwt.decode(accessToken);
    const decodedRefreshToken = jwt.decode(refreshToken);

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    const expectedAccessTokenExpiry = currentTime + 3600; // 1 hour
    const expectedRefreshTokenExpiry = currentTime + 7 * 24 * 3600; // 7 days

    t.ok(
      Math.abs(decodedAccessToken.exp - expectedAccessTokenExpiry) <= 5,
      'Access token should expire approximately 1 hour from now'
    );

    t.ok(
      Math.abs(decodedRefreshToken.exp - expectedRefreshTokenExpiry) <= 5,
      'Refresh token should expire approximately 7 days from now'
    );

    t.end();
  }
);

tap.test('should throw an error for invalid duration formats', async (t) => {
  const userId = '42e003c5-b349-4aad-8925-87edef296cc4';

  t.throws(
    () => authServices.generateToken(userId, 'invalid', '7d'),
    'Access token duration is invalid'
  );

  t.throws(
    () => authServices.generateToken(userId, '1h', 'invalid'),
    'Refresh token duration is invalid'
  );

  t.end();
});
