const config = require('./karma.config');
config.webpack = require('./webpack.test');

module.exports = (karma) => karma.set(config);
