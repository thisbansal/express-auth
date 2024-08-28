const { v4: uuid4 } = require('uuid');
const { hashPassword } = require('../../lib/manage.password');
const { createUser } = require('../../models/user.repository');

/**
 *
 * @param {userName, email, password} userName, email and password of the user
 * @returns {Promise[Array]} greater than one if successful
 * @throws {Error} Error could be thrown when creating hashed password or database update operation
 */
async function createUserService({ userName, email, password }) {
  const uuid = uuid4();
  const hashedPassword = await hashPassword(password);
  createUser({ uuid, userName, email, hashedPassword });
}

module.exports = {
  createUserService,
};
