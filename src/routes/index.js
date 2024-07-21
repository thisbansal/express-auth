//Routes for the app server
const { Router } = require("express");

const router = new Router();

router.get("/testing", (req, res) => {
  try {
    res.status(200).json({ status: "success" }).send();
  } catch (error) {
    console.log("Error in testing route", error);
  }
});

module.exports = router;
