import Joi from 'joi';

export const patientSchema = Joi.object({
  fullName: Joi.string().pattern(/^[a-zA-Z\s]*$/).required().messages({
    'string.pattern.base': '"Full name" can only contain letters and spaces.',
  }),
  email: Joi.string().email().required().custom((value, helpers) => {
    if (!value.endsWith('@gmail.com')) {
      return helpers.error('any.invalid');
    }
    return value;
  }, 'Gmail validation').messages({
    'any.invalid': 'Email address must be a @gmail.com address.',
  }),
  phoneCountryCode: Joi.string().required(),
  phoneNumber: Joi.string().required(),
});