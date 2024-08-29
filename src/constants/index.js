const defaultConfig = {
  PORT_NUMBER: 3001,
  HOST: 'localhost',
};

const IPAddressMapping = [
  { ip: '::1', value: 'localhost' },
  { ip: '127.0.0.1', value: 'localhost' },
  { ip: 'localhost', value: 'localhost' },
];

const SERVER_EXIT_CODE = {
  SUCCESSFUL_EXIT: 0,
  FAILED_EXIT: -1,
};

module.exports = {
  defaultConfig,
  IPAddressMapping,
  SERVER_EXIT_CODE,
};
