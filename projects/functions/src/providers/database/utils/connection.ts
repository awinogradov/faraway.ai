import mongoose from 'mongoose';

import { config } from '../../../configs';

let connection: typeof mongoose | void;

export const connect = async () => {
  connection =
    connection ||
    (await mongoose
      .connect(config.db.url, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .catch(error => console.error(error)));
};
