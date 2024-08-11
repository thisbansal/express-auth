const { getCredentials } = require('./config');
const https = require('https');
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const { rateLimit } = require('express-rate-limit');
const { logAndRedirectInsecureRequest } = require('./middleware/index');
// TODO: make use of knex and possibly pg?
// const Db = require('./config/db');
async function startServer() {
  try {
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    });
    // const dbInstance = await Db.getInstance();
    const app = express();

    app.use(limiter);
    app.use(cors());
    const { port, host, isHttpsEnabled, certificates } = await getCredentials();

    // Middleware
    if (isHttpsEnabled) {
      app.use(helmet());
    }
    app.use(express.json());
    app.use(logAndRedirectInsecureRequest);

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
    return;
  }
}

startServer();
