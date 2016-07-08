'use strict';
const ConfigurationProvider = require('./ConfigurationProvider');
let instance = null;
exports = module.exports = function(configurationRootPath, overrideConfig) {
  if (instance) {
    return instance;
  }

  instance = new ConfigurationProvider(configurationRootPath, overrideConfig);
  return instance;
};
