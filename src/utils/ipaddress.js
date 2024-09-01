const os = require('os');
const { IPAddressMapping } = require('../constants');

const getHost = (ip) => {
  const match =
    IPAddressMapping.find((ipStore) => ipStore.ip === ip)?.value ?? null;
  if (match) return match;

  return getDeviceId();
};

const getDeviceId = () => {
  return (
    Object.values(os.networkInterfaces())
      .flat()
      .find(
        (alias) =>
          alias.family === 'IPv4' &&
          !alias.internal &&
          alias.address !== IPAddressMapping[1].ip
      )?.address || '0.0.0.0'
  );
};

module.exports = { getHost };
