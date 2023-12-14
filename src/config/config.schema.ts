import Joi from 'joi';

const configSchema = Joi.object({
  PORT: Joi.number().port().required(),
  NODE_ENV: Joi.string().valid('development', 'test', 'production').required(),
  DB_URL: Joi.string().required(),
  JWT_KEY: Joi.string().required(),
});

export default configSchema;
