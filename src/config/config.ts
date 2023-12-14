import * as dotenv from 'dotenv';
import configSchema from './config.schema';

dotenv.config();
const config = {
  development: {
    DB_URL: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV,
    PORT: Number(process.env.PORT),
    JWT_KEY: process.env.JWT_KEY,
  },
  production: {
    DB_URL: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV,
    PORT: Number(process.env.PORT),
    JWT_KEY: process.env.JWT_KEY,
  },
  test: {
    DB_URL: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV,
    PORT: Number(process.env.PORT),
    JWT_KEY: process.env.JWT_KEY,
  },
};

export const checkEnvVariables = () => {
  const { error } = configSchema.validate(getConfig());
  if (error?.details?.[0].message) {
    throw new Error(error?.details?.[0].message);
  }

  if (error) {
    throw new Error('Invalid environment variables');
  }
};

export const getConfig = () => {
  return config[process.env.NODE_ENV];
};
