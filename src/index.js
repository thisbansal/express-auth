const { getCredentials } = require('./config');
const https = require('https');
const http = require('http');
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const { rateLimit } = require('express-rate-limit');
const { logAndRedirectInsecureRequest } = require('./middleware/index');

async function startServer() {
  try {
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    });
    const app = express();
    app.use(limiter);
    app.use(cors());
    const { port, host, isHttpsEnabled, certificates } = await getCredentials();

    // Middleware
    app.use(helmet());
    app.use(express.json());
    app.use(logAndRedirectInsecureRequest);

    // routes
    const userRoutes = require('./routes/index');
    app.use('/', userRoutes);
    if (isHttpsEnabled) {
      // Start the SSL server
      const httpsServer = https.createServer({
        key: certificates.ca,
        cert: certificates.cert,
      });
      const protocol = 'https';
      httpsServer.listen(port, host, () => {
        const secureServerAddress = httpsServer.address().address;
        const secureServerPort = httpsServer.address().port;
        console.log(
          `⚡️Server is running on ${protocol}://${secureServerAddress === '::1' ? 'localhost' : secureServerAddress}:${secureServerPort} ⚡️`
        );
      });
    } else {
      return new Promise((resolve, reject) => {
        const server = http.createServer(app);
        server
          .listen(port, host, () => {
            const protocol = 'http';
            console.log(
              `🐼 Server is running on ${protocol}://${server.address().address === '::1' ? 'localhost' : server.address().address}:${server.address().port} ⚡️`
            );
            resolve();
          })
          .on('error', (err) => {
            reject(err);
          });
      });
    }
  } catch (error) {
    console.error("Couldn't start server");
    console.debug(error);
    return;
  }
}

startServer();
