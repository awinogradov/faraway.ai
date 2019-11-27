/* eslint-disable no-console */
import 'mocha';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let db: typeof mongoose | void;
const mongod = new MongoMemoryServer();

before(async () => {
  if (!db) {
    const dbConnectionUrl = await mongod.getConnectionString();
    const dbName = await mongod.getDbName();

    console.log(`
  db connection: ${dbConnectionUrl};
  db name: ${dbName};
    `);

    db = await mongoose
      .connect(dbConnectionUrl, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .catch(error => console.error(error));
  }

  return db;
});

after(async () => {
  if (db) {
    await db.disconnect();
    await mongod.stop();
  }
});
