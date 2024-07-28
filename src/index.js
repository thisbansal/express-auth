const { getCreds } = require('./config');
const https = require('https');
const helmet = require('helmet');
const express = require('express');
// const dB = require('./config/db');
async function startServer() {
  try {
    // const dotenv = require("dotenv").config().parsed;
    const app = express();
    const { port, host, isHttpsEnabled, certificates } = await getCreds();

    // Middleware
    if (isHttpsEnabled) {
      app.use(helmet());
    }
    app.use(express.json());
    app.use(require('./middleware/index'));

    // routes
    const userRoutes = require('./routes/index');
    app.use('/', userRoutes);

    // Start the server
    const httpsServer = https.createServer(
      (certificates.ca, certificates.cert),
      app
    );
    const protocol =
      httpsServer instanceof require('https').Server ? 'https' : 'http';
    httpsServer.listen(port, host, () => {
      const secureServerAddress = httpsServer.address().address;
      const secureServerPort = httpsServer.address().port;
      console.log(
        `⚡️Server is running on ${protocol}://${secureServerAddress}:${secureServerPort} ⚡️`
      );
    });
  } catch (error) {
    console.error("Couldn't start server");
    console.debug(error);
  }
}

startServer();
