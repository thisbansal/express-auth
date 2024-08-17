const db = require('../../config/db');
const { v4: uuid4 } = require('uuid');

async function createUser({ userName, email, password }) {
  try {
    const hashedPassword = 'hashed_' + password;
    const uuid = uuid4();
    const knex = await db.getInstance();
    return knex('my_app_users_credentials').insert({
      user_id: uuid,
      username: userName,
      email: email,
      password_hash: hashedPassword,
    });
  } catch (error) {
    console.error("Couldn't create error", error);
    throw error;
  }
}

module.exports = {
  createUser,
};
