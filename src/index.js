const { getCreds } = require("./config");
const https = require("https");
const helmet = require("helmet");
const express = require("express");

async function startServer() {
  try {
    const app = express();
    const { port, host, isHttpsEnabled, certificates } = await getCreds();

    // Middleware
    if (isHttpsEnabled) {
      app.use(helmet());
    }
    app.use(express.json());
    app.use(require("./middleware/index"));

    // routes
    const userRoutes = require("./routes/index");
    app.use("/", userRoutes);

    // Start the server
    const httpsServer = https.createServer(
      (certificates.ca, certificates.cert),
      app
    );
    httpsServer.listen(port, host, () => {
      console.log(`HTTPS Server is running on https://${host}:${port}`);
    });
  } catch (error) {
    console.error("Couldn't start server");
    console.debug(error);
  }
}

startServer();
