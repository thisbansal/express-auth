//Routes for the app server
const { Router } = require("express");

const router = new Router();

router.get("/testing", (req, res) => {
  if (!req) res.send("/ path route testing passed");
});

module.exports = router;
