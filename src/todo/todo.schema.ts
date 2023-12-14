import Joi from 'joi';

const commonSchema = {
  title: Joi.string().trim().required(),
  description: Joi.string().trim().allow('').optional(),
};
export const createTodo = Joi.object({
  ...commonSchema,
});

export const updateTodo = Joi.object({
  ...commonSchema,
  is_finished: Joi.bool().optional(),
});
