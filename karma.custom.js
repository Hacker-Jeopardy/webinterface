'use strict';

let config = require('mozilla-neo/config/karma');

const TESTS = [...config.files, 'tests/*/*_test.js'];
config.files = TESTS;

let preprocessors = {};
const preprocessorsValues = Object.keys(config.preprocessors).map(key => config.preprocessors[key]);
TESTS.map(test => {
    preprocessors[test] = preprocessorsValues[0];
});
config.preprocessors = preprocessors;

module.exports = (karma) => karma.set(config);