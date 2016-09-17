const config = require('./karma.config');
config.webpack = require('./webpack.test-watch');

module.exports = (karma) => karma.set(config);
