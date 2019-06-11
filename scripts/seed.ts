require('dotenv').config();

import { createConnection } from 'typeorm';

import { dbDrop } from '../utils/testing';
import { entities } from '../database';
import { user } from '../database/User/User.seed';
import { geoMaps } from '../database/GeoMap/GeoMap.seed';

const seeders = [user, geoMaps];

(async () => {
  await dbDrop();

  const connection = await createConnection({
    entities,
    type: 'mongodb',
    synchronize: true,
    useNewUrlParser: true,
    database: process.env.DATABASE_NAME,
  });

  const seedersPromises: Promise<any>[] = seeders.map((seeder) => seeder.seed(connection));
  Promise.all(seedersPromises).then(() => connection.close());
})();
