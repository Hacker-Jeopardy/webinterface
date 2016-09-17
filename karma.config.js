const config = require('mozilla-neo/config/karma');

const TESTS = 'tests/**/*_test.js';
config.files = [TESTS];

const preprocessorsValues = Object.keys(config.preprocessors).map(key => config.preprocessors[key]);
config.preprocessors = {
  [TESTS]: preprocessorsValues[0],
};

module.exports = config;
