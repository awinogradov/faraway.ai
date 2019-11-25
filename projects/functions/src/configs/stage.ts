import { ApplicationConfig } from '../typings';

const dbUsername = process.env.DB_USERNAME || 'adminTony';
const dbPassword = process.env.DB_PASSWORD || 'andveryverystrong';
const dbName = process.env.DB_NAME || 'application';
const dbHost = process.env.DB_HOST || '172.105.67.148:27017';
const dbUrl = `mongodb://${dbUsername}:${dbPassword}@${dbHost}/${dbName}?authSource=admin&gssapiServiceName=mongodb`;

const googleMapsKey = process.env.GOOGLE_MAPS_KEY || 'AIzaSyCdOCj0doOo5--OVejnyliXbtZ-hgRnq5A';

export const config: ApplicationConfig = {
  dbUsername,
  dbPassword,
  dbName,
  dbHost,
  dbUrl,
  googleMapsKey,
};
