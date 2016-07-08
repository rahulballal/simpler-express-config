'use strict';
const path = require('path');
const fs = require('fs');

class ConfigurationProvider {

  constructor(configRoot, configOverrideFileName) {
    this._configRoot = configRoot;
    this._configuration = null;
    this._override = null;
    if (configOverrideFileName) {
      this._override = path.normalize(path.join(configRoot, configOverrideFileName));
    } else {
      this._override = null;
    }
    if (!(this._override) && process.env.NODE_ENV) {
      this._default = path.normalize(path.join(configRoot, `${process.env.NODE_ENV}.json`));
    }
    if (!(this._override) && !(this._default)) {
      this._default = path.normalize(path.join(configRoot, `default.json`));
    }
  }

  _populateConfiguration() {
    try {
      if (fs.existsSync(this._override)) {
        this._configuration = JSON.parse(fs.readFileSync(this._override, 'utf8'));
      }
      if (fs.existsSync(this._default)) {
        this._configuration = JSON.parse(fs.readFileSync(this._default, 'utf8'));
      }
    } catch (error) {
      throw error;
    }
  }
  get Configuration() {
    this._populateConfiguration();
    return this._configuration;
  }
}
exports = module.exports = ConfigurationProvider;
