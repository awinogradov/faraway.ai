'use strict';

module.exports = {
  plugins: ['typescript'],
  modify: (config, { target, dev }, webpack) => {
    config.devtool = undefined;

    return config;
  },
};
