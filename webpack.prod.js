const config = require('mozilla-neo/config/webpack.prod');
const path = require('path');

config.eslint = {
  configFile: path.join(process.cwd(), '.eslintrc.js'),
};

module.exports = config;
