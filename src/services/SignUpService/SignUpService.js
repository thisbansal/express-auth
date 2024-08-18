const db = require('../../config/db');
const { v4: uuid4 } = require('uuid');
const { hashPassword } = require('../../lib/ManagePasswords');

/**
 *
 * @param {userName, email, password} userName, email and password of the user
 * @returns {Promise[Array]} greater than one if successful
 * @throws {Error} Error could be thrown when creating hashed password or database update operation
 */
async function createUser({ userName, email, password }) {
  const uuid = uuid4();
  const hashedPassword = await hashPassword(password);
  const knex = await db.getInstance();
  return knex('my_app_users_credentials').insert({
    user_id: uuid,
    username: userName,
    email: email,
    password_hash: hashedPassword,
  });
}

module.exports = {
  createUser,
};
