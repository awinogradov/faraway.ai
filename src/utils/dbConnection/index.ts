import { logger } from '../logger';

export function dbConnectionUrl() {
  const {
    DATABASE_USER,
    DATABASE_PWD,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
    DATABASE_SRV,
  } = process.env;

  let url = 'mongodb';

  if (DATABASE_SRV) {
    url += '+srv';
  }

  url += '://';

  if (DATABASE_USER && DATABASE_PWD) {
    url += `${DATABASE_USER}:${DATABASE_PWD}@`;
  }

  url += DATABASE_HOST;

  if (DATABASE_PORT) {
    url += `:${DATABASE_PORT}`;
  }

  url += `/${DATABASE_NAME}`;

  logger.debug(url);

  return url;
}
