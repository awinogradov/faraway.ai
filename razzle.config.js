'use strict';

module.exports = {
  plugins: ['typescript'],
  modify: (config, { target, dev }, webpack) => {
    config.devtool = 'cheap-source-map';

    return config;
  },
};
