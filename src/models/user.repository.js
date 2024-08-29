const Db = require('../config/db');
const { UserTables, SERVER_EXIT_CODE } = require('../constants');

const createUser = async ({ uuid, userName, email, hashedPassword }) => {
  const User = await Db.getInstance();
  const result = await User(UserTables.CREDENTIALS).insert({
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
  const result = await dbOperation(UserTables.CREDENTIALS)
    .where({ username: oldUserName })
    .update({ userName: newUserName });
  return result;
};

const deleteUser = async ({ uuid }) => {
  const dbOperation = await Db.getInstance();
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
