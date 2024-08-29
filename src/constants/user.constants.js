const USER_TABLES = {
  CREDENTIALS: 'my_app_users_credentials',
};

const USER_REQUIRED_FIELDS = {
  dob: {
    minDate: '1-1-1900',
  },
};

module.exports = {
  USER_TABLES,
  USER_REQUIRED_FIELDS,
};
