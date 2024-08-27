const Db = require('../config/db');
const { UserTables } = require('../constants');
const dbOperation = Db.getInstance;

const createUser = async ({ uuid, userName, email, hashedPassword }) => {
  const result = await dbOperation(UserTables.CREDENTIALS).insert({
    user_id: uuid,
    username: userName,
    email: email,
    password_hard: hashedPassword,
  });
  return result;
};

const updateUserName = async ({ oldUserName, newUserName }) => {
  const result = await dbOperation(UserTables.CREDENTIALS)
    .where({ username: oldUserName })
    .update({ userName: newUserName });
  return result;
};

const deleteUser = async ({ uuid }) => {
  const result = await dbOperation(UserTables.CREDENTIALS)
    .where({
      user_id: uuid,
    })
    .del();
  return result;
};

module.exports = {
  createUser,
  updateUserName,
  deleteUser,
};
