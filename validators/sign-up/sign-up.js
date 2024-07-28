const Joi = require('joi');

const signUpSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
});

module.exports = { signUpSchema };
