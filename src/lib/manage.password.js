/**
 * HashedPassword service
 *
 * Provides methods for password hashing and verification
 *
 */
const { hashLength } = require('../config');
const argon2 = require('argon2');

/**
 * Hashes a password using the provided options.
 *
 * @async
 * @param {string} password - The password to hash
 * @param {Options} options - Options for hashing (see {@link Options})
 * @returns {Promise<string>} A promise resolving to the hashed password
 * @throws {Error} throws error if password couldn't be hashed successfully
 */
async function hashPassword(password, options = hashLength) {
  return await argon2.hash(password, options);
}

/**
 * Verifies a password against a previously hashed password.
 *
 * @async
 * @param {string} password - The password to verify
 * @param {string} hashedPassword - The previously hashed password to compare with
 * @returns {Promise<boolean>} A promise resolving to `true` if the passwords match, `false` otherwise
 */
async function verifyPassword(password, hashedPassword) {
  return await argon2.verify(hashedPassword, password);
}
module.exports = {
  hashPassword,
  verifyPassword,
};
