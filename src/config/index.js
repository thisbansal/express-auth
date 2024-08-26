require('dotenv').config();
const fetchCAKey = require('../utils/CA');

async function getCredentials() {
  const options = {
    port: process.env.PORT_NUMBER || 3001,
    host: process.env.HOST || 'localhost',
    isHttpsEnabled: false,
  };

  try {
    const fetchedKeys = await fetchCAKey();
    const ca = fetchedKeys?.ca;
    const cert = fetchedKeys?.cert;
    if (ca && cert) {
      options.isHttpsEnabled = true;
      options.certificates = {
        ca: ca,
        cert: cert,
      };
    }
    return options;
  } catch (error) {
    console.error('config error', error);
    console.log('Relying on Nginx for TLS/SSL...');
  }

  return options;
}

const hashLength = {
  hashLength: 50,
};
module.exports = { getCredentials, hashLength };
