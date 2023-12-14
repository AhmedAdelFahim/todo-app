import { connect } from 'mongoose';
import { getConfig } from '../config/config';
import Logger from '../helpers/logger';

const startDbConnection = async () => {
  try {
    await connect(getConfig().DB_URL, { authSource: 'admin' });
    Logger.log(
      'info',
      'Connection to database has been established successfully.',
    );
  } catch (error) {
    Logger.log(
      'error',
      `Unable to connect to the database: ${JSON.stringify(error)}`,
    );
  }
};

export { startDbConnection };
