const { createUser } = require('../services/signUpService');

async function createUserController(body) {
  try {
    return await createUser({
      userName: body.username,
      email: body.email,
      password: body.password,
    });
  } catch (error) {
    console.error(error);
    return;
  }
}
module.exports = {
  createUserController,
};
