'use strict';

module.exports = {
  plugins: ['typescript'],
  modify: (config, { target, dev }, webpack) => {
    if (!dev) {
      config.devtool = false;
    }

    return config;
  },
};
