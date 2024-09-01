const Db = require('../config/db');
const { USER_TABLES } = require('../constants/user.constants');
const { SERVER_EXIT_CODE } = require('../constants/index');

const createUser = async ({ uuid, userName, email, hashedPassword }) => {
  const User = await Db.getInstance();
  const result = await User(USER_TABLES.CREDENTIALS).insert({
    user_id: uuid,
    username: userName,
    email: email,
    password_hash: hashedPassword,
  });
  return result?.rowCount > 0
    ? SERVER_EXIT_CODE.SUCCESSFUL_EXIT
    : SERVER_EXIT_CODE.FAILED_EXIT;
};

const updateUserName = async ({ oldUserName, newUserName }) => {
  const dbOperation = await Db.getInstance();
  const result = await dbOperation(USER_TABLES.CREDENTIALS)
    .where({ username: oldUserName })
    .update({ userName: newUserName });
  return result;
};

const deleteUser = async ({ uuid }) => {
  const dbOperation = await Db.getInstance();
  const result = await dbOperation(USER_TABLES.CREDENTIALS)
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
