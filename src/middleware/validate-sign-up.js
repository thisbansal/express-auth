const { signUpSchema } = require('./schema-validator');

const validateSignUpRequest = async (req, res, next) => {
  try {
    const result = await signUpSchema.validateAsync(req.body);
    req.validatedData = result;
    return next();
  } catch (error) {
    console.log(error.details);
    return res.status(500).json({ message: error?.details[0]?.message });
  }
};

module.exports = {
  validateSignUpRequest,
};
