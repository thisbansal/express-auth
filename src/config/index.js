// Load environment variables from.env file
require("dotenv").config();
const generateCAKeys = require("../utils/CA");

async function getCreds() {
  const port = process.env.PORT_NUMBER || 3001;
  const host = process.env.HOST || "localhost";
  const options = { port, host };

  try {
    const { ca, cert } = await generateCAKeys();
    options.isHttpsEnabled = true;
    options.certificates = {
      ca: ca,
      cert: cert,
    };
  } catch (error) {
    console.error("config error");
    console.log(error);
  }

  return options;
}

module.exports = { getCreds };
