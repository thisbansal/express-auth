// Create a new express app
const express = require("express");
const app = express();
const { port, host } = require("./config");

// Middleware to parse JSON bodies (for incoming requests)
app.use(express.json());

// Use the logger middleware
app.use(require("./middleware/index"));

// Import and use routes
const userRoutes = require("./routes/index");
app.use("/", userRoutes);

// Start the server
app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
