import Joi from 'joi';

export const signUp = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  passwordConfirmation: Joi.ref('password'),
}).with('password', 'passwordConfirmation');

export const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
