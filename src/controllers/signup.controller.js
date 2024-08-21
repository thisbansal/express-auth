const {
  createUserService,
} = require('../services/SignUpService/SignUpService');

/**
 *
 * @param {Body} body accepts request body to create a user account
 * @returns {Promise[Array]} greater than one if successful
 * @throws {Error} Error could be thrown when creating hashed password or database insert operation
 */
async function createUserController(body) {
  return await createUserService({
    userName: body.username,
    email: body.email,
    password: body.password,
  });
}

module.exports = {
  createUserController,
};
