const fs = require('fs/promises');

async function fetchCAKeys() {
  let ca;
  try {
    const caKey = await fs.readFile('./CA/localhost-key.pem');
    const caCert = await fs.readFile('./CA/localhost.pem');
    ca = { ca: caKey, cert: caCert };
  } catch {
    console.log("💥 Couldn't find workable Certificate and key for SSL");
    ca = null;
  }
  return ca;
}

module.exports = fetchCAKeys;
