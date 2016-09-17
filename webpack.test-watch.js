const config = require('mozilla-neo/config/webpack.test');
const path = require('path');

config.eslint = {
  configFile: path.join(process.cwd(), '.eslintrc.js'),
};

module.exports = config;
