//Routes for the app server
const { Router } = require('express');
const { basicAuth } = require('../middleware/basicAuth');
const { validateSignUpRequest } = require('../middleware/validate-sign-up');
const Db = require('../config/db');
const router = new Router();

router.post('/sign-up', basicAuth, validateSignUpRequest, async (req, res) => {
  try {
    if (req.validatedData) {
      const knex = await Db.getInstance();
      console.log(knex);
      res
        .status(201)
        .json({ message: 'for now all requirements are met' })
        .send();
      return;
    }

    res.status('401').send(`Malformed request`);
  } catch (error) {
    console.log('Something went wrong. Try again later.', error);
  }
});

module.exports = router;
