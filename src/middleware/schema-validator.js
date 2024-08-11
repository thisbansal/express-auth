const Joi = require('joi');

module.exports = {
  signUpSchema: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string(),
    // update the password matching regex
    repeat_password: Joi.ref('password'),
    access_token: [Joi.string(), Joi.number()],
    birth_year: Joi.number().integer().min(1900).max(Date.now()),
  })
    .with('username', 'birth_year')
    .with('password', 'repeat_password')
    .xor('password', 'access_token'),
};
