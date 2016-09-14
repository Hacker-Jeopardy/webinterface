const config = require('mozilla-neo/config/karma');
const webpackConfig = require('./webpack.test');

const TESTS = 'tests/**/*_test.js';
config.files = [TESTS];

const preprocessorsValues = Object.keys(config.preprocessors).map(key => config.preprocessors[key]);
config.preprocessors = {
  [TESTS]: preprocessorsValues[0],
};

config.webpack = webpackConfig;

module.exports = (karma) => karma.set(config);
