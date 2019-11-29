import { config as common } from './common';
import { provideApplicationConfig } from './helpers';

export const config = provideApplicationConfig({
  ...common,
  db: {
    ...common.db,
    name: 'production',
  },
});
