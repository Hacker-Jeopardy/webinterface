const config = require('mozilla-neo/config/webpack.test');

delete config.eslint;

const preLoaders = config.module.preLoaders;
config.module.preLoaders = [];
preLoaders.map(preLoader => {
  if (preLoader.loader !== 'eslint') {
    config.module.preLoaders.push(preLoader);
  }
});

module.exports = config;
