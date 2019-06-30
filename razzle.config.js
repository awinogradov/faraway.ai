'use strict';

module.exports = {
  plugins: ['typescript'],
  modify(config, { target, dev }) {
    if (target === 'web' && !dev) {
      config.externals = {
        react: 'React',
        'react-dom': 'ReactDOM'
      };
    }

    if (!process.env.DEBUG) {
      config.devtool = false;
    }

    return config;
  },
};
