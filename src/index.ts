import app from './app';
import { checkEnvVariables, getConfig } from './config/config';
import { startDbConnection } from './database/db-connection';
import Logger from './helpers/logger';
const start = async () => {
  checkEnvVariables();
  await startDbConnection();

  app.listen(getConfig().PORT, () =>
    Logger.log('info', `Listening on port ${getConfig().PORT}!`),
  );
};

start();
