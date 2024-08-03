const Joi = require('joi');

const signUpSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  repeat_password: Joi.ref('password'),
  access_token: [Joi.string(), Joi.number()],
  birth_year: Joi.number().integer().min(1900).max(new Date()),
})
  .with('username', 'birth_year')
  .with('password', 'repeat_password')
  .xor('password', 'access_token');

module.exports = { signUpSchema };
