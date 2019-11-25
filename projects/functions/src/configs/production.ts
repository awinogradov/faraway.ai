import { ApplicationConfig } from '../typings';

const dbUsername = process.env.DB_USERNAME!;
const dbPassword = process.env.DB_PASSWORD!;
const dbName = process.env.DB_NAME!;
const dbHost = process.env.DB_HOST!;
const dbUrl = `mongodb://${dbUsername}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`;

const googleMapsKey = process.env.GOOGLE_MAPS_KEY!;

export const config: ApplicationConfig = {
  dbUsername,
  dbPassword,
  dbName,
  dbHost,
  dbUrl,
  googleMapsKey,
};
