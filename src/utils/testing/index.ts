import mongoUnit from 'mongo-unit';

import { logger } from '../logger';

export const dbStart = async () => {
  const url = await mongoUnit.start({
    dbName: 'test'
  });
  // mongodb://localhost:<port>/<database>
  const parts = url.split('host:')[1].split('/');
  const port = Number(parts[0]);
  const database = parts[1];

  const runnedOptions = { url, port, database, host: 'localhost', logging: false };
  logger.debug('testing db is running', runnedOptions);

  return runnedOptions;
}

export const dbStop = mongoUnit.stop;
export const dbDrop = async (databaseName?: string) => {
  const dbName = databaseName || process.env.DATABASE_NAME;
  await mongoUnit.dropDb(`mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${dbName}`);
  logger.debug(`db ${dbName} dropped`);
}

export interface TestServer {
  stop: () => void;
}

export async function runTestEnv(): Promise<TestServer> {
  const stop = async () => {
    await dbStop();
    await dbDrop('test');
    logger.debug('testing env stopped');
    return Promise.resolve();
  };

  logger.debug('testing env is running');

  return {
    stop,
  };
};
