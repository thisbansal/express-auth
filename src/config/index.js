require('dotenv').config();
const generateCAKeys = require('../utils/CA');

async function getCredentials() {
  const options = {
    port: process.env.PORT_NUMBER || 3001,
    host: process.env.HOST || 'localhost',
    isHttpsEnabled: false,
  };

  try {
    const { ca, cert } = await generateCAKeys();
    if (ca && cert) {
      options.isHttpsEnabled = true;
      options.certificates = {
        ca: ca,
        cert: cert,
      };
    }
  } catch (error) {
    console.error('config error', error);
  }

  return options;
}

const hashLength = {
  hashLength: 50,
};

module.exports = { getCredentials, hashLength };
