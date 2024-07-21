// Load environment variables from.env file
require("dotenv").config();

// default port number if not set in.env
const port = process.env.PORT_NUMBER || 3001;
const host = process.env.HOST || "localhost";

module.exports = { port, host };
