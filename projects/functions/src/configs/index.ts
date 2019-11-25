/* eslint-disable import/no-dynamic-require */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable global-require */
import { ApplicationConfig } from '../typings';

export const { config }: { config: ApplicationConfig } = require(`./${process.env.NODE_ENV}`);
