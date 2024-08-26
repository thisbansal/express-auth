//Routes for the app server
const { Router } = require('express');
const { basicAuth } = require('../middleware/basicAuth');
const { validateSignUpRequest } = require('../middleware/validate-sign-up');
const { createUserController } = require('../controllers/signup.controller');
const router = new Router();

router.post('/sign-up', basicAuth, validateSignUpRequest, async (req, res) => {
  try {
    if (req.validatedData) {
      const createUser = await createUserController(req.body);
      if (createUser) {
        res
          .status(201)
          .json({ message: 'for now all requirements are met' })
          .send();
        return;
      }
    }
    res.status(500).send(`Malformed request`);
  } catch (error) {
    console.log('Something went wrong. Try again later.', error);
    res.status(500).json({ message: "Couldn't fulfill the request" });
  }
});

router.get('/', basicAuth, async (req, res) => {
  try {
    if (req) {
      res.status(200).json({ message: '👋🏽 user' });
    } else {
      res.status(500).json({ message: 'malformed request' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'malformed request' });
  }
});

module.exports = router;
