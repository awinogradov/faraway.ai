'use strict';

module.exports = {
  plugins: ['typescript'],
  modify: (config, { target, dev }, webpack) => {
    config.devtool = 'cheap-source-map';

    if(!dev) {
      console.log(config);
    }

    return config;
  },
};
