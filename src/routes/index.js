//Routes for the app server
const { Router } = require('express');
const { basicAuth } = require('../middleware/basicAuth');
const router = new Router();

router.post('/sign-up', basicAuth, (req, res) => {
  try {
    if (req) {
      const { username, password } = req?.body || '';
      if (
        typeof username !== 'string' ||
        username === '' ||
        typeof password !== 'string' ||
        password === ''
      ) {
        res
          .status(401)
          .json({ message: 'username and password both are required' });
        console.log('not complete user credentials were provided');
        return;
      }
      //safe to proceed with username and password
      console.log('processing received username and password');
      res.status(201).json({ message: 'trusted app' }).send();
      return;
    }

    //req object is missing from the request
    res.status('401').send(`Malformed request`);
  } catch (error) {
    console.log('Something went wrong. Try again later.', error);
  }
});

module.exports = router;
