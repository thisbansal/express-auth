const Joi = require('joi');

module.exports = {
  signUpSchema: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().messages({
      'string.base': 'Username should be a string.',
      'string.alphanum':
        'Username should contain only alphanumeric characters.',
      'string.min': 'Username should be at least 3 characters long.',
      'string.max': 'Username should not exceed 30 characters.',
      'any.required': 'Username is required.',
    }),
    email: Joi.string()
      .email()
      .pattern(new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'))
      .required()
      .messages({
        'string.email': 'Please enter a valid email address.',
        'string.pattern.base':
          'Email must be in a standard format (e.g., example@domain.com).',
        'any.required': 'Email is required.',
      }),
    password: Joi.string()
      .min(8)
      .pattern(
        new RegExp(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        )
      )
      .required()
      .messages({
        'string.min': 'Password should be at least 8 characters long.',
        'string.pattern.base':
          'Password should include uppercase, lowercase, digit, and special character.',
        'any.required': 'Password is required.',
      }),
    repeat_password: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .messages({
        'any.only': 'Passwords do not match.',
        'any.required': 'Repeat password is required.',
      }),
    access_token: Joi.alternatives().try(Joi.string(), Joi.number()).messages({
      'alternatives.types': 'Access token must be either a string or a number.',
    }),
    birth_year: Joi.number()
      .integer()
      .min(1900)
      .max(new Date().getFullYear())
      .messages({
        'number.base': 'Birth year should be a number.',
        'number.integer': 'Birth year should be an integer.',
        'number.min': 'Birth year should not be before 1900.',
        'number.max': `Birth year should not be in the future.`,
      }),
  })
    .with('username', 'birth_year')
    .with('password', 'repeat_password')
    .xor('password', 'access_token'),
};
