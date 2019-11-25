import { ApplicationConfig } from '../typings';

const dbUsername = process.env.DB_USERNAME || 'adminTony';
const dbPassword = process.env.DB_PASSWORD || 'andveryverystrong';
const dbName = process.env.DB_NAME || 'application';
const dbHost = process.env.DB_HOST || '172.105.67.148:27017';
const dbUrl = `mongodb://${dbUsername}:${dbPassword}@${dbHost}/${dbName}?authSource=admin&gssapiServiceName=mongodb`;

export const config: ApplicationConfig = {
  dbUsername,
  dbPassword,
  dbName,
  dbHost,
  dbUrl,
};
